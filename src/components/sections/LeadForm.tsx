"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { DownloadIcon } from "@/components/icons";
import { hero } from "@/config/ebook-content";
import { track } from "@/lib/analytics";

type FormValues = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  consent: boolean;
  /** Honeypot — invisivel para pessoas, preenchido por bots. */
  website: string;
};

const INK = "#070A26";
const MUTED = "rgba(7, 10, 38, 0.68)";
const BORDER = "rgba(7, 10, 38, 0.16)";
const DANGER = "#B42318";

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[0.8125rem] font-semibold"
        style={{ color: INK }}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[0.8125rem]" style={{ color: DANGER }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm() {
  const router = useRouter();
  const id = useId();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { nome: "", email: "", telefone: "", empresa: "", consent: false, website: "" },
  });

  const inputClass =
    "min-h-[52px] w-full rounded-xl border bg-white px-4 text-[1rem] outline-none transition-colors placeholder:text-[rgba(7, 10, 38,0.38)] focus:border-[#4544BD]";

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data: { message?: string } = await response.json().catch(() => ({}));
        track("lead_error", { status: response.status });
        setServerError(data.message ?? "Não conseguimos enviar agora. Tente novamente.");
        return;
      }

      track("lead_submit", { empresa: values.empresa });
      router.push("/obrigado");
    } catch {
      track("lead_error", { status: 0 });
      setServerError("Sem conexão com o servidor. Tente novamente.");
    }
  }

  return (
    <div
      id="baixar"
      className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] md:p-8"
    >
      <p className="font-serif text-[1.375rem] font-bold leading-tight" style={{ color: INK }}>
        {hero.formTitle}
      </p>
      <p className="mt-1.5 text-[0.9375rem]" style={{ color: MUTED }}>
        {hero.formSubtitle}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4" noValidate>
        <Field label="Nome" htmlFor={`${id}-nome`} error={errors.nome?.message}>
          <input
            id={`${id}-nome`}
            type="text"
            autoComplete="name"
            placeholder="Como podemos te chamar"
            className={inputClass}
            style={{ borderColor: errors.nome ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.nome)}
            {...register("nome", {
              required: "Informe seu nome.",
              minLength: { value: 2, message: "Informe seu nome." },
            })}
          />
        </Field>

        <Field label="E-mail corporativo" htmlFor={`${id}-email`} error={errors.email?.message}>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com.br"
            className={inputClass}
            style={{ borderColor: errors.email ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: "Informe seu e-mail.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "E-mail inválido." },
            })}
          />
        </Field>

        <Field label="WhatsApp / Telefone" htmlFor={`${id}-telefone`} error={errors.telefone?.message}>
          <input
            id={`${id}-telefone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 99999-9999"
            className={inputClass}
            style={{ borderColor: errors.telefone ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.telefone)}
            {...register("telefone", {
              required: "Informe seu telefone / WhatsApp.",
              minLength: { value: 10, message: "Telefone inválido." },
            })}
          />
        </Field>

        <Field label="Empresa" htmlFor={`${id}-empresa`} error={errors.empresa?.message}>
          <input
            id={`${id}-empresa`}
            type="text"
            autoComplete="organization"
            placeholder="Nome da empresa"
            className={inputClass}
            style={{ borderColor: errors.empresa ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.empresa)}
            {...register("empresa", {
              required: "Informe a empresa.",
              minLength: { value: 2, message: "Informe a empresa." },
            })}
          />
        </Field>

        {/* Honeypot */}
        <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-website`}>Não preencha este campo</label>
          <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-[1.6]" style={{ color: MUTED }}>
            <input
              type="checkbox"
              className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#4544BD]"
              aria-invalid={Boolean(errors.consent)}
              {...register("consent", { required: "É preciso aceitar para receber o material." })}
            />
            <span>
              Autorizo o envio do e-book e de comunicações da {""}
              <strong style={{ color: INK }}>Vita Saúde</strong> para o meu e-mail. Posso cancelar
              quando quiser.
            </span>
          </label>
          {errors.consent ? (
            <p role="alert" className="text-[0.8125rem]" style={{ color: DANGER }}>
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        {serverError ? (
          <p
            role="alert"
            className="rounded-lg px-4 py-3 text-[0.875rem]"
            style={{ background: "rgba(180, 35, 24, 0.08)", color: DANGER }}
          >
            {serverError}
          </p>
        ) : null}

        {/* Uso 1 de 2 do amarelo gema nesta pagina */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
          style={{ background: "#FEC717", color: INK }}
        >
          {isSubmitting ? (
            "Enviando…"
          ) : (
            <>
              <DownloadIcon className="h-[18px] w-[18px]" />
              Quero o guia gratuito
            </>
          )}
        </button>

        <p className="text-center text-[0.75rem]" style={{ color: "rgba(7, 10, 38, 0.68)" }}>
          Seus dados não são compartilhados com terceiros.
        </p>
      </form>
    </div>
  );
}
