import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/**
 * Datas fixas, e nao `new Date()`. Com o timestamp do build, todo deploy
 * anunciava que 100% do site mudou; o Google detecta a inconsistencia e passa
 * a ignorar o `lastmod` do dominio inteiro. Atualize a mao ao mudar a pagina.
 */
const ATUALIZADO_EM = {
  home: new Date("2026-08-20"),
  privacidade: new Date("2026-08-20"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: ATUALIZADO_EM.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privacidade`,
      lastModified: ATUALIZADO_EM.privacidade,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
