/**
 * Rastreio de conversao. O PRD exige medir o clique pro WhatsApp desde o dia 1.
 *
 * Hoje escreve em `dataLayer` (compativel com GTM/GA4) e no console em dev.
 * Quando a ferramenta de analytics for escolhida, so este arquivo muda.
 */

type EventName = "whatsapp_click" | "ebook_download" | "lead_submit" | "lead_error";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });

  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${event}`, payload);
  }
}
