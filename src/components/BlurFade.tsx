"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BlurFadeProps = {
  children: ReactNode;
  /** Indice do item — multiplica o atraso para criar o stagger. */
  index?: number;
  delay?: number;
  className?: string;
};

/**
 * Entrada de secao: sobe 20px + desfoque que se dissolve.
 *
 * A arvore renderizada e SEMPRE a mesma no servidor e no cliente — nao ha
 * ramificacao por `useReducedMotion()` aqui, porque o hook devolve `null` no
 * servidor e causaria mismatch de hidratacao. Quem respeita a preferencia do
 * usuario e o `<MotionConfig reducedMotion="user">` em Providers.tsx, dentro
 * do proprio Framer Motion.
 */
export function BlurFade({ children, index = 0, delay = 0, className }: BlurFadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: delay + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
