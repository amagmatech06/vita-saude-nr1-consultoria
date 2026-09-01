"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { DownloadIcon } from "@/components/icons";
import { hero } from "@/config/ebook-content";
import { COLABORADORES_OPCOES, type Colaboradores } from "@/config/lead-options";
import { track } from "@/lib/analytics";

type FormValues = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  colaboradores: Colaboradores | "";
  consent: boolean;
  /** Honeypot — invisivel para pessoas, preenchido por bots. */
  website: string;
};

const INK = "#070A26";
const MUTED = "rgba(7, 10, 38, 0.68)";
/** 0.42 sobre branco da ~3,1:1 — a borda e a unica delimitacao do campo. */
const BORDER = "rgba(7, 10, 38, 0.42)";
const DANGER = "#B42318";

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  /** Recebe o `id` da mensagem de erro para ligar ao input via aria-describedby. */
  children: (erroId: string | undefined) => React.ReactNode;
  htmlFor: string;
}) {
  const erroId = `${htmlFor}-erro`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[0.8125rem] font-semibold"
        style={{ color: INK }}
      >
        {label}
      </label>
      {children(error ? erroId : undefined)}
      {error ? (
        <p id={erroId} role="alert" className="text-[0.8125rem]" style={{ color: DANGER }}>
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
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      colaboradores: "",
      consent: false,
      website: "",
    },
  });

  /** Sem valor escolhido, o <select> precisa parecer placeholder, e nao resposta. */
  const colaboradores = watch("colaboradores");

  /**
   * A utility que zera o outline nao entra aqui: ela fica na layer `utilities`, que vence o
   * `:focus-visible` do globals.css (layer `base`) — o campo ficaria sem
   * NENHUM indicador de foco. A borda tambem nao serve de indicador aqui,
   * porque o `style={{ borderColor }}` inline vence qualquer classe.
   */
  const inputClass =
    "min-h-[52px] w-full rounded-xl border bg-white px-4 text-[1rem] transition-colors placeholder:text-[rgba(7,10,38,0.55)]";

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data: {
          message?: string;
          fieldErrors?: Partial<Record<keyof FormValues, string[]>>;
        } = await response.json().catch(() => ({}));
        track("lead_error", { status: response.status });

        // 422 vem com `fieldErrors`, nao com `message`: joga cada erro no campo
        // que o gerou em vez de mostrar so o aviso generico no rodape do form.
        const fieldErrors = data.fieldErrors;
        let mostrouNoCampo = false;
        if (fieldErrors) {
          for (const [campo, mensagens] of Object.entries(fieldErrors)) {
            const mensagem = mensagens?.[0];
            if (!mensagem) continue;
            setError(campo as keyof FormValues, { type: "server", message: mensagem });
            mostrouNoCampo = true;
          }
        }

        setServerError(
          data.message ??
            (mostrouNoCampo
              ? "Confira os campos destacados e envie de novo."
              : "Não conseguimos enviar agora. Tente novamente."),
        );
        return;
      }

      track("lead_submit", { empresa: values.empresa, colaboradores: values.colaboradores });
      router.push("/obrigado?ref=form");
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
      {/*
        h2, nao <p>: o formulario e o elemento de conversao do site e nao tinha
        heading nem nome acessivel — nao aparecia na navegacao por headings nem
        na de landmarks. O leitor de tela so chegava nele tabulando o hero todo.
      */}
      <h2
        id={`${id}-titulo`}
        className="font-serif text-[1.375rem] font-bold leading-tight"
        style={{ color: INK }}
      >
        {hero.formTitle}
      </h2>
      <p className="mt-1.5 text-[0.9375rem]" style={{ color: MUTED }}>
        {hero.formSubtitle}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby={`${id}-titulo`}
        className="mt-6 flex flex-col gap-4"
        noValidate
      >
        <Field label="Nome" htmlFor={`${id}-nome`} error={errors.nome?.message}>
          {(erroId) => (
          <input
            id={`${id}-nome`}
            type="text"
            autoComplete="name"
            placeholder="Como podemos te chamar"
            className={inputClass}
            style={{ borderColor: errors.nome ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={erroId}
            aria-required="true"
            {...register("nome", {
              required: "Informe seu nome.",
              minLength: { value: 2, message: "Informe seu nome." },
            })}
          />
          )}
        </Field>

        <Field label="E-mail corporativo" htmlFor={`${id}-email`} error={errors.email?.message}>
          {(erroId) => (
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com.br"
            className={inputClass}
            style={{ borderColor: errors.email ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={erroId}
            aria-required="true"
            {...register("email", {
              required: "Informe seu e-mail.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "E-mail inválido." },
            })}
          />
          )}
        </Field>

        <Field label="WhatsApp / Telefone" htmlFor={`${id}-telefone`} error={errors.telefone?.message}>
          {(erroId) => (
          <input
            id={`${id}-telefone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 99999-9999"
            className={inputClass}
            style={{ borderColor: errors.telefone ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.telefone)}
            aria-describedby={erroId}
            aria-required="true"
            {...register("telefone", {
              required: "Informe seu telefone / WhatsApp.",
              minLength: { value: 10, message: "Telefone inválido." },
            })}
          />
          )}
        </Field>

        <Field label="Empresa" htmlFor={`${id}-empresa`} error={errors.empresa?.message}>
          {(erroId) => (
          <input
            id={`${id}-empresa`}
            type="text"
            autoComplete="organization"
            placeholder="Nome da empresa"
            className={inputClass}
            style={{ borderColor: errors.empresa ? DANGER : BORDER, color: INK }}
            aria-invalid={Boolean(errors.empresa)}
            aria-describedby={erroId}
            aria-required="true"
            {...register("empresa", {
              required: "Informe a empresa.",
              minLength: { value: 2, message: "Informe a empresa." },
            })}
          />
          )}
        </Field>

        <Field
          label="Quantos colaboradores tem na sua empresa?"
          htmlFor={`${id}-colaboradores`}
          error={errors.colaboradores?.message}
        >
          {(erroId) => (
          <select
            id={`${id}-colaboradores`}
            /*
              `appearance-none` + seta desenhada: a seta nativa do Windows/Chrome
              vem quase preta e destoa do resto do card. O padding a direita
              reserva o espaco dela para o texto nao passar por baixo.
            */
            className={`${inputClass} cursor-pointer appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat py-0 pr-11`}
            style={{
              borderColor: errors.colaboradores ? DANGER : BORDER,
              // Sem escolha, o texto e o placeholder — mesma cor do dos inputs.
              color: colaboradores ? INK : "rgba(7, 10, 38, 0.55)",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%23070A26' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={Boolean(errors.colaboradores)}
            aria-describedby={erroId}
            aria-required="true"
            {...register("colaboradores", { required: "Selecione o porte da empresa." })}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {COLABORADORES_OPCOES.map((opcao) => (
              <option key={opcao} value={opcao} style={{ color: INK }}>
                {opcao}
              </option>
            ))}
          </select>
          )}
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
              aria-describedby={errors.consent ? `${id}-consent-erro` : undefined}
              aria-required="true"
              {...register("consent", { required: "É preciso aceitar para receber o material." })}
            />
            <span>
              Autorizo o envio do e-book e de comunicações da{" "}
              <strong style={{ color: INK }}>Vita Saúde</strong> para o meu e-mail e WhatsApp.
              Posso cancelar quando quiser.
            </span>
          </label>
          {errors.consent ? (
            <p
              id={`${id}-consent-erro`}
              role="alert"
              className="text-[0.8125rem]"
              style={{ color: DANGER }}
            >
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
          className="group inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
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
