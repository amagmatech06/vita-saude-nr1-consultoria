import type { Metadata } from "next";

import { PageHero } from "@/components/ui/layout/PageHero";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { site } from "@/config/site";
import { openGraphDe } from "@/lib/seo";

const DESCRICAO =
  "Como a Vita Saúde coleta, usa e protege os dados pessoais informados no formulário de download do e-book.";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: DESCRICAO,
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
  openGraph: openGraphDe({
    path: "/privacidade",
    title: `Política de privacidade | ${site.name}`,
    description: DESCRICAO,
  }),
};

/**
 * [REVISAR JURIDICAMENTE] Texto-base de conformidade com a LGPD
 * (Lei 13.709/2018), escrito para o unico tratamento que o site faz hoje:
 * o formulario de download do e-book.
 */
export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="LGPD"
        title="Política de privacidade"
        accent="privacidade"
        description="Como tratamos os dados que você informa ao baixar o e-book."
        variant="minimal"
      />

      <SectionContainer bg="white" width="narrow">
        <div
          className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-a:text-[#4544BD]"
          style={{ color: "rgba(7, 10, 38, 0.82)" }}
        >
          <p>
            Esta política descreve como os dados pessoais informados neste site são coletados,
            usados e protegidos, em conformidade com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018).
          </p>

          <h2>1. Quem é o controlador</h2>
          <p>
            <strong>{site.name}</strong>
            {site.legal.razaoSocial ? ` (${site.legal.razaoSocial})` : ""}, inscrita no CNPJ sob o
            nº <strong>{site.legal.cnpj}</strong>
            {site.legal.endereco ? `, com sede em ${site.legal.endereco}` : ""}, é a controladora
            dos dados pessoais tratados neste site. Contato pelo WhatsApp {site.whatsapp.display}.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>
            Apenas o que você digita no formulário de download: <strong>nome</strong>,{" "}
            <strong>e-mail</strong>, <strong>telefone / WhatsApp</strong> e{" "}
            <strong>empresa</strong>. Não coletamos CPF, dados financeiros nem dados sensíveis.
            O servidor registra temporariamente o endereço IP da requisição, usado somente para
            limitar envios automatizados.
          </p>

          <h2>3. Para que usamos</h2>
          <ul>
            <li>Enviar o e-book solicitado para o e-mail informado;</li>
            <li>
              Enviar o link do e-book e mensagens de acompanhamento para o WhatsApp informado;
            </li>
            <li>
              Enviar comunicações sobre NR-1, saúde corporativa e serviços da {site.name}, quando
              você autoriza no formulário;
            </li>
            <li>Entender de que empresas parte o interesse pelo material.</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>
            O tratamento se apoia no <strong>consentimento</strong> (art. 7º, I da LGPD), dado
            de forma livre e específica ao marcar a caixa de autorização do formulário.
          </p>

          <h2>5. Compartilhamento</h2>
          <p>
            Não vendemos nem cedemos seus dados. Eles são processados apenas por fornecedores
            necessários para a operação do site: <strong>Vercel</strong> (hospedagem),{" "}
            <strong>Supabase</strong> (banco de dados onde o cadastro fica armazenado),{" "}
            <strong>Brevo</strong> (envio de e-mail) e o provedor de API de{" "}
            <strong>WhatsApp</strong> usado no envio automático da mensagem com o material.
          </p>

          <h2>6. Transferência internacional</h2>
          <p>
            Os fornecedores acima operam servidores fora do Brasil, de modo que seus dados podem
            ser transferidos e processados no exterior, nos termos dos arts. 33 e seguintes da
            LGPD. A transferência ocorre apenas para a execução do que você solicitou e está
            amparada nas cláusulas contratuais e nos compromissos de proteção de dados firmados
            com cada fornecedor.
          </p>

          <h2>7. Por quanto tempo guardamos</h2>
          <p>
            Mantemos os dados enquanto durar o relacionamento ou até que você peça a exclusão.
            O registro de IP usado no controle de envios é descartado em minutos.
          </p>

          <h2>8. Seus direitos</h2>
          <p>
            A LGPD garante a você confirmar a existência do tratamento, acessar, corrigir,
            anonimizar, portar ou eliminar seus dados, além de revogar o consentimento a
            qualquer momento. Para exercer qualquer um deles, entre em contato pelo WhatsApp. O
            cancelamento das comunicações também pode ser feito pelo link no rodapé de cada
            e-mail ou respondendo <em>sair</em> na conversa do WhatsApp.
          </p>

          <h2>9. Encarregado de dados</h2>
          <p>
            {/* [PENDENTE] Nomear o encarregado e publicar o e-mail dedicado assim
                que o dominio for registrado no registro.br. */}
            Enquanto o canal de e-mail dedicado não é publicado, os pedidos relacionados à
            proteção de dados podem ser feitos pelo WhatsApp {site.whatsapp.display}, aos cuidados
            do encarregado de dados da {site.name}. Respondemos em até 15 dias, conforme o art.
            19 da LGPD.
          </p>

          <h2>10. Segurança</h2>
          <p>
            O site trafega integralmente sobre HTTPS e o acesso aos dados é restrito às pessoas
            que precisam deles para atender à sua solicitação.
          </p>

          <h2>11. Cookies</h2>
          <p>
            Este site não usa cookies de publicidade nem de rastreamento de terceiros. Se um
            serviço de analytics for adotado no futuro, esta política será atualizada antes.
          </p>

          <h2>12. Alterações</h2>
          <p>
            Mudanças nesta política serão publicadas nesta mesma página, com nova data de
            atualização.
          </p>

          <p style={{ color: "rgba(7, 10, 38, 0.68)" }}>
            <em>Última atualização: Agosto de 2026</em>
          </p>
        </div>
      </SectionContainer>
    </>
  );
}
