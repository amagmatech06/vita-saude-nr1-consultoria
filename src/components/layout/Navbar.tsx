"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { CTALink } from "@/components/ui/layout/CTALink";

/**
 * Caminho absoluto (`/#secao`), nao fragmento puro (`#secao`).
 * A Navbar e o Footer sao globais: em /privacidade e /obrigado essas seces nao
 * existem, e o link de fragmento puro simplesmente nao fazia nada.
 */
const LINKS = [
  { href: "/#o-guia", label: "O guia" },
  { href: "/#autora", label: "A autora" },
  { href: "/#faq", label: "Dúvidas" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
      style={{
        background: "#070A26",
        boxShadow: scrolled ? "0 1px 0 rgba(249, 249, 251, 0.12)" : "none",
      }}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-12"
      >
        <Logo tone="light" />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link relative text-[0.9375rem] font-medium transition-colors"
                style={{ color: "rgba(249, 249, 251, 0.78)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <CTALink href="/#baixar" variant="ghost-light" className="min-h-[44px] px-5 text-[0.875rem]">
          Baixar o guia
        </CTALink>
      </nav>
    </header>
  );
}
