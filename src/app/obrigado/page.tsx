import type { Metadata } from "next";

import { BlurFade } from "@/components/BlurFade";
import { WhatsappIcon } from "@/components/icons";
import { WhatsappLink } from "@/components/layout/WhatsappLink";
import { DownloadButton } from "@/components/sections/DownloadButton";
import { PageHero } from "@/components/ui/layout/PageHero";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { obrigado } from "@/config/ebook-content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Seu guia está a caminho",
  description: "Download do e-book NR-1 na Prática.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <>
      <PageHero
        eyebrow={obrigado.eyebrow}
        title={obrigado.title}
        accent="a caminho"
        description={obrigado.description}
        variant="compact"
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Uso 1 de 2 do amarelo gema nesta pagina */}
          <DownloadButton label={obrigado.botaoDownload} />
          <WhatsappLink
            source="obrigado"
            message="Olá, Gabi! Acabei de baixar o guia da NR-1 e quero conversar."
            className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border px-7 text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            style={{ borderColor: "rgba(249, 249, 251, 0.3)", color: "#F9F9FB" }}
          >
            <WhatsappIcon className="h-[18px] w-[18px]" />
            Falar com a Gabi
          </WhatsappLink>
        </div>

        <p className="mt-4 text-[0.875rem]" style={{ color: "rgba(249, 249, 251, 0.62)" }}>
          {obrigado.spamAviso}
        </p>
      </PageHero>

      <SectionContainer bg="white">
        <BlurFade>
          <figure className="flex max-w-[26ch] flex-col gap-6">
            <blockquote
              className="font-serif text-[1.5rem] leading-[1.35] tracking-[-0.02em] md:text-[2rem]"
              style={{ color: "#070A26" }}
            >
              {obrigado.fecho}
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10" style={{ background: "rgba(7, 10, 38, 0.3)" }} />
              <span
                className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: "rgba(7, 10, 38, 0.68)" }}
              >
                {site.founder.name} · {site.ebook.title}
              </span>
            </figcaption>
          </figure>
        </BlurFade>
      </SectionContainer>
    </>
  );
}
