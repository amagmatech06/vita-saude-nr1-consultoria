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

  /**
   * Identificacao juridica da controladora. Exigida pela LGPD (o controlador
   * precisa ser identificavel) e usada no `taxID` do JSON-LD de Organization.
   */
  legal: {
    cnpj: "41.720.857/0001-63",
    /** [PENDENTE] Razao social exata do cartao CNPJ. */
    razaoSocial: "",
    /** [PENDENTE] Cidade/UF da sede — o DDI/DDD sugere Baixada Santista/SP. */
    endereco: "",
  },

  /**
   * [PENDENTE] So existira depois do registro do dominio no registro.br.
   * Consumido em `api/lead` (replyTo) e no rodape, ambos com guarda: enquanto
   * comecar com "[", nada e renderizado nem enviado.
   */
  email: "[EMAIL_ADDRESS]",

  whatsapp: {
    /** Somente digitos, com DDI. Confirmado via Linktree da Gabi. */
    number: "5513988145434",
    display: "(13) 98814-5434",
  },

  social: {
    instagram: "https://www.instagram.com/gabimpl/",
    instagramHandle: "@gabimpl",
    youtube: "https://www.youtube.com/@gabimoreira.nr1",
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
