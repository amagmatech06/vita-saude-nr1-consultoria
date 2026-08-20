import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./SectionEyebrow";

type Tone = "ink" | "light";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  /** Palavra-chave do titulo que recebe enfase. Precisa existir em `title`. */
  accent?: string;
  /**
   * Como a palavra-chave e enfatizada:
   * `italic` — serifada em italico (padrao editorial)
   * `gema`   — amarelo gema. ATENCAO: maximo 2 usos do gema por pagina.
   */
  accentStyle?: "italic" | "gema";
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
  /** `id` do heading, para o `aria-labelledby` da secao que o contem. */
  titleId?: string;
  className?: string;
};

const SIZES = {
  sm: "text-[1.75rem] md:text-[2.125rem]",
  md: "text-[2rem] md:text-[2.75rem] lg:text-[3.25rem]",
  lg: "text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]",
} as const;

/** Divide o titulo em torno da palavra-chave, preservando o restante intacto. */
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

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent,
  accentStyle = "italic",
  tone = "ink",
  align = "left",
  as: Tag = "h2",
  size = "md",
  titleId,
  className,
}: SectionHeadingProps) {
  const parts = splitOnAccent(title, accent);
  const titleColor = tone === "light" ? "#F9F9FB" : "#070A26";
  const descriptionColor =
    tone === "light" ? "rgba(249, 249, 251, 0.78)" : "rgba(7, 10, 38, 0.72)";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow> : null}

      <Tag
        id={titleId}
        className={cn("max-w-[22ch] tracking-[-0.02em]", SIZES[size])}
        style={{ color: titleColor }}
      >
        {parts ? (
          <>
            {parts.before}
            <span
              className={accentStyle === "italic" ? "accent-italic" : undefined}
              style={accentStyle === "gema" ? { color: "#FEC717" } : undefined}
            >
              {parts.match}
            </span>
            {parts.after}
          </>
        ) : (
          title
        )}
      </Tag>

      {description ? (
        <p className="max-w-[58ch] text-[1rem] leading-[1.75] md:text-[1.0625rem]" style={{ color: descriptionColor }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
