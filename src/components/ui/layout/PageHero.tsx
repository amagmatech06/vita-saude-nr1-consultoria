import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./SectionEyebrow";

export type PageHeroVariant = "full" | "compact" | "minimal";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: string;
  /** Palavra-chave do titulo, renderizada em serifada italica. */
  accent?: string;
  description?: ReactNode;
  /** Conteudo extra abaixo da descricao (botoes, formulario, badges). */
  children?: ReactNode;
  /** Coluna direita — mockup, imagem, card. So aparece na variante `full`. */
  aside?: ReactNode;
  variant?: PageHeroVariant;
  className?: string;
};

const PADDING: Record<PageHeroVariant, string> = {
  full: "pt-32 pb-20 lg:pt-40 lg:pb-28",
  compact: "pt-28 pb-16 lg:pt-36 lg:pb-20",
  minimal: "pt-28 pb-12 lg:pt-32 lg:pb-14",
};

const TITLE_SIZE: Record<PageHeroVariant, string> = {
  full: "text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem]",
  compact: "text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]",
  minimal: "text-[1.875rem] sm:text-[2.25rem] lg:text-[2.75rem]",
};

function splitOnAccent(title: string, accent?: string) {
  if (!accent) return null;
  const at = title.indexOf(accent);
  if (at === -1) return null;
  return {
    before: title.slice(0, at),
    match: title.slice(at, at + accent.length),
    after: title.slice(at + accent.length),
  };
}

/**
 * Hero reutilizavel das paginas. Sempre na cor principal escura com grid-fade,
 * conforme a regra de cor do projeto.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
  aside,
  variant = "compact",
  className,
}: PageHeroProps) {
  const parts = splitOnAccent(title, accent);
  const showAside = variant === "full" && Boolean(aside);

  return (
    <section
      style={{ background: "#252534", color: "#F9F9FB" }}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-perci-fade" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(69, 68, 189, 0.5) 0%, rgba(69, 68, 189, 0.2) 45%, transparent 72%)",
        }}
      />

      <div
        className={cn(
          "relative mx-auto w-full max-w-[1200px] px-6 lg:px-12",
          PADDING[variant],
        )}
      >
        <div
          className={cn(
            "grid items-center gap-12",
            showAside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16",
          )}
        >
          <div className="flex flex-col gap-6">
            {eyebrow ? <SectionEyebrow tone="light">{eyebrow}</SectionEyebrow> : null}

            <h1
              className={cn("max-w-[18ch] tracking-[-0.025em]", TITLE_SIZE[variant])}
              style={{ color: "#F9F9FB" }}
            >
              {parts ? (
                <>
                  {parts.before}
                  <span className="accent-italic">{parts.match}</span>
                  {parts.after}
                </>
              ) : (
                title
              )}
            </h1>

            {description ? (
              <p
                className="max-w-[54ch] text-[1.0625rem] leading-[1.75] md:text-[1.125rem]"
                style={{ color: "rgba(249, 249, 251, 0.72)" }}
              >
                {description}
              </p>
            ) : null}

            {children}
          </div>

          {showAside ? <div className="relative">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
