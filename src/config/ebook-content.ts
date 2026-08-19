/**
 * COPY DA LANDING DE CAPTURA.
 *
 * REGRA: todo texto aqui foi extraido do ebook "NR-1 na Pratica" (28 paginas,
 * ed. 2026) da Gabriela Moreira. Nada foi inventado. O campo `fonte` de cada
 * bloco aponta a pagina de origem, para conferencia.
 *
 * Para editar a landing, mexa NESTE arquivo — nao nos componentes.
 */

export const hero = {
  eyebrow: "E-book gratuito · Edição 2026",
  // Titulo e subtitulo verbatim da capa do ebook
  title: "NR-1 na prática",
  titleAccent: "na prática",
  subtitle: "O Guia Completo para Gestão de Riscos Psicossociais nas Empresas",
  // Copy direcionado para PMEs (5-100 funcionarios)
  description:
    "Para empresas de 5 a 100 funcionários que precisam se adequar à NR-1 sem burocracia — e transformar uma obrigação legal em uma vantagem competitiva real.",
  formTitle: "Receba o guia no seu e-mail",
  formSubtitle: "Enviamos o PDF na hora. Sem custo.",
  badges: ["28 páginas", "8 capítulos", "PDF gratuito"],
  fonte: "capa + p.3",
} as const;

/** Cap. 03 — "De acidentes fisicos a riscos psicossociais" (p.8) */
export const problema = {
  eyebrow: "A evolução do conceito",
  title: "De acidentes físicos a riscos psicossociais.",
  description:
    "O mercado de trabalho passou por profundas transformações. Avanço tecnológico, alta competitividade, pressão por resultados e mudanças nas relações de trabalho trouxeram novos desafios — ampliando o conceito de saúde ocupacional.",
  colunas: [
    {
      eyebrow: "Foco tradicional",
      title: "Riscos físicos",
      items: [
        "Quedas",
        "Choques elétricos",
        "Exposição a produtos químicos",
        "Ruídos excessivos",
        "Acidentes com máquinas",
      ],
    },
    {
      eyebrow: "Nova realidade",
      title: "Riscos psicossociais",
      items: [
        "Estresse ocupacional",
        "Ansiedade",
        "Síndrome de Burnout",
        "Depressão",
        "Assédio moral",
        "Conflitos interpessoais",
      ],
    },
  ],
  fecho: "Tornou-se necessário ampliar o conceito de saúde ocupacional.",
  fonte: "p.8",
} as const;

/**
 * Cap. 03 — "Da obrigacao legal a vantagem estrategica" (p.10).
 * ATENCAO: sao indicadores citados NO MATERIAL sobre gestao eficiente da NR-1.
 * NAO sao resultados de clientes da Gabi. O componente exibe a nota de origem.
 */
export const indicadores = {
  eyebrow: "Importância para as empresas",
  title: "Da obrigação legal à vantagem estratégica.",
  description:
    "Muitas organizações ainda enxergam a NR-1 apenas como uma obrigação legal. Empresas que adotam uma visão estratégica percebem rapidamente seus benefícios.",
  destaque:
    "Empresas que cuidam da saúde física e emocional apresentam melhores resultados financeiros e maior retenção de talentos.",
  numeros: [
    { valor: "−40%", label: "Afastamentos" },
    { valor: "+28%", label: "Produtividade" },
    { valor: "−35%", label: "Turnover" },
  ],
  notaFonte: "Indicadores apresentados no e-book NR-1 na Prática (ed. 2026).",
  fonte: "p.10",
} as const;

/** Sumario do ebook — os 8 capitulos */
export const capitulos = {
  eyebrow: "O que você vai encontrar",
  title: "Oito capítulos, do conceito à execução.",
  description:
    "Conceitos, ferramentas, indicadores e um passo a passo completo — pensado para transformar uma exigência legal em vantagem estratégica real para o seu negócio.",
  items: [
    {
      numero: "01",
      titulo: "Apresentação",
      resumo: "Por que a NR-1 mudou a forma de cuidar das pessoas.",
    },
    {
      numero: "02",
      titulo: "Quem sou eu",
      resumo: "Trajetória, método e áreas de atuação.",
    },
    {
      numero: "03",
      titulo: "NR-1 e suas principais atualizações",
      resumo: "A norma-mãe da Segurança e Saúde no Trabalho, GRO e PGR.",
    },
    {
      numero: "04",
      titulo: "Gestão de Riscos Psicossociais",
      resumo: "Os 5 pilares, ferramentas de diagnóstico e sinais de adoecimento.",
    },
    {
      numero: "05",
      titulo: "O papel da liderança",
      resumo: "Quando o gestor protege — e quando ele adoece a equipe.",
    },
    {
      numero: "06",
      titulo: "10 benefícios da implementação",
      resumo: "Produtividade, retenção, imagem, engajamento e ROI.",
    },
    {
      numero: "07",
      titulo: "Passo a passo da adequação",
      resumo: "Do diagnóstico organizacional à cultura de prevenção.",
    },
    {
      numero: "08",
      titulo: "Conclusão",
      resumo: "Pessoas no centro das decisões.",
    },
  ],
  fonte: "sumário, p.2",
} as const;

/** Cap. 04 — "Uma gestao eficiente em cinco movimentos" (p.13) */
export const pilares = {
  eyebrow: "Os 5 pilares",
  title: "Uma gestão eficiente em cinco movimentos.",
  items: [
    {
      numero: "1",
      titulo: "Identificação dos riscos",
      texto:
        "Compreender quais fatores podem estar afetando a saúde emocional. Sem diagnóstico não existe prevenção.",
    },
    {
      numero: "2",
      titulo: "Avaliação dos impactos",
      texto:
        "Avaliar gravidade e frequência. Definir prioridades e direcionar recursos para os problemas mais relevantes.",
    },
    {
      numero: "3",
      titulo: "Planejamento das ações",
      texto:
        "Treinamentos, revisão de processos, programas de saúde mental, canais de acolhimento e reconhecimento.",
    },
    {
      numero: "4",
      titulo: "Implementação preventiva",
      texto:
        "Lideranças comprometidas. A gestão dos riscos não é responsabilidade exclusiva do RH ou da SST.",
    },
    {
      numero: "5",
      titulo: "Monitoramento contínuo",
      texto:
        "Acompanhar resultados. Mudanças organizacionais podem gerar novos riscos que precisarão ser avaliados.",
    },
  ],
  fonte: "p.13",
} as const;

/** Cap. 06 — os 10 beneficios (p.20-21) */
export const beneficios = {
  eyebrow: "Capítulo 06",
  title: "Os retornos da prevenção.",
  description:
    "Adequar-se à NR-1 não é exclusividade de grandes empresas. Negócios de 5 a 100 funcionários que agem agora constroem vantagem competitiva — e evitam multas, processos e afastamentos que podem paralisar a operação.",
  items: [
    {
      numero: "01",
      titulo: "Redução dos afastamentos",
      texto:
        "Quando os riscos são controlados, ocorrem menos casos de estresse ocupacional, ansiedade, burnout e doenças relacionadas ao trabalho.",
    },
    {
      numero: "02",
      titulo: "Aumento da produtividade",
      texto:
        "Quando as pessoas se sentem seguras, respeitadas e valorizadas, surge naturalmente maior concentração, qualidade nas entregas e menos erros.",
    },
    {
      numero: "03",
      titulo: "Melhoria do clima",
      texto:
        "Empresas que investem em prevenção observam relacionamentos mais saudáveis, comunicação eficiente e maior satisfação.",
    },
    {
      numero: "04",
      titulo: "Redução do turnover",
      texto:
        "Além dos custos de recrutamento, a saída frequente impacta produtividade e cultura. Ambientes saudáveis retêm talentos.",
    },
    {
      numero: "05",
      titulo: "Fortalecimento das lideranças",
      texto:
        "Líderes capacitados identificam sinais de adoecimento, gerenciam conflitos e estimulam o desenvolvimento das equipes.",
    },
    {
      numero: "06",
      titulo: "Maior segurança jurídica",
      texto:
        "Documentação adequada e ações preventivas reduzem significativamente a exposição a passivos trabalhistas.",
    },
    {
      numero: "07",
      titulo: "Fortalecimento da imagem",
      texto:
        "Empresas que investem em saúde e bem-estar são percebidas como mais responsáveis, humanas e atrativas para talentos e clientes.",
    },
    {
      numero: "08",
      titulo: "Engajamento e pertencimento",
      texto:
        "Quando colaboradores percebem cuidado genuíno, o vínculo se fortalece: mais participação, comprometimento e desempenho coletivo.",
    },
    {
      numero: "09",
      titulo: "Prevenção de crises",
      texto:
        "Identificar situações de risco antes que se transformem em conflitos generalizados e afastamentos em massa.",
    },
    {
      numero: "10",
      titulo: "Crescimento sustentável",
      texto:
        "Bases sólidas para o desenvolvimento organizacional. Negócios sustentáveis são construídos por pessoas saudáveis.",
    },
  ],
  fonte: "p.20-21",
} as const;

/** Cap. 02 — "Quem sou eu" (p.4-5) + falas autênticas do podcast */
export const sobre = {
  eyebrow: "Quem escreveu",
  title: "Gabriela Moreira",
  role: "Consultora · Especialista NR-1",
  paragrafos: [
    "Enfermeira, mestre em processos interdisciplinares em saúde e especialista em NR-1. Meu trabalho é estar dentro das empresas — ao lado dos gestores e das equipes — identificando riscos reais e construindo ambientes onde as pessoas possam, de fato, ser saudáveis e produtivas.",
    "Acredito que a gente perde muito tempo falando de doenças, quando poderia estar construindo saúde. Por isso, transformo a NR-1 — que muitos enxergam só como obrigação legal — em uma estratégia que gera resultado para o negócio e qualidade de vida para as pessoas.",
    "Minha trajetória foi construída unindo conhecimento técnico, visão estratégica e uma profunda compreensão do comportamento humano. Porque, no fim, toda empresa é feita de gente.",
  ],
  areasEyebrow: "Áreas de atuação",
  areas: [
    "Implementação e adequação à Nova NR-1",
    "Gestão de riscos psicossociais",
    "Programas de saúde mental corporativa",
    "Desenvolvimento de lideranças",
    "Treinamentos corporativos",
    "Palestras e workshops",
    "Cultura organizacional",
    "Clima organizacional",
    "Gestão estratégica de pessoas",
    "Consultoria empresarial",
  ],
  fonte: "p.4-5 + Pod com a Gabi EP02",
} as const;

/** Quote principal da landing — fala diretamente com o gestor/decisor */
export const quote = {
  texto:
    "Cuidar das pessoas não é custo. É estratégia, produtividade e crescimento sustentável.",
  accent: "estratégia",
  autor: "Gabriela Moreira",
  fonte: "p.3",
} as const;

/**
 * FAQ. As PERGUNTAS sao rotulos estruturais; as RESPOSTAS sao
 * verbatim do ebook, com a pagina indicada.
 */
export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "Antes de baixar.",
  items: [
    {
      pergunta: "O que é a NR-1?",
      resposta:
        "A Norma Regulamentadora nº 1 estabelece as disposições gerais e os princípios fundamentais que orientam todas as demais Normas Regulamentadoras existentes no Brasil. Pode ser considerada a norma-mãe da segurança do trabalho.",
      fonte: "p.7",
    },
    {
      pergunta: "O que são riscos psicossociais?",
      resposta:
        "Fatores como sobrecarga, pressão por metas, assédio moral, falta de reconhecimento e conflitos — que podem desencadear estresse ocupacional, ansiedade, burnout e depressão.",
      fonte: "p.8 e p.14",
    },
    {
      pergunta: "Isso vale para empresas de qualquer porte?",
      resposta:
        "Com as novas exigências, empresas de todos os portes precisam desenvolver estratégias preventivas, identificar riscos psicossociais e promover ambientes mais saudáveis e produtivos.",
      fonte: "p.3",
    },
    {
      pergunta: "A responsabilidade é só do RH?",
      resposta:
        "Não. A gestão dos riscos não é responsabilidade exclusiva do RH ou da SST — depende de lideranças comprometidas.",
      fonte: "p.13",
    },
    {
      pergunta: "Minha empresa é pequena, a NR-1 se aplica a mim?",
      resposta:
        "Sim. A NR-1 se aplica a empresas de todos os portes, inclusive pequenas e médias. Na prática, empresas de 5 a 100 funcionários são as que mais sofrem com autuações — justamente por não terem RH estruturado ou assessoria jurídica. Este guia foi criado exatamente para esse perfil.",
      fonte: "estrutural",
    },
    {
      pergunta: "Quais são as multas por descumprimento?",
      resposta:
        "Empresas que não cumprirem as exigências da NR-1 estão sujeitas a multas administrativas, autuações do Ministério do Trabalho e passivos trabalhistas. A conformidade com o GRO e o PGR é obrigatória e pode ser exigida a qualquer momento em uma fiscalização.",
      fonte: "estrutural",
    },
    {
      pergunta: "O e-book é gratuito mesmo?",
      resposta:
        "Sim. São 28 páginas, 8 capítulos, em PDF. Você recebe o arquivo por e-mail e também pode baixar na hora, logo após preencher o formulário.",
      fonte: "estrutural",
    },
  ],
} as const;

/** Cap. 08 — fechamento (p.27-28) + fala do podcast */
export const ctaFinal = {
  eyebrow: "Vamos conversar?",
  title:
    "Atendo empresas de pequeno e médio porte que querem se regularizar sem burocracia.",
  quote:
    "Você está vivendo ou sobrevivendo? Enquanto a gente continuar querendo dar conta de tudo, a gente vai adoecer cada vez mais. Posso te ajudar a mudar isso.",
  autor: "Gabriela Moreira",
  botao: "Falar no WhatsApp",
  fonte: "Pod com a Gabi EP06 + p.27-28",
} as const;

/** Pagina /obrigado */
export const obrigado = {
  eyebrow: "Tudo certo",
  title: "Seu guia está a caminho.",
  description:
    "Enviamos o PDF para o seu e-mail. Se preferir, baixe agora mesmo pelo botão abaixo.",
  botaoDownload: "Baixar o PDF agora",
  spamAviso: "Não chegou em alguns minutos? Confira a caixa de spam ou promoções.",
  // Verbatim, cap. 08 (p.27)
  fecho:
    "O maior patrimônio de qualquer organização não está em equipamentos, processos ou estruturas. Está nas pessoas.",
  fonte: "p.27",
} as const;
