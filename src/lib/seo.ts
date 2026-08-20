import type { Metadata } from "next";

import { site } from "@/config/site";

/**
 * Imagem social compartilhada por todas as rotas.
 *
 * `/api/og` precisa continuar liberado no robots.txt — os scrapers do
 * LinkedIn/Twitter/Facebook respeitam o arquivo e descartam a imagem se ela
 * estiver bloqueada.
 */
export const ogImage = {
  url: "/api/og",
  width: 1200,
  height: 630,
  alt: site.ebook.title,
} as const;

/**
 * Monta o bloco `openGraph` de uma rota.
 *
 * O Next faz merge RASO de metadata: declarar `openGraph` numa page substitui
 * inteiro o do layout. Por isso cada rota monta o objeto completo por aqui, em
 * vez de herdar pela metade — era o que fazia `/privacidade` e `/obrigado`
 * servirem o `og:url` e o `og:title` da home.
 */
export function openGraphDe({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    url: path,
    title,
    description,
    images: [ogImage],
  };
}
