import { BlurFade } from "@/components/BlurFade";
import { ShieldIcon, BrainIcon } from "@/components/icons";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/layout/SectionHeading";
import { indicadores, problema } from "@/config/ebook-content";

const ICONS = [ShieldIcon, BrainIcon] as const;

export function ProblemaSection() {
  return (
    <SectionContainer bg="neutra" grid id="problema">
      <BlurFade>
        <SectionHeading
          eyebrow={problema.eyebrow}
          title={problema.title}
          accent="riscos psicossociais"
          description={problema.description}
          size="md"
        />
      </BlurFade>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {problema.colunas.map((coluna, i) => {
          const Icon = ICONS[i] ?? ShieldIcon;
          const destaque = i === 1;

          return (
            <BlurFade key={coluna.title} index={i}>
              <div
                className="flex h-full flex-col gap-5 rounded-2xl p-7 lg:p-9"
                style={
                  destaque
                    ? { background: "#070A26", color: "#F9F9FB" }
                    : { background: "#FFFFFF", border: "1px solid rgba(7, 10, 38, 0.08)" }
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <p
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: destaque ? "rgba(249, 249, 251, 0.62)" : "rgba(7, 10, 38, 0.68)" }}
                  >
                    {coluna.eyebrow}
                  </p>
                  <Icon
                    className="h-6 w-6"
                    style={{ color: destaque ? "rgba(249, 249, 251, 0.8)" : "#4544BD" }}
                  />
                </div>

                <h3
                  className="font-serif text-[1.625rem] font-bold md:text-[1.875rem]"
                  style={{ color: destaque ? "#F9F9FB" : "#070A26" }}
                >
                  {coluna.title}
                </h3>

                <ul className="flex flex-col gap-2.5">
                  {coluna.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] md:text-[1rem]"
                      style={{ color: destaque ? "rgba(249, 249, 251, 0.78)" : "rgba(7, 10, 38, 0.72)" }}
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full"
                        style={{ background: destaque ? "rgba(249, 249, 251, 0.5)" : "#4544BD" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          );
        })}
      </div>

      <BlurFade index={2}>
        <p
          className="mt-10 max-w-[42ch] font-serif text-[1.375rem] leading-[1.35] md:text-[1.75rem]"
          style={{ color: "#4544BD" }}
        >
          {problema.fecho}
        </p>
      </BlurFade>

      {/* Indicadores do material (p.10) — nao sao resultados de clientes */}
      <BlurFade index={3}>
        <div className="mt-14 border-t pt-10 text-center sm:text-left" style={{ borderColor: "rgba(7, 10, 38, 0.12)" }}>
          <p
            className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
            style={{ color: "rgba(7, 10, 38, 0.68)" }}
          >
            {indicadores.eyebrow}
          </p>

          <div className="mt-7 grid gap-8 sm:grid-cols-3">
            {indicadores.numeros.map((numero, i) => (
              <div key={numero.label} className="flex flex-col items-center sm:items-start gap-1.5">
                <CountUp
                  value={numero.valor}
                  delay={i * 0.12}
                  className="stat-number text-[2.75rem] md:text-[3.25rem]"
                  style={{ color: "#4544BD" }}
                />
                <span
                  className="text-[0.75rem] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "rgba(7, 10, 38, 0.68)" }}
                >
                  {numero.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[0.8125rem]" style={{ color: "rgba(7, 10, 38, 0.68)" }}>
            {indicadores.notaFonte}
          </p>
        </div>
      </BlurFade>
    </SectionContainer>
  );
}
