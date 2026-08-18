import { BlurFade } from "@/components/BlurFade";
import { WhatsappIcon } from "@/components/icons";
import { WhatsappLink } from "@/components/layout/WhatsappLink";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { CTALink } from "@/components/ui/layout/CTALink";
import { SectionEyebrow } from "@/components/ui/layout/SectionEyebrow";
import { ctaFinal } from "@/config/ebook-content";

/**
 * O amarelo gema ja foi usado duas vezes na pagina (botao do formulario e
 * palavra-chave do quote). Aqui os botoes usam branco e contorno claro.
 */
export function CtaFinalSection() {
  return (
    <SectionContainer bg="indigo" grid id="contato">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-20">
        <BlurFade>
          <div className="flex flex-col gap-6">
            <SectionEyebrow tone="light">{ctaFinal.eyebrow}</SectionEyebrow>
            <h2
              className="max-w-[20ch] text-[2rem] leading-[1.12] tracking-[-0.025em] md:text-[2.75rem]"
              style={{ color: "#F9F9FB" }}
            >
              {ctaFinal.title}
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsappLink
                source="cta_final"
                message="Olá, Gabi! Li o guia da NR-1 e quero conversar sobre a minha empresa."
                className="group inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#F9F9FB", color: "#252534" }}
              >
                <WhatsappIcon className="h-[18px] w-[18px]" />
                {ctaFinal.botao}
              </WhatsappLink>

              <CTALink href="#baixar" variant="ghost-light" arrow>
                Baixar o guia
              </CTALink>
            </div>
          </div>
        </BlurFade>

        <BlurFade index={1}>
          <figure
            className="rounded-2xl border p-7 lg:p-9"
            style={{ borderColor: "rgba(249, 249, 251, 0.22)" }}
          >
            <blockquote
              className="font-serif text-[1.125rem] leading-[1.5] md:text-[1.3125rem]"
              style={{ color: "rgba(249, 249, 251, 0.94)" }}
            >
              {ctaFinal.quote}
            </blockquote>
            <figcaption
              className="mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
              style={{ color: "rgba(249, 249, 251, 0.8)" }}
            >
              {ctaFinal.autor}
            </figcaption>
          </figure>
        </BlurFade>
      </div>
    </SectionContainer>
  );
}
