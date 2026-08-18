import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { site } from "@/config/site";
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.ebook.title} — ${site.ebook.subtitle}`,
    description: site.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: site.ebook.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.ebook.title} — e-book gratuito`,
    description: site.description,
    images: ["/api/og"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#252534",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.role,
    description: site.founder.credentials,
    sameAs: [site.social.instagram, site.social.youtube].filter(Boolean),
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: `+${site.whatsapp.number}`,
    availableLanguage: ["Portuguese"],
  },
  sameAs: [site.social.instagram, site.social.youtube, site.social.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
