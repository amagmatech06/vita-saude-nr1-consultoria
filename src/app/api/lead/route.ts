import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/config/site";

export const runtime = "nodejs";

/**
 * Anexar o PDF (3,2 MB) e mais fiel ao "receba o guia por e-mail", mas alguns
 * servidores corporativos barram anexos grandes — e o publico aqui e B2B.
 * O e-mail sempre leva o link de download; o anexo pode ser desligado aqui.
 */
const ATTACH_PDF = process.env.EMAIL_ATTACH_PDF !== "false";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(80),
  email: z.email("E-mail inválido.").max(160),
  empresa: z.string().trim().min(2, "Informe a empresa.").max(120),
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
    <tr><td style="background:#252534;padding:32px 32px 28px;">
      <p style="margin:0 0 10px;color:rgba(249,249,251,.6);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${site.ebook.edition}</p>
      <h1 style="margin:0;color:#F9F9FB;font-size:26px;line-height:1.25;font-weight:700;">${site.ebook.title}</h1>
      <p style="margin:8px 0 0;color:rgba(249,249,251,.72);font-size:14px;line-height:1.6;">${site.ebook.subtitle}</p>
    </td></tr>
    <tr><td style="padding:32px;">
      <p style="margin:0 0 16px;color:#252534;font-size:16px;line-height:1.7;">Olá, ${primeiroNome}!</p>
      <p style="margin:0 0 24px;color:rgba(37,37,52,.78);font-size:15px;line-height:1.7;">
        Seu guia está pronto. São 28 páginas com conceitos, ferramentas, indicadores
        e o passo a passo completo da adequação à NR-1.
      </p>
      <a href="${downloadUrl}" style="display:inline-block;background:#FEC717;color:#252534;text-decoration:none;font-weight:700;font-size:15px;padding:16px 28px;border-radius:999px;">Baixar o PDF</a>
      <p style="margin:28px 0 0;padding-top:24px;border-top:1px solid rgba(37,37,52,.1);color:rgba(37,37,52,.6);font-size:14px;line-height:1.7;">
        Qualquer dúvida sobre a implementação na sua empresa, é só responder este e-mail
        ou chamar no WhatsApp ${site.whatsapp.display}.
      </p>
      <p style="margin:20px 0 0;color:#252534;font-size:14px;line-height:1.6;">
        <strong>${site.founder.name}</strong><br />
        <span style="color:rgba(37,37,52,.6);">${site.founder.role}</span>
      </p>
    </td></tr>
  </table>
</body></html>`;
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

  const { nome, email, empresa, website } = parsed.data;

  // Honeypot preenchido: responde 200 para nao dar pista ao bot.
  if (website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const downloadUrl = `${site.url}${site.ebook.file}`;

  // Sem chave configurada o site nao quebra: o lead e registrado e o visitante
  // segue para /obrigado, onde baixa o PDF direto.
  if (!apiKey || !from) {
    console.warn("[lead] RESEND_API_KEY/RESEND_FROM ausentes — e-mail nao enviado.", {
      nome,
      email,
      empresa,
    });
    return NextResponse.json({ ok: true, emailSent: false });
  }

  try {
    const resend = new Resend(apiKey);

    const attachments = ATTACH_PDF
      ? [
          {
            filename: site.ebook.downloadAs,
            content: (
              await readFile(path.join(process.cwd(), "public", "ebook", "nr1-na-pratica.pdf"))
            ).toString("base64"),
          },
        ]
      : undefined;

    const { error } = await resend.emails.send({
      from,
      to: email,
      replyTo: site.email.startsWith("[") ? undefined : site.email,
      subject: `${site.ebook.title} — seu guia chegou`,
      html: emailHtml(nome, downloadUrl),
      attachments,
    });

    if (error) {
      console.error("[lead] Resend recusou o envio:", error);
      return NextResponse.json({ ok: true, emailSent: false });
    }

    const notify = process.env.LEAD_NOTIFICATION_TO;
    if (notify) {
      await resend.emails.send({
        from,
        to: notify,
        subject: `Novo lead: ${nome} — ${empresa}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nEmpresa: ${empresa}\nOrigem: landing do e-book`,
      });
    }

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("[lead] Falha inesperada no envio:", error);
    // O visitante nao pode ficar sem o material por causa de erro nosso.
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
