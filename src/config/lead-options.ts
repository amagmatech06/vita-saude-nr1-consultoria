/**
 * Pergunta qualificatoria do formulario: porte da empresa.
 *
 * A mesma lista serve ao <select> do LeadForm e ao `z.enum` da API — se as duas
 * divergirem, o visitante escolhe uma opcao que o servidor recusa com 422.
 * O valor gravado e o proprio rotulo: e o que o comercial le no alerta e no banco.
 */
export const COLABORADORES_OPCOES = [
  "1",
  "2 a 8",
  "9 a 19",
  "20 a 30",
  "30 a 50",
  "Acima de 50",
] as const;

export type Colaboradores = (typeof COLABORADORES_OPCOES)[number];
