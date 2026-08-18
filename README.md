# Vita Saúde — landing de captura do e-book NR-1

Página de captura do e-book gratuito **NR-1 na Prática — O Guia Completo para
Gestão de Riscos Psicossociais nas Empresas**, de Gabriela Moreira.

O visitante preenche nome, e-mail e empresa; recebe o PDF por e-mail e também
pode baixar na hora em `/obrigado`.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Linguagem | TypeScript **strict** (zero `any`) |
| UI | React 19 |
| Estilo | Tailwind v4 (config CSS-first via `@theme`) + `@tailwindcss/typography` |
| Conteúdo | Velite (MDX tipado) — configurado, coleções vazias até a Fase 2 |
| Animação | Framer Motion (`BlurFade`) |
| Formulário | react-hook-form (cliente) + zod (servidor) |
| E-mail | Resend |
| Fontes | Inter + Playfair Display, via `next/font/google` |
| Deploy | Vercel |

---

## Rodar localmente

```bash
npm install
cp .env.example .env.local     # preencha as chaves
npm run dev                    # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (roda o Velite antes, via `predev`) |
| `npm run build` | Build de produção (roda `velite --clean` antes, via `prebuild`) |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run content:watch` | Velite em modo watch, para editar MDX na Fase 2 |

### Variáveis de ambiente

| Variável | Obrigatória | Para quê |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | sim (produção) | URL canônica: metadata, sitemap, robots, link do PDF no e-mail |
| `RESEND_API_KEY` | para enviar e-mail | Chave em <https://resend.com/api-keys> |
| `RESEND_FROM` | para enviar e-mail | Ex.: `Vita Saúde <contato@seudominio.com.br>` |
| `LEAD_NOTIFICATION_TO` | não | Recebe uma cópia de cada lead novo |
| `EMAIL_ATTACH_PDF` | não | `false` desliga o anexo e envia só o link (ver nota abaixo) |

> **Sem `RESEND_API_KEY` o site não quebra.** O lead é registrado no log do
> servidor, o visitante segue para `/obrigado` e baixa o PDF direto. Só o
> e-mail deixa de sair.

> **O remetente precisa de domínio verificado no Resend.** Sem isso, use
> `onboarding@resend.dev`, que só entrega no e-mail dono da conta Resend —
> serve para testar, não para produção.

---

## Editar o conteúdo

### Textos da landing

Tudo em [`src/config/ebook-content.ts`](src/config/ebook-content.ts), separado
por seção (`hero`, `problema`, `capitulos`, `beneficios`, `sobre`, `quote`,
`faq`, `ctaFinal`, `obrigado`). **Não edite os componentes para trocar texto.**

Cada bloco traz um campo `fonte` apontando a página do e-book de onde a copy
saiu. Todo o texto é do próprio material da Gabi — nada foi inventado. Ao
alterar, mantenha essa disciplina.

### Dados da marca

[`src/config/site.ts`](src/config/site.ts): nome, tagline, WhatsApp, redes,
e-mail, CNPJ, cidade e os metadados do e-book.

Os itens ainda marcados com `[PLACEHOLDER: ...]` precisam ser preenchidos:
e-mail, CNPJ, cidade/UF, LinkedIn, e a confirmação de qual Instagram é o
oficial.

### Trocar o PDF do e-book

1. Substitua `public/ebook/nr1-na-pratica.pdf`.
2. Se o nome mudar, ajuste `site.ebook.file` em `src/config/site.ts`.
3. Atualize `site.ebook.pages` / `chapters` se a contagem mudar.
4. Gere uma capa nova em `public/ebook/capa.jpg` (~520px de altura basta —
   ela é exibida a 150px).

> O PDF original tinha 16,4 MB e foi recomprimido para 3,24 MB (imagens a
> 150 DPI, JPEG q82), sem perda visível. Se substituir por um arquivo grande,
> recomprima antes — o arquivo é servido de `public/` e entra no orçamento de
> performance.

---

## Fase 2 — site institucional completo

A base já está pronta. O Velite está configurado com três coleções em
[`velite.config.ts`](velite.config.ts), com as pastas criadas e vazias:

```
content/
  produtos/[slug].mdx      1 arquivo = 1 produto
  portfolio/[slug].mdx     1 arquivo = 1 case
  blog/[slug].mdx          1 arquivo = 1 post
```

### Publicar um post

Crie `content/blog/meu-post.mdx`:

```mdx
---
title: Como estruturar o inventário de riscos psicossociais
slug: inventario-riscos-psicossociais
description: Um passo a passo prático para o inventário exigido pela NR-1.
date: 2026-03-14
tags: [NR-1, PGR]
published: true
---

Conteúdo em MDX aqui.
```

Rode `npm run content:watch` (ou `npm run dev`) e os dados tipados aparecem em
`.velite`, importáveis via `#velite`. Produtos e cases seguem o mesmo padrão —
os schemas de cada um estão no `velite.config.ts`.

Ainda faltam, para a Fase 2: as rotas `/sobre`, `/produtos`, `/portfolio`,
`/blog`, `/contato` e o `/rss.xml`.

---

## Customizar a paleta

Um lugar só: o bloco `@theme` em
[`src/app/globals.css`](src/app/globals.css).

```css
@theme {
  --color-petroleo: #252534;   /* escura profunda: texto, navbar, footer */
  --color-indigo:   #4544BD;   /* principal escura: heros, seções de destaque */
  --color-gema:     #FEC717;   /* ACENTO RARO — máx. 2 usos por página */
  --color-neutra:   #F1F1F1;   /* seções alternadas claras */
  --color-lilas:    #E8E8EE;   /* cards de apoio */
  --color-offwhite: #F9F9FB;   /* texto sobre fundo escuro */
}
```

Todas as cores foram extraídas por amostragem de pixel do próprio e-book.

### Regras de cor que o projeto segue

- Fundo dominante branco; seções alternam branco / `neutra` / escuro para criar ritmo.
- **O amarelo gema aparece no máximo 2× por página.** Na home: o botão do
  formulário e a palavra "estratégia" no quote. Nunca em ícones, bordas ou fundos.
- Texto sobre fundo claro: opacidade mínima **0.68**. Sobre escuro: **0.62**
  (**0.80** sobre o índigo). Abaixo disso o contraste cai fora do WCAG AA —
  esses são os pisos verificados, não estimativas.

---

## Design system

[`src/components/ui/layout/`](src/components/ui/layout/):

| Componente | Papel |
|---|---|
| `SectionContainer` | Wrapper de seção. Variantes de fundo `white \| neutra \| indigo \| petroleo`, grid opcional, larguras `narrow \| default \| wide` |
| `SectionEyebrow` | Sobretítulo 11px, tracking 2px, underline sólido de 16px |
| `SectionHeading` | Eyebrow + título + descrição, com ênfase em uma palavra-chave |
| `PageHero` | Hero de página. Variantes `full \| compact \| minimal` |
| `NumberedList` | Lista 01/02/… com miniatura opcional |
| `CTALink` | Botão/link. Variantes `primary \| secondary \| ghost-light` |

As cores de fundo do `SectionContainer` são aplicadas por `style` inline, e não
por `className` — assim o `tailwind-merge` não descarta a classe de fundo
quando o consumidor passa a sua própria.

### Utilities em `globals.css`

`.bg-grid-perci` · `.bg-grid-perci-fade` · `.bg-grid-perci-ink` · `.eyebrow` ·
`.accent-italic` · `.section-padding` · `.stat-number` · `.fab-pulse`

### Ícones

Desenhados à mão em [`src/components/icons.tsx`](src/components/icons.tsx),
sem dependência externa. Trocar por `lucide-react` é uma substituição direta,
caso a dependência seja aprovada.

---

## Decisões que valem conhecer antes de mexer

- **O hero não usa `BlurFade`.** O `BlurFade` parte de `opacity: 0` e só revela
  o conteúdo depois da hidratação — acima da dobra isso deixava a primeira tela
  em branco (86% do LCP mobile era render delay). Animação de entrada só abaixo
  da dobra.
- **`prefers-reduced-motion` é respeitado pelo `<MotionConfig reducedMotion="user">`**
  em [`Providers.tsx`](src/components/Providers.tsx), e não por um `if` dentro
  do `BlurFade`. Ramificar a árvore React com `useReducedMotion()` causa
  mismatch de hidratação, porque o hook devolve `null` no servidor.
- **Nada de `filter: blur()` grande.** Os halos dos heros são `radial-gradient`
  puro. Um `blur-[130px]` sobre um gradiente é redundante e custava ~1s de
  Style & Layout no mobile.
- **O honeypot do formulário aceita qualquer valor no schema** e é barrado
  depois, com resposta 200. Validar no zod devolveria 422 e entregaria ao bot
  a dica de qual campo o denunciou.

---

## Métricas

O clique para o WhatsApp é rastreado desde o dia 1, junto com download e envio
de lead. Os eventos saem em `window.dataLayer` (compatível com GTM/GA4) via
[`src/lib/analytics.ts`](src/lib/analytics.ts) — quando a ferramenta de
analytics for escolhida, só esse arquivo muda.

Eventos: `whatsapp_click` (com `source`), `ebook_download`, `lead_submit`,
`lead_error`.

---

## Conformidade

- `/privacidade` cobre o único tratamento de dados do site (o formulário).
  **O texto é uma base e precisa de revisão jurídica antes do lançamento**;
  a data de publicação está como `[PLACEHOLDER]`.
- `/obrigado` é `noindex`, e `robots.ts` bloqueia `/obrigado` e `/api/`.
