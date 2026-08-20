import type { Metadata } from "next";

import { BeneficiosSection } from "@/components/sections/BeneficiosSection";
import { CapitulosSection } from "@/components/sections/CapitulosSection";
import { CtaFinalSection } from "@/components/sections/CtaFinalSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemaSection } from "@/components/sections/ProblemaSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SobreSection } from "@/components/sections/SobreSection";
import { faq } from "@/config/ebook-content";
import { site } from "@/config/site";
import { openGraphDe } from "@/lib/seo";
import { SCHEMA_IDS, jsonLd } from "./layout";

/** 152 caracteres: abaixo do corte de ~155 do Google, com o CTA preservado. */
const DESCRICAO =
  "Guia executivo de 28 páginas sobre a NR-1: GRO, PGR, os 5 pilares e o passo a passo da gestão de riscos psicossociais. Download gratuito.";

const TITULO = `${site.ebook.title} — e-book gratuito sobre riscos psicossociais`;

export const metadata: Metadata = {
  // O `title.template` do layout so vale para segmentos FILHOS — a home fica no
  // mesmo segmento, entao o sufixo da marca precisa ser explicito aqui.
  title: `${TITULO} | ${site.name}`,
  description: DESCRICAO,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: openGraphDe({ path: "/", title: TITULO, description: DESCRICAO }),
};

/**
 * Um unico grafo. `author` e `publisher` agora REFERENCIAM as entidades
 * declaradas no layout em vez de recriar nos anonimos — antes o autor do Book
 * era um Person so com o nome, sem nenhuma das credenciais da fundadora.
 */
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: `${site.ebook.title} — ${site.ebook.subtitle}`,
      inLanguage: "pt-BR",
      isPartOf: { "@id": SCHEMA_IDS.website },
      about: { "@id": SCHEMA_IDS.organizacao },
      primaryImageOfPage: { "@id": `${site.url}/#capa` },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      isPartOf: { "@id": `${site.url}/#webpage` },
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.pergunta,
        acceptedAnswer: { "@type": "Answer", text: item.resposta },
      })),
    },
    {
      "@type": "Book",
      "@id": `${site.url}/#ebook`,
      name: site.ebook.title,
      alternateName: site.ebook.subtitle,
      description: site.description,
      url: `${site.url}/#baixar`,
      image: { "@type": "ImageObject", "@id": `${site.url}/#capa`, url: `${site.url}${site.ebook.cover}` },
      numberOfPages: site.ebook.pages,
      bookEdition: site.ebook.edition,
      inLanguage: "pt-BR",
      bookFormat: "https://schema.org/EBook",
      author: { "@id": SCHEMA_IDS.fundadora },
      publisher: { "@id": SCHEMA_IDS.organizacao },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#baixar`,
        seller: { "@id": SCHEMA_IDS.organizacao },
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeSchema) }}
      />
      <HeroSection />
      <ProblemaSection />
      <CapitulosSection />
      <QuoteSection />
      <BeneficiosSection />
      <SobreSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
