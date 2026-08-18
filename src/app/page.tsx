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

export const metadata: Metadata = {
  title: `${site.ebook.title} — e-book gratuito sobre riscos psicossociais`,
  description:
    "Guia executivo de 28 páginas sobre a NR-1 e a gestão de riscos psicossociais: GRO, PGR, os 5 pilares, 10 benefícios e o passo a passo da adequação. Download gratuito.",
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: site.ebook.title,
  alternateName: site.ebook.subtitle,
  numberOfPages: site.ebook.pages,
  inLanguage: "pt-BR",
  bookFormat: "https://schema.org/EBook",
  author: { "@type": "Person", name: site.founder.name },
  publisher: { "@type": "Organization", name: site.name },
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", availability: "https://schema.org/InStock" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, bookSchema]) }}
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
