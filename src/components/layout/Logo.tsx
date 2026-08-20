import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "light" | "ink";
  className?: string;
  /** Mostra a assinatura da fundadora abaixo do nome. */
  withFounder?: boolean;
};

/**
 * Monograma extraido do proprio ebook (PNG com transparencia, versao clara).
 * [PENDENTE] Substituir por /logos/gb-light.svg e /logos/gb-dark.svg quando o
 * arquivo vetorial oficial chegar — basta trocar o `src` abaixo.
 */
export function Logo({ tone = "light", className, withFounder = false }: LogoProps) {
  const color = tone === "light" ? "#F9F9FB" : "#070A26";
  const subColor = tone === "light" ? "rgba(249, 249, 251, 0.62)" : "rgba(7, 10, 38, 0.68)";

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <Image
        src="/logos/gb-light.png"
        alt=""
        width={98}
        height={128}
        priority
        className="h-8 w-auto"
        style={tone === "ink" ? { filter: "invert(1) brightness(0.25)" } : undefined}
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.25rem] font-bold tracking-[-0.02em]" style={{ color }}>
          {site.name}
        </span>
        {withFounder ? (
          <span
            className="mt-1.5 text-[0.75rem] font-medium uppercase tracking-[0.14em]"
            style={{ color: subColor }}
          >
            por {site.founder.name}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
