import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionBg = "white" | "neutra" | "indigo" | "petroleo";

/**
 * As cores de fundo sao aplicadas via `style` inline, e nao via className.
 * Isso evita que o tailwind-merge descarte a classe de bg quando o consumidor
 * passa a sua propria (ex.: `className="bg-something"`).
 */
const BACKGROUNDS: Record<SectionBg, { background: string; color: string }> = {
  white: { background: "#FFFFFF", color: "#252534" },
  neutra: { background: "#F1F1F1", color: "#252534" },
  indigo: { background: "#4544BD", color: "#F9F9FB" },
  petroleo: { background: "#252534", color: "#F9F9FB" },
};

const IS_DARK: Record<SectionBg, boolean> = {
  white: false,
  neutra: false,
  indigo: true,
  petroleo: true,
};

type SectionContainerProps = {
  children: ReactNode;
  /** Variante de fundo. Padrao: branco (fundo dominante do site). */
  bg?: SectionBg;
  /** Aplica o grid 48x48, escolhendo automaticamente a versao clara ou escura. */
  grid?: boolean | "fade";
  /** Remove o padding vertical padrao (para heros que controlam o proprio). */
  flush?: boolean;
  /** Largura maxima do conteudo interno. */
  width?: "default" | "narrow" | "wide";
  as?: ElementType;
  id?: string;
  className?: string;
  /** Classes do wrapper interno (o que limita a largura). */
  innerClassName?: string;
};

const WIDTHS = {
  narrow: "max-w-[820px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
} as const;

export function SectionContainer({
  children,
  bg = "white",
  grid = false,
  flush = false,
  width = "default",
  as: Tag = "section",
  id,
  className,
  innerClassName,
}: SectionContainerProps) {
  const gridClass = !grid
    ? null
    : IS_DARK[bg]
      ? grid === "fade"
        ? "bg-grid-perci-fade"
        : "bg-grid-perci"
      : "bg-grid-perci-ink";

  return (
    <Tag
      id={id}
      style={BACKGROUNDS[bg]}
      className={cn("relative isolate overflow-hidden", className)}
    >
      {gridClass ? (
        <div aria-hidden className={cn("pointer-events-none absolute inset-0", gridClass)} />
      ) : null}

      <div
        className={cn(
          "relative mx-auto w-full px-6 lg:px-12",
          WIDTHS[width],
          !flush && "section-padding",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
