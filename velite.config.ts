import { defineConfig, defineCollection, s } from "velite";

/**
 * Colecoes de conteudo. Na Fase 1 (landing do ebook) elas nascem vazias —
 * a estrutura ja fica pronta pro site institucional completo da Fase 2.
 * 1 arquivo .mdx = 1 produto / case / post.
 */

const produtos = defineCollection({
  name: "Produto",
  pattern: "produtos/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("produtos"),
      description: s.string().max(300),
      cover: s.image().optional(),
      order: s.number().default(0),
      ctaLabel: s.string().default("Falar no WhatsApp"),
      ctaHref: s.string().optional(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/produtos/${data.slug}` })),
});

const portfolio = defineCollection({
  name: "Case",
  pattern: "portfolio/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      slug: s.slug("portfolio"),
      client: s.string(),
      sector: s.string(),
      description: s.string().max(300),
      cover: s.image().optional(),
      results: s.array(s.object({ label: s.string(), value: s.string() })).default([]),
      date: s.isodate(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/portfolio/${data.slug}` })),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(140),
      slug: s.slug("blog"),
      description: s.string().max(300),
      date: s.isodate(),
      cover: s.image().optional(),
      tags: s.array(s.string()).default([]),
      published: s.boolean().default(true),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { produtos, portfolio, posts },
});
