"use client";

import type { ReactNode } from "react";

import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type WhatsappLinkProps = {
  children: ReactNode;
  /** De onde partiu o clique — vai junto no evento de analytics. */
  source: string;
  message?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function WhatsappLink({ children, source, message, className, style }: WhatsappLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { source })}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
