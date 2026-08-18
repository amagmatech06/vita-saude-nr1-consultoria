import { site } from "@/config/site";

/**
 * Monta o link do WhatsApp com mensagem pre-preenchida.
 * `source` identifica de onde veio o clique — usado tambem pelo analytics.
 */
export function whatsappUrl(message?: string) {
  const text = message ?? "Olá, Gabi! Vim pelo site e quero falar sobre a NR-1 na minha empresa.";
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
