import Image from "next/image";

import { cn } from "@/lib/utils";

export type NumberedItem = {
  numero: string;
  titulo: string;
  texto?: string;
  /** Miniatura opcional a esquerda do numero. */
  thumb?: { src: string; alt: string };
};

type NumberedListProps = {
  items: readonly NumberedItem[];
  tone?: "ink" | "light";
  /** 1 coluna (padrao) ou 2 colunas a partir de md. */
  columns?: 1 | 2;
  className?: string;
};

export function NumberedList({
  items,
  tone = "ink",
  columns = 1,
  className,
}: NumberedListProps) {
  const isLight = tone === "light";

  const numberColor = isLight ? "rgba(249, 249, 251, 0.35)" : "rgba(69, 68, 189, 0.45)";
  const titleColor = isLight ? "#F9F9FB" : "#070A26";
  const textColor = isLight ? "rgba(249, 249, 251, 0.7)" : "rgba(7, 10, 38, 0.68)";
  const borderColor = isLight ? "rgba(249, 249, 251, 0.14)" : "rgba(7, 10, 38, 0.1)";

  return (
    <ol className={cn("grid gap-0", columns === 2 && "md:grid-cols-2 md:gap-x-12", className)}>
      {items.map((item) => (
        <li
          key={item.numero}
          className="group flex gap-5 border-t py-6 transition-[gap] duration-200 hover:gap-7 md:gap-7 md:py-7"
          style={{ borderColor }}
        >
          {item.thumb ? (
            <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg md:h-16 md:w-16">
              <Image src={item.thumb.src} alt={item.thumb.alt} fill className="object-cover" sizes="64px" />
            </div>
          ) : null}

          <span
            aria-hidden
            className="stat-number w-[2.5ch] flex-none pt-0.5 text-[1.5rem] md:text-[1.75rem]"
            style={{ color: numberColor }}
          >
            {item.numero}
          </span>

          <div className="flex flex-col gap-1.5">
            <h3
              className="text-[1.125rem] leading-[1.25] md:text-[1.3125rem]"
              style={{ color: titleColor }}
            >
              {item.titulo}
            </h3>
            {item.texto ? (
              <p className="text-[0.9375rem] leading-[1.7] md:text-[1rem]" style={{ color: textColor }}>
                {item.texto}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
