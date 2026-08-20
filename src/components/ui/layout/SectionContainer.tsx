import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionBg = "white" | "neutra" | "indigo" | "petroleo";

/**
 * As cores de fundo sao aplicadas via `style` inline, e nao via className.
 * Isso evita que o tailwind-merge descarte a classe de bg quando o consumidor
 * passa a sua propria (ex.: `className="bg-something"`).
 */
const BACKGROUNDS: Record<SectionBg, { background: string; color: string }> = {
  white: { background: "#FFFFFF", color: "#070A26" },
  neutra: { background: "#F1F1F1", color: "#070A26" },
  indigo: { background: "#4544BD", color: "#F9F9FB" },
  petroleo: { background: "#070A26", color: "#F9F9FB" },
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
  /**
   * `id` do heading que nomeia a secao. Sem nome acessivel, <section> e exposta
   * como `generic` e nao aparece na navegacao por landmarks do leitor de tela —
   * eram 8 secoes anonimas na home.
   */
  labelledBy?: string;
  /** Rotulo direto, para secoes que nao tem heading (ex.: a citacao). */
  ariaLabel?: string;
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
  labelledBy,
  ariaLabel,
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
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      style={BACKGROUNDS[bg]}
      className={cn(
        // `overflow-clip` e nao `overflow-hidden`: o hidden cria um scroll
        // container e anula o `position: sticky` dos filhos (as colunas
        // sticky de Capitulos e FAQ). O clip recorta igual sem esse efeito.
        "relative isolate overflow-clip",
        // A navbar e fixa (72px). O scroll-margin precisa ficar no MESMO
        // elemento que carrega o `id` — e o alvo da ancora — senao o topo da
        // secao fica escondido atras dela.
        id && "scroll-mt-[88px]",
        className,
      )}
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
