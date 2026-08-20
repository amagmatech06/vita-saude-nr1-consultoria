import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CTAVariant = "primary" | "secondary" | "ghost-light";

type CTALinkProps = {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  /** Renderiza a seta que desloca no hover. */
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-semibold leading-none transition-all duration-200 min-h-[54px]";

const VARIANTS: Record<CTAVariant, { className: string; style: React.CSSProperties }> = {
  /** Amarelo gema. Acento raro — no maximo 2 usos por pagina, contando o quote. */
  primary: {
    className: "hover:-translate-y-0.5 hover:brightness-95",
    style: { background: "#FEC717", color: "#070A26" },
  },
  secondary: {
    className: "border hover:-translate-y-0.5",
    style: { background: "transparent", color: "#070A26", borderColor: "rgba(7, 10, 38, 0.22)" },
  },
  "ghost-light": {
    className: "border hover:-translate-y-0.5 hover:bg-white/10",
    style: { background: "transparent", color: "#F9F9FB", borderColor: "rgba(249, 249, 251, 0.3)" },
  },
};

export function CTALink({
  href,
  children,
  variant = "primary",
  arrow = false,
  fullWidth = false,
  className,
  ...rest
}: CTALinkProps) {
  const variantConfig = VARIANTS[variant];
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <>
      {children}
      {arrow ? (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      ) : null}
    </>
  );

  const classes = cn(BASE, variantConfig.className, fullWidth && "w-full", className);

  if (isExternal) {
    return (
      <a
        href={href}
        style={variantConfig.style}
        className={classes}
        // `mailto:` abre o cliente de e-mail — abrir em nova aba deixaria uma
        // guia orfa. So o http externo vai para nova aba.
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} style={variantConfig.style} className={classes} {...rest}>
      {content}
    </Link>
  );
}
