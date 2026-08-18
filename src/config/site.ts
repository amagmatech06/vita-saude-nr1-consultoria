/**
 * Dados da marca. Tudo que for institucional muda AQUI e reflete no site todo.
 * Itens marcados com [PLACEHOLDER] precisam ser preenchidos pela cliente.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitasaude.com.br";

export const site = {
  /** Nome curto, usado na navbar e no titulo das paginas */
  name: "Vita Saúde",
  /** Assinatura da fundadora — a autoridade por tras da marca */
  founder: {
    name: "Gabriela Moreira",
    shortName: "Gabi Moreira",
    role: "Enfermeira · Mestre em Saúde · Especialista em NR-1",
    credentials:
      "Enfermeira, mestre em processos interdisciplinares em saúde, especialista em NR-1 e consultora empresarial.",
  },
  tagline: "Saúde corporativa e gestão de riscos psicossociais.",
  description:
    "Consultoria em saúde corporativa e adequação à NR-1: gestão de riscos psicossociais, capacitação de lideranças e programas de saúde mental para empresas.",

  url: SITE_URL,
  locale: "pt-BR",

  /** [PLACEHOLDER] confirmar e-mail oficial */
  email: "[PLACEHOLDER: e-mail de contato]",
  /** [PLACEHOLDER] confirmar CNPJ */
  cnpj: "[PLACEHOLDER: CNPJ]",
  /** [PLACEHOLDER] confirmar cidade — DDD 13 sugere Baixada Santista/SP */
  city: "[PLACEHOLDER: Cidade, UF]",

  whatsapp: {
    /** Somente digitos, com DDI. Confirmado via Linktree da Gabi. */
    number: "5513988145434",
    display: "(13) 98814-5434",
  },

  social: {
    /** [PLACEHOLDER] confirmar qual perfil e o oficial */
    instagram: "https://www.instagram.com/gabimpl/",
    instagramHandle: "@gabimpl",
    youtube: "https://www.youtube.com/@gabimoreira.nr1",
    /** [PLACEHOLDER] URL do LinkedIn */
    linkedin: "",
  },

  ebook: {
    title: "NR-1 na Prática",
    subtitle: "O Guia Completo para Gestão de Riscos Psicossociais nas Empresas",
    edition: "Guia Executivo · Edição 2026",
    pages: 28,
    chapters: 8,
    file: "/ebook/nr1-na-pratica.pdf",
    cover: "/ebook/capa.jpg",
    /** Nome do arquivo que o visitante recebe ao baixar */
    downloadAs: "NR-1-na-Pratica-Gabriela-Moreira.pdf",
  },
} as const;

export type Site = typeof site;
