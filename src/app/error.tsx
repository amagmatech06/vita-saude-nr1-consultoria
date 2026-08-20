"use client";

import { useEffect } from "react";

import { CTALink } from "@/components/ui/layout/CTALink";
import { PageHero } from "@/components/ui/layout/PageHero";

/**
 * Sem este boundary, qualquer throw em server component vira a tela generica
 * "Application error: a server-side exception has occurred" — risco real
 * enquanto `next.config.ts` ignorar erros de tipo no build.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Erro nao tratado:", error);
  }, [error]);

  return (
    <PageHero
      eyebrow="Algo deu errado"
      title="Não conseguimos carregar esta página"
      accent="carregar"
      description="O erro foi registrado. Tente de novo em instantes — se persistir, fale com a gente pelo WhatsApp."
      variant="minimal"
    >
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2.5 rounded-full border px-7 text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          style={{ borderColor: "rgba(249, 249, 251, 0.3)", color: "#F9F9FB" }}
        >
          Tentar novamente
        </button>
        <CTALink href="/" variant="ghost-light">
          Voltar para a home
        </CTALink>
      </div>
    </PageHero>
  );
}
