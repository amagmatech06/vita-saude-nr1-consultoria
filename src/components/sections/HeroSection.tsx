import Image from "next/image";

import { CTALink } from "@/components/ui/layout/CTALink";
import { SectionEyebrow } from "@/components/ui/layout/SectionEyebrow";
import { hero } from "@/config/ebook-content";
import { site } from "@/config/site";
import { LeadForm } from "./LeadForm";

/**
 * O hero NAO usa BlurFade de proposito.
 *
 * O BlurFade parte de `opacity: 0` e so revela o conteudo depois da hidratacao
 * do React. Acima da dobra isso deixa a primeira tela em branco ate o JS
 * carregar — no Lighthouse mobile, 86% do LCP era render delay por causa disso.
 * Animacao de entrada fica reservada as secoes abaixo da dobra.
 */
export function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: "#252534", color: "#F9F9FB" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-perci-fade" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[620px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(69, 68, 189, 0.55) 0%, rgba(69, 68, 189, 0.22) 45%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-20 pt-28 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,420px)] lg:gap-16">
          {/* Coluna esquerda — copy + capa */}
          <div className="flex flex-col gap-6">
            <SectionEyebrow tone="light">{hero.eyebrow}</SectionEyebrow>

            <h1
              className="text-[2.75rem] leading-[1.02] tracking-[-0.03em] sm:text-[3.5rem] lg:text-[4.25rem]"
              style={{ color: "#F9F9FB" }}
            >
              NR-1 <span className="accent-italic">na prática</span>
            </h1>

            <p
              className="max-w-[34ch] font-serif text-[1.25rem] leading-[1.35] md:text-[1.5rem]"
              style={{ color: "rgba(249, 249, 251, 0.92)" }}
            >
              {hero.subtitle}
            </p>

            <p
              className="max-w-[52ch] text-[1rem] leading-[1.75] md:text-[1.0625rem]"
              style={{ color: "rgba(249, 249, 251, 0.68)" }}
            >
              {hero.description}
            </p>

            <ul className="flex flex-wrap gap-2.5">
              {hero.badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border px-4 py-2 text-[0.8125rem] font-medium"
                  style={{
                    borderColor: "rgba(249, 249, 251, 0.22)",
                    color: "rgba(249, 249, 251, 0.82)",
                  }}
                >
                  {badge}
                </li>
              ))}
            </ul>

            {/* No mobile o formulario cai abaixo da dobra — este atalho garante
                um CTA visivel na primeira tela. Contorno, nao gema: o amarelo
                ja tem seus dois usos (botao do formulario e palavra do quote). */}
            <div className="lg:hidden">
              <CTALink href="#baixar" variant="ghost-light" arrow fullWidth>
                Quero o guia gratuito
              </CTALink>
            </div>

            <div className="mt-2 flex items-center gap-5">
              <Image
                src={site.ebook.cover}
                alt={`Capa do e-book ${site.ebook.title}`}
                width={168}
                height={238}
                priority
                className="w-[132px] flex-none rotate-[-3deg] rounded-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] sm:w-[150px]"
              />
              <div className="flex flex-col gap-1">
                <p
                  className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(249, 249, 251, 0.62)" }}
                >
                  Por
                </p>
                <p className="font-serif text-[1.125rem] font-bold" style={{ color: "#F9F9FB" }}>
                  {site.founder.name}
                </p>
                <p
                  className="max-w-[24ch] text-[0.8125rem] leading-[1.55]"
                  style={{ color: "rgba(249, 249, 251, 0.62)" }}
                >
                  {site.founder.role}
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita — formulario de captura */}
          <div className="lg:sticky lg:top-24">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
