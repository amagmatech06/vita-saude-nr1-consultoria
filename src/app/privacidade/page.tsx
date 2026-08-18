import type { Metadata } from "next";

import { PageHero } from "@/components/ui/layout/PageHero";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a Vita Saúde coleta, usa e protege os dados pessoais informados no formulário de download do e-book.",
  alternates: { canonical: "/privacidade" },
};

/**
 * [REVISAR JURIDICAMENTE] Texto-base de conformidade com a LGPD
 * (Lei 13.709/2018), escrito para o unico tratamento que o site faz hoje:
 * o formulario de download do e-book. Deve ser revisado por advogado antes
 * do lancamento, e os [PLACEHOLDER] precisam ser preenchidos.
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
            {site.name} ({site.cnpj}), com contato em {site.email}
            {" "}e WhatsApp {site.whatsapp.display}, é a controladora dos dados tratados aqui.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>
            Apenas o que você digita no formulário de download: <strong>nome</strong>,
            <strong> e-mail</strong> e <strong>empresa</strong>. Não coletamos CPF, telefone,
            dados financeiros nem dados sensíveis. O servidor registra temporariamente o endereço
            IP da requisição, usado somente para limitar envios automatizados.
          </p>

          <h2>3. Para que usamos</h2>
          <ul>
            <li>Enviar o e-book solicitado para o e-mail informado;</li>
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
            necessários para a operação do site: <strong>Vercel</strong> (hospedagem) e{" "}
            <strong>Resend</strong> (envio de e-mail).
          </p>

          <h2>6. Por quanto tempo guardamos</h2>
          <p>
            Mantemos os dados enquanto durar o relacionamento ou até que você peça a exclusão.
            O registro de IP usado no controle de envios é descartado em minutos.
          </p>

          <h2>7. Seus direitos</h2>
          <p>
            A LGPD garante a você confirmar a existência do tratamento, acessar, corrigir,
            anonimizar, portar ou eliminar seus dados, além de revogar o consentimento a
            qualquer momento. Para exercer qualquer um deles, escreva para {site.email}. O
            cancelamento das comunicações também pode ser feito pelo link no rodapé de cada
            e-mail.
          </p>

          <h2>8. Segurança</h2>
          <p>
            O site trafega integralmente sobre HTTPS e o acesso aos dados é restrito às pessoas
            que precisam deles para atender à sua solicitação.
          </p>

          <h2>9. Cookies</h2>
          <p>
            Este site não usa cookies de publicidade nem de rastreamento de terceiros. Se um
            serviço de analytics for adotado no futuro, esta política será atualizada antes.
          </p>

          <h2>10. Alterações</h2>
          <p>
            Mudanças nesta política serão publicadas nesta mesma página, com nova data de
            atualização.
          </p>

          <p style={{ color: "rgba(7, 10, 38, 0.68)" }}>
            <em>Última atualização: [PLACEHOLDER: data de publicação]</em>
          </p>
        </div>
      </SectionContainer>
    </>
  );
}
