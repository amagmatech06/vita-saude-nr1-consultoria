import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";

import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { site } from "@/config/site";
import { ogImage } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Serifada de display para as headlines — fiel a identidade do ebook,
 * que usa serifada de alto contraste em todos os titulos de secao.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  // Sem `weight`: o next/font serve a fonte VARIAVEL, cobrindo 400-900 em um
  // unico arquivo por estilo. Listar pesos gera um woff2 para cada combinacao.
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.ebook.title} — e-book gratuito | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  publisher: site.name,
  keywords: [
    "NR-1",
    "riscos psicossociais",
    "saúde mental corporativa",
    "PGR",
    "GRO",
    "segurança e saúde no trabalho",
    "saúde ocupacional",
  ],
  // Sem `url` aqui de proposito: cada rota declara o seu via `openGraphDe`.
  // Um `url` no layout viraria o og:url de TODAS as paginas, colapsando o site
  // num unico objeto no grafo do Facebook/LinkedIn.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.ebook.title} — ${site.ebook.subtitle}`,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.ebook.title} — e-book gratuito`,
    description: site.description,
    images: ["/api/og"],
  },
  // Sem `robots` e sem `alternates` no layout: os dois vazam para TODA rota
  // filha. O canonical "/" fazia `/obrigado` e o proprio 404 se declararem
  // duplicatas da home, e o `index, follow` conflitava com o `noindex` que o
  // Next injeta na pagina de 404. Cada rota declara o seu.
};

export const viewport: Viewport = {
  themeColor: "#070A26",
  width: "device-width",
  initialScale: 1,
};

/**
 * IDs canonicos das entidades. Antes, Organization e Person eram declaradas
 * inline duas vezes (aqui e dentro do Book, em page.tsx), gerando quatro nos
 * orfaos — o autor do e-book perdia todas as credenciais. Com `@id`, cada
 * entidade existe uma vez e as outras apenas referenciam.
 */
export const SCHEMA_IDS = {
  organizacao: `${site.url}/#organizacao`,
  fundadora: `${site.url}/#gabriela-moreira`,
  website: `${site.url}/#website`,
} as const;

const organizationNode = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": SCHEMA_IDS.organizacao,
  name: site.name,
  url: site.url,
  description: site.description,
  taxID: site.legal.cnpj,
  ...(site.legal.razaoSocial ? { legalName: site.legal.razaoSocial } : {}),
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logos/gb-light.png`,
    width: 98,
    height: 128,
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  knowsAbout: [
    "NR-1",
    "riscos psicossociais",
    "PGR",
    "GRO",
    "saúde ocupacional",
    "saúde mental corporativa",
  ],
  founder: { "@id": SCHEMA_IDS.fundadora },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: `+${site.whatsapp.number}`,
    availableLanguage: ["Portuguese"],
  },
  sameAs: [site.social.instagram, site.social.youtube, site.social.linkedin].filter(Boolean),
};

const founderNode = {
  "@type": "Person",
  "@id": SCHEMA_IDS.fundadora,
  name: site.founder.name,
  url: `${site.url}/#autora`,
  image: `${site.url}/gabi/gabriela-moreira.jpg`,
  jobTitle: site.founder.role,
  description: site.founder.credentials,
  worksFor: { "@id": SCHEMA_IDS.organizacao },
  knowsAbout: ["NR-1", "riscos psicossociais", "PGR", "GRO", "saúde ocupacional"],
  sameAs: [site.social.instagram, site.social.youtube, site.social.linkedin].filter(Boolean),
};

const websiteNode = {
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,
  url: site.url,
  name: site.name,
  inLanguage: "pt-BR",
  publisher: { "@id": SCHEMA_IDS.organizacao },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, founderNode, websiteNode],
};

/**
 * `<` escapado para que um texto de config nunca consiga fechar o <script>.
 * Hoje o input e 100% estatico; a guarda vale se algum campo virar CMS.
 */
export function jsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\u003c");
}

/**
 * Sem container configurado, `track()` empurra eventos para um `window.dataLayer`
 * que ninguem drena — os 4 eventos de conversao do PRD viravam no-op. Basta
 * definir NEXT_PUBLIC_GTM_ID na Vercel (precisa de rebuild: e NEXT_PUBLIC_*).
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const NOSCRIPT_CSS =
  '[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/*
          O BlurFade serve todas as secoes abaixo da dobra com `opacity: 0` e so
          as revela apos a hidratacao. Sem JS a landing ficava praticamente em
          branco. Este override devolve o conteudo a quem nao executa script.
        */}
        <noscript>
          <style>{NOSCRIPT_CSS}</style>
        </noscript>
      </head>
      <body className="antialiased">
        {GTM_ID ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold"
        >
          Pular para o conteúdo
        </a>
        <Providers>
          <Navbar />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsappFab />
        </Providers>
      </body>
    </html>
  );
}
