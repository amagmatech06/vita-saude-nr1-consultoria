"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Separa prefixo (ex.: "−", "+", "R$"), numero e sufixo (ex.: "%", "x"). */
const PARTES = /^(\D*?)(\d+(?:[.,]\d+)?)(\D*)$/;

type CountUpProps = {
  /** Valor final ja formatado, como vem do config (ex.: "−40%", "+28%"). */
  value: string;
  /** Duracao da contagem em segundos. */
  duration?: number;
  /** Atraso antes de comecar, em segundos — util para escalonar os cards. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Contagem crescente disparada quando o numero entra na viewport.
 *
 * A arvore renderizada e a mesma no servidor e no cliente: o valor final e
 * exibido no primeiro render (e tambem sem JS) e so depois da hidratacao o
 * efeito zera o contador e anima. Quem tem `prefers-reduced-motion` nunca ve
 * a contagem — o numero permanece estatico.
 */
export function CountUp({ value, duration = 1.6, delay = 0, className, style }: CountUpProps) {
  const partes = PARTES.exec(value.trim());
  const bruto = partes?.[2] ?? "";
  const alvo = bruto ? Number(bruto.replace(",", ".")) : Number.NaN;
  const prefixo = partes?.[1] ?? "";
  const sufixo = partes?.[3] ?? "";
  const casas = bruto.split(/[.,]/)[1]?.length ?? 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  /** `null` = ainda no valor final do SSR, antes de a animacao assumir. */
  const [atual, setAtual] = useState<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(alvo)) return;

    if (reducedMotion) {
      setAtual(alvo);
      return;
    }

    if (!inView) {
      setAtual(0);
      return;
    }

    const controls = animate(0, alvo, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAtual(v),
    });

    return () => controls.stop();
  }, [alvo, delay, duration, inView, reducedMotion]);

  // Valor sem numero reconhecivel (ex.: "N/A") — renderiza como texto puro.
  if (!Number.isFinite(alvo)) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  const exibido = atual === null ? alvo : atual;

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      style={{ fontVariantNumeric: "lining-nums tabular-nums", ...style }}
      /*
       * `role="img"` e obrigatorio aqui: nome vindo do autor e PROIBIDO em
       * role=generic, entao um <span aria-label> puro tem o label descartado
       * por Chrome/Firefox. Como o conteudo interno e aria-hidden (ele muda
       * durante a contagem), o numero era anunciado como nada.
       */
      role="img"
      aria-label={value}
    >
      <span aria-hidden>
        {prefixo}
        {exibido.toFixed(casas)}
        {sufixo}
      </span>
    </span>
  );
}
