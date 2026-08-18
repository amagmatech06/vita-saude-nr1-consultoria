import Image from "next/image";
import { BlurFade } from "@/components/BlurFade";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { quote } from "@/config/ebook-content";

/** Divide a citacao em torno da palavra-chave que recebe o amarelo gema. */
function split(texto: string, accent: string) {
  const at = texto.indexOf(accent);
  if (at === -1) return { before: texto, match: "", after: "" };
  return {
    before: texto.slice(0, at),
    match: texto.slice(at, at + accent.length),
    after: texto.slice(at + accent.length),
  };
}

export function QuoteSection() {
  const parts = split(quote.texto, quote.accent);

  return (
    <SectionContainer bg="petroleo" grid width="narrow">
      <BlurFade>
        <figure className="flex flex-col gap-8">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="currentColor"
            style={{ color: "#FEC717" }}
          >
            <path d="M9.5 5.5C6.3 6.9 4 10 4 13.6c0 2.9 1.8 4.9 4.3 4.9 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .1.4-1.8 2-3.4 4-4.2l-2.2-1.4Zm9.6 0c-3.2 1.4-5.5 4.5-5.5 8.1 0 2.9 1.8 4.9 4.3 4.9 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .1.4-1.8 2-3.4 4-4.2l-2.2-1.4Z" />
          </svg>

          <blockquote
            className="font-serif text-[1.75rem] leading-[1.28] tracking-[-0.02em] md:text-[2.5rem]"
            style={{ color: "#F9F9FB" }}
          >
            {parts.before}
            {/* Uso 2 de 2 do amarelo gema nesta pagina */}
            <span style={{ color: "#FEC717" }}>{parts.match}</span>
            {parts.after}
          </blockquote>

          <figcaption className="flex items-center gap-4">
            <Image
              src="/gabi/foto-perfil.png"
              alt={quote.autor}
              width={64}
              height={64}
              className="h-16 w-16 flex-none rounded-full object-cover object-[center_20%] border-2"
              style={{ borderColor: "rgba(249, 249, 251, 0.15)" }}
            />
            <div className="flex flex-col justify-center gap-1">
              <span
                className="text-[0.75rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: "#F9F9FB" }}
              >
                {quote.autor}
              </span>
              <span
                className="text-[0.8125rem]"
                style={{ color: "rgba(249, 249, 251, 0.6)" }}
              >
                Especialista em NR-1
              </span>
            </div>
          </figcaption>
        </figure>
      </BlurFade>
    </SectionContainer>
  );
}
