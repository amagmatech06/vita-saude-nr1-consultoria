import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

import { COLABORADORES_OPCOES } from "@/config/lead-options";
import { site } from "@/config/site";

export const runtime = "nodejs";

/**
 * Anexar o PDF (3,2 MB) e mais fiel ao "receba o guia por e-mail", mas alguns
 * servidores corporativos barram anexos grandes — e o publico aqui e B2B.
 * O e-mail sempre leva o link de download; o anexo pode ser desligado aqui.
 */
const ATTACH_PDF = process.env.EMAIL_ATTACH_PDF !== "false";

/**
 * Nenhum fetch daqui tinha timeout, e o Node/undici nao impoe um. Uma instancia
 * da Evolution pendurada travava a request ate o limite da funcao na Vercel —
 * e como o WhatsApp roda ANTES da Brevo, o e-mail nem chegava a ser tentado.
 */
const TIMEOUT_MS = 8000;
const comTimeout = () => AbortSignal.timeout(TIMEOUT_MS);

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(80),
  email: z.email("E-mail inválido.").max(160),
  telefone: z.string().trim().min(10, "Telefone inválido.").max(20),
  empresa: z.string().trim().min(2, "Informe a empresa.").max(120),
  /** Pergunta qualificatoria: so aceita os rotulos exatos do <select>. */
  colaboradores: z.enum(COLABORADORES_OPCOES, { message: "Selecione o porte da empresa." }),
  consent: z.literal(true, { message: "É preciso aceitar para receber o material." }),
  /**
   * Honeypot: preenchido apenas por bots. Aceita qualquer valor de proposito —
   * quem rejeita e a checagem abaixo, que responde 200 sem enviar nada. Validar
   * aqui devolveria 422 e entregaria ao bot a dica de qual campo o denunciou.
   */
  website: z.string().optional(),
});

/** Rate limit simples em memoria: 5 envios por IP a cada 10 minutos. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function emailHtml(nome: string, downloadUrl: string) {
  const primeiroNome = nome.split(" ")[0] ?? nome;
  return `<!doctype html>
<html lang="pt-BR"><body style="margin:0;padding:32px 16px;background:#F1F1F1;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;">
    <tr><td style="background:#070A26;padding:32px 32px 28px;">
      <p style="margin:0 0 10px;color:rgba(249,249,251,.6);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${site.ebook.edition}</p>
      <h1 style="margin:0;color:#F9F9FB;font-size:26px;line-height:1.25;font-weight:700;">${site.ebook.title}</h1>
      <p style="margin:8px 0 0;color:rgba(249,249,251,.72);font-size:14px;line-height:1.6;">${site.ebook.subtitle}</p>
    </td></tr>
    <tr><td style="padding:32px;">
      <p style="margin:0 0 16px;color:#070A26;font-size:16px;line-height:1.7;">Olá, ${primeiroNome}!</p>
      <p style="margin:0 0 24px;color:rgba(7, 10, 38,.78);font-size:15px;line-height:1.7;">
        Seu guia está pronto. São 28 páginas com conceitos, ferramentas, indicadores
        e o passo a passo completo da adequação à NR-1.
      </p>
      <a href="${downloadUrl}" style="display:inline-block;background:#FEC717;color:#070A26;text-decoration:none;font-weight:700;font-size:15px;padding:16px 28px;border-radius:999px;">Baixar o PDF</a>
      <p style="margin:28px 0 0;padding-top:24px;border-top:1px solid rgba(7, 10, 38,.1);color:rgba(7, 10, 38,.6);font-size:14px;line-height:1.7;">
        Qualquer dúvida sobre a implementação na sua empresa, é só responder este e-mail
        ou chamar no WhatsApp ${site.whatsapp.display}.
      </p>
      <p style="margin:20px 0 0;color:#070A26;font-size:14px;line-height:1.6;">
        <strong>${site.founder.name}</strong><br />
        <span style="color:rgba(7, 10, 38,.6);">${site.founder.role}</span>
      </p>
    </td></tr>
  </table>
</body></html>`;
}

type Lead = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  colaboradores: string;
};

/**
 * Dado do lead indo para dentro de uma mensagem: tira quebra de linha e
 * caractere de controle para ninguem forjar uma linha inteira — um `nome`
 * terminado em "\n*** " imitaria o aviso de erro do proprio alerta.
 */
function linhaSegura(valor: string, max = 120) {
  return valor.replace(/[\r\n\t\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

/** Envia um texto pela Evolution. Diz se saiu, e nunca lanca. */
async function enviarWhatsApp(destino: string, texto: string, comDelay = true) {
  const url = process.env.EVOLUTION_API_URL;
  const key = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_API_INSTANCE;
  if (!url || !key || !instance) return false;

  try {
    const req = await fetch(`${url}/message/sendText/${instance}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": key },
      signal: comTimeout(),
      body: JSON.stringify({
        number: destino,
        // O "digitando..." e para o lead, que le aquilo como conversa. No grupo
        // interno ele so somaria 1,2s a latencia de cada envio.
        ...(comDelay ? { options: { delay: 1200, presence: "composing" } } : {}),
        text: texto,
      }),
    });

    // Sem PII no log: a Evolution devolve o payload enviado no corpo do erro.
    if (!req.ok) console.error("[lead] Evolution recusou o envio:", req.status);
    return req.ok;
  } catch (e) {
    console.error("[lead] Falha ao enviar WhatsApp:", e);
    return false;
  }
}

/** Resumo do lead, igual nos dois canais de alerta. */
function resumoLead(lead: Lead) {
  return [
    `Nome: ${linhaSegura(lead.nome, 80)}`,
    `E-mail: ${linhaSegura(lead.email, 160)}`,
    `Telefone: ${linhaSegura(lead.telefone, 20)}`,
    `Empresa: ${linhaSegura(lead.empresa, 120)}`,
    `Colaboradores: ${lead.colaboradores}`,
    "Origem: landing do e-book",
  ];
}

/**
 * Recado no grupo de WhatsApp do time — um por lead cadastrado.
 *
 * `EVOLUTION_GROUP_JID` e o ID do grupo, no formato `1203...@g.us`; nao e um
 * numero de telefone. Sem ele configurado, nada e enviado.
 */
async function notificarGrupo(lead: Lead, alerta?: string) {
  const grupo = process.env.EVOLUTION_GROUP_JID;
  if (!grupo) return false;

  const linhas = [
    alerta ? "*Lead com problema no cadastro*" : "*Novo lead cadastrado!*",
    "",
    ...resumoLead(lead),
    ...(alerta ? ["", `*${linhaSegura(alerta)}* — registre este lead manualmente.`] : []),
  ];

  return enviarWhatsApp(grupo, linhas.join("\n"), false);
}

async function notificarPorEmail(lead: Lead, alerta?: string) {
  const notify = process.env.LEAD_NOTIFICATION_TO;
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!notify || !apiKey || !senderEmail) return false;

  const nome = linhaSegura(lead.nome, 80);
  const empresa = linhaSegura(lead.empresa, 120);
  const linhas = [
    ...resumoLead(lead),
    ...(alerta ? ["", `*** ${linhaSegura(alerta)} — registre este lead manualmente. ***`] : []),
  ];

  try {
    const req = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      signal: comTimeout(),
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || "Vita Saúde", email: senderEmail },
        to: [{ email: notify }],
        subject: alerta
          ? `[ATENCAO] Lead: ${nome} — ${empresa} (${lead.colaboradores})`
          : `Novo lead: ${nome} — ${empresa} (${lead.colaboradores})`,
        textContent: linhas.join("\n")
      })
    });
    return req.ok;
  } catch (e) {
    console.error("[lead] Falha ao notificar internamente:", e);
    return false;
  }
}

/**
 * Alerta interno. Antes vivia DEPOIS do `return` do erro da Brevo, entao so
 * disparava no caminho feliz — exatamente quando nao era necessario. Agora roda
 * em todos os caminhos, e `alerta` diz o que deu errado.
 *
 * Sao dois canais de proposito: o aviso de que a Brevo falhou nao pode depender
 * da Brevo. O grupo do WhatsApp sai por outra infra (Evolution), entao um canal
 * cobre a queda do outro. Os dois em paralelo para nao somar timeout.
 */
async function notificarLead(lead: Lead, alerta?: string) {
  const [porEmail, porGrupo] = await Promise.allSettled([
    notificarPorEmail(lead, alerta),
    notificarGrupo(lead, alerta),
  ]);

  const saiu = (r: PromiseSettledResult<boolean>) => r.status === "fulfilled" && r.value;
  if (!saiu(porEmail) && !saiu(porGrupo)) {
    // Se nem e-mail nem grupo saiu, o log e tudo que sobrou do lead.
    console.error("[lead] NENHUM canal de alerta funcionou.", { alerta: alerta ?? "novo lead" });
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconhecido";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const { nome, email, telefone, empresa, colaboradores, website } = parsed.data;

  // Honeypot preenchido: responde 200 para nao dar pista ao bot.
  if (website) return NextResponse.json({ ok: true });

  const lead: Lead = { nome, email, telefone, empresa, colaboradores };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  /** O lead so esta seguro se chegou ao banco. Usado para decidir o alerta abaixo. */
  let leadPersistido = false;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ nome, email, telefone, empresa, colaboradores }]);
    if (dbError) {
      console.error("[lead] Falha ao inserir no Supabase:", dbError);
    } else {
      leadPersistido = true;
    }
  } else {
    // Antes este caminho era mudo: sem as envs, o insert era pulado e ninguem
    // ficava sabendo que o lead nao foi gravado em lugar nenhum.
    console.error("[lead] SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes — lead NAO persistido.");
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
  const brevoSenderName = process.env.BREVO_SENDER_NAME;
  const downloadUrl = `${site.url}${site.ebook.file}`;

  // Deixa so os numeros e adiciona 55 se nao tiver. Ex: (11) 99999-9999 -> 5511999999999
  let number = telefone.replace(/\D/g, "");
  if (number.length === 10 || number.length === 11) {
    number = `55${number}`;
  }

  await enviarWhatsApp(
    number,
    `Olá ${linhaSegura(nome.split(" ")[0] ?? nome, 40)}, tudo bem? Seu guia da NR-1 está pronto! 🎉\n\nAcesse o link abaixo para baixar o material e começar a aplicar na sua empresa:\n\n${downloadUrl}\n\nQualquer dúvida sobre a implementação na sua empresa, é só responder por aqui.`,
  );

  // Sem chave configurada o site nao quebra: o lead e registrado e o visitante
  // segue para /obrigado, onde baixa o PDF direto.
  if (!brevoApiKey || !brevoSenderEmail) {
    // Sem PII no log: nome/e-mail/telefone iam parar nos logs da Vercel.
    console.error("[lead] BREVO_API_KEY/BREVO_SENDER_EMAIL ausentes — e-mail nao enviado.", {
      persistido: leadPersistido,
    });
    // Este era o unico caminho de saida sem alerta nenhum: o lead sumia em
    // silencio. O grupo do WhatsApp continua funcionando aqui, porque nao
    // depende da Brevo.
    await notificarLead(lead, "E-mail NAO enviado (Brevo sem chave configurada)");
    return NextResponse.json({ ok: true, emailSent: false });
  }

  try {
    let attachmentBase64 = "";
    if (ATTACH_PDF) {
      const fileBuffer = await readFile(path.join(process.cwd(), "public", "ebook", "nr1-na-pratica.pdf"));
      attachmentBase64 = fileBuffer.toString("base64");
    }

    type BrevoPayload = {
      sender: { name: string; email: string };
      to: Array<{ email: string; name: string }>;
      subject: string;
      htmlContent: string;
      replyTo?: { email: string };
      attachment?: Array<{ content: string; name: string }>;
    };

    const emailPayload: BrevoPayload = {
      sender: { name: brevoSenderName || "Vita Saúde", email: brevoSenderEmail },
      to: [{ email, name: nome }],
      subject: `${site.ebook.title} — seu guia chegou`,
      htmlContent: emailHtml(nome, downloadUrl),
    };

    const siteEmail = site.email as string;
    if (siteEmail && !siteEmail.startsWith("[")) {
      emailPayload.replyTo = { email: siteEmail };
    }

    if (attachmentBase64) {
      emailPayload.attachment = [{
        content: attachmentBase64,
        name: site.ebook.downloadAs
      }];
    }

    const emailReq = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(emailPayload),
      signal: comTimeout()
    });

    if (!emailReq.ok) {
      console.error("[lead] Brevo recusou o envio:", await emailReq.text());
      await notificarLead(
        lead,
        leadPersistido ? "E-mail nao entregue" : "E-mail NAO enviado e lead NAO gravado no banco",
      );
      return NextResponse.json({ ok: true, emailSent: false });
    }

    await notificarLead(lead, leadPersistido ? undefined : "Lead NAO gravado no banco");

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("[lead] Falha inesperada no envio de email:", error);
    await notificarLead(lead, "Falha inesperada no envio");
    // O visitante nao pode ficar sem o material por causa de erro nosso.
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
