"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` faz o Framer Motion respeitar
 * prefers-reduced-motion sem alterar a arvore React — o movimento
 * (translate/scale) e suprimido e so a opacidade permanece.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
