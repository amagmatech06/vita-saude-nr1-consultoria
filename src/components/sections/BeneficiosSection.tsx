import { BlurFade } from "@/components/BlurFade";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/layout/SectionHeading";
import { beneficios } from "@/config/ebook-content";

export function BeneficiosSection() {
  return (
    <SectionContainer bg="neutra" id="beneficios" labelledBy="beneficios-titulo">
      <BlurFade>
        <SectionHeading
          eyebrow={beneficios.eyebrow}
          title={beneficios.title}
          titleId="beneficios-titulo"
          accent="prevenção"
          description={beneficios.description}
        />
      </BlurFade>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beneficios.items.map((item, i) => (
          <BlurFade key={item.numero} index={i % 3}>
            <article
              className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 transition-transform duration-200 hover:-translate-y-1 lg:p-7"
              style={{ border: "1px solid rgba(7, 10, 38, 0.08)" }}
            >
              <span className="stat-number text-[1.5rem]" style={{ color: "#4544BD" }}>
                {item.numero}
              </span>
              <h3
                className="font-serif text-[1.1875rem] font-bold leading-[1.25] md:text-[1.3125rem]"
                style={{ color: "#070A26" }}
              >
                {item.titulo}
              </h3>
              <p
                className="text-[0.9375rem] leading-[1.7]"
                style={{ color: "rgba(7, 10, 38, 0.68)" }}
              >
                {item.texto}
              </p>
            </article>
          </BlurFade>
        ))}
      </div>
    </SectionContainer>
  );
}
