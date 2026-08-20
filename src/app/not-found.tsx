import type { Metadata } from "next";

import { CTALink } from "@/components/ui/layout/CTALink";
import { PageHero } from "@/components/ui/layout/PageHero";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/**
 * Sem este arquivo, quem erra a URL recebe o 404 embutido do Next — em ingles,
 * sem estilo e sem nenhum caminho de volta ao funil.
 */
export default function NotFound() {
  return (
    <PageHero
      eyebrow="Erro 404"
      title="Esta página não existe"
      accent="não existe"
      description="O endereço que você abriu não está mais aqui — ou nunca esteve. O guia da NR-1 continua disponível na página inicial."
      variant="minimal"
    >
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <CTALink href="/#baixar" variant="ghost-light" arrow>
          Baixar o guia gratuito
        </CTALink>
        <CTALink href="/" variant="ghost-light">
          Voltar para a home
        </CTALink>
      </div>
    </PageHero>
  );
}
