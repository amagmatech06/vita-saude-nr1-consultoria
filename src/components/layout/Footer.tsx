import Link from "next/link";

import { InstagramIcon, LinkedinIcon, WhatsappIcon, YoutubeIcon } from "@/components/icons";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { WhatsappLink } from "./WhatsappLink";

const LIGHT = "rgba(249, 249, 251, 0.75)";
const LIGHT_STRONG = "#F9F9FB";
const BORDER = "rgba(249, 249, 251, 0.12)";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-5 text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
      style={{ color: "rgba(249, 249, 251, 0.62)" }}
    >
      {children}
    </p>
  );
}

const linkClass = "text-[0.9375rem] transition-colors hover:text-[#F9F9FB]";

export function Footer() {
  const socials = [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
    ...(site.social.linkedin
      ? [{ href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon }]
      : []),
  ];

  return (
    <footer
      className="relative isolate overflow-hidden"
      style={{ background: "#252534", color: LIGHT_STRONG }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-perci" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Coluna 1 — Marca */}
          <div className="flex flex-col gap-5">
            <Logo tone="light" withFounder />
            <p className="max-w-[32ch] text-[0.9375rem] leading-[1.7]" style={{ color: LIGHT }}>
              {site.tagline}
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white/10"
                  style={{ borderColor: BORDER, color: LIGHT }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 — Produtos */}
          <div>
            <ColumnTitle>Produtos</ColumnTitle>
            <ul className="flex flex-col gap-3" style={{ color: LIGHT }}>
              <li>
                <a href="#baixar" className={linkClass}>
                  E-book NR-1 na Prática
                </a>
              </li>
              <li>
                <WhatsappLink
                  source="footer_consultoria"
                  message="Olá, Gabi! Quero saber sobre a consultoria de adequação à NR-1."
                  className={linkClass}
                >
                  Consultoria e adequação à NR-1
                </WhatsappLink>
              </li>
              <li>
                <WhatsappLink
                  source="footer_palestras"
                  message="Olá, Gabi! Quero informações sobre palestras e treinamentos."
                  className={linkClass}
                >
                  Palestras e treinamentos
                </WhatsappLink>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Conteúdo */}
          <div>
            <ColumnTitle>Conteúdo</ColumnTitle>
            <ul className="flex flex-col gap-3" style={{ color: LIGHT }}>
              <li>
                <a href="#o-guia" className={linkClass}>
                  O que há no guia
                </a>
              </li>
              <li>
                <a href="#autora" className={linkClass}>
                  Sobre a autora
                </a>
              </li>
              <li>
                <a href="#faq" className={linkClass}>
                  Perguntas frequentes
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Canal no YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Contato */}
          <div>
            <ColumnTitle>Contato</ColumnTitle>
            <ul className="flex flex-col gap-3" style={{ color: LIGHT }}>
              <li>
                <WhatsappLink source="footer_whatsapp" className={`${linkClass} inline-flex items-center gap-2`}>
                  <WhatsappIcon className="h-4 w-4" />
                  {site.whatsapp.display}
                </WhatsappLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-4 border-t pt-8 text-[0.8125rem] md:flex-row md:items-center md:justify-between"
          style={{ borderColor: BORDER, color: "rgba(249, 249, 251, 0.62)" }}
        >
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="transition-colors hover:text-[#F9F9FB]">
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
