"use client";

import { WhatsappIcon } from "@/components/icons";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Botao flutuante global. O clique e rastreado desde o dia 1 — a taxa de
 * clique pro WhatsApp e a metrica de sucesso principal do projeto.
 */
export function WhatsappFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Gabi no WhatsApp"
      onClick={() => track("whatsapp_click", { source: "fab" })}
      className="fab-pulse fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105 md:bottom-8 md:right-8"
      style={{ background: "#25D366", color: "#25D366" }}
    >
      <WhatsappIcon className="relative h-7 w-7" style={{ color: "#FFFFFF" }} />
    </a>
  );
}
