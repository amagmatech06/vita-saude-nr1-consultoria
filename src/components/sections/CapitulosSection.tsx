import { BlurFade } from "@/components/BlurFade";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/layout/SectionHeading";
import { NumberedList } from "@/components/ui/layout/NumberedList";
import { capitulos } from "@/config/ebook-content";

export function CapitulosSection() {
  const items = capitulos.items.map((item) => ({
    numero: item.numero,
    titulo: item.titulo,
    texto: item.resumo,
  }));

  return (
    <SectionContainer bg="white" id="o-guia" innerClassName="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <BlurFade className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={capitulos.eyebrow}
            title={capitulos.title}
            accent="do conceito à execução"
            description={capitulos.description}
            size="md"
          />
        </BlurFade>

        <BlurFade index={1}>
          <NumberedList items={items} />
        </BlurFade>
      </div>
    </SectionContainer>
  );
}
