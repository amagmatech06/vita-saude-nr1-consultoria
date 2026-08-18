import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  /** Em fundo escuro o sobretitulo usa off-white; em fundo claro, indigo. */
  tone?: "ink" | "light";
  className?: string;
};

/**
 * Sobretitulo de secao: 11px, tracking 2px, com underline solido de 16px
 * (o traco vem do `::before` da utility `.eyebrow`, definida em globals.css).
 */
export function SectionEyebrow({ children, tone = "ink", className }: SectionEyebrowProps) {
  return (
    <p
      className={cn("eyebrow", className)}
      style={{ color: tone === "light" ? "rgba(249, 249, 251, 0.75)" : "#4544BD" }}
    >
      {children}
    </p>
  );
}
