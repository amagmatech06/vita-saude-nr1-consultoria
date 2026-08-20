import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Bloquear "/api/" inteiro derrubava tambem "/api/og", que e a imagem
          // dos cards sociais — os scrapers respeitam robots.txt e descartavam
          // a imagem. So a rota de escrita fica fora.
          "/api/lead",
          // O PDF nao pode ranquear sozinho: se ele aparece na busca, o
          // visitante baixa direto e nunca passa pelo formulario.
          "/ebook/",
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
