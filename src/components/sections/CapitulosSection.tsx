import Image from "next/image";
import { BlurFade } from "@/components/BlurFade";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/layout/SectionHeading";
import { NumberedList } from "@/components/ui/layout/NumberedList";
import { capitulos } from "@/config/ebook-content";
import { site } from "@/config/site";

export function CapitulosSection() {
  const items = capitulos.items.map((item) => ({
    numero: item.numero,
    titulo: item.titulo,
    texto: item.resumo,
  }));

  return (
    <SectionContainer bg="white" id="o-guia" labelledBy="o-guia-titulo">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <BlurFade className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={capitulos.eyebrow}
            title={capitulos.title}
            titleId="o-guia-titulo"
            accent="do conceito à execução"
            description={capitulos.description}
            size="md"
          />
          <div className="mt-10 lg:mt-16 flex justify-center lg:justify-start">
            <Image
              src={site.ebook.cover}
              alt="Capa do e-book"
              width={400}
              height={566}
              className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] rounded-xl shadow-[0_20px_50px_-15px_rgba(7,10,38,0.2)] rotate-[-3deg]"
            />
          </div>
        </BlurFade>

        <BlurFade index={1}>
          <NumberedList items={items} />
        </BlurFade>
      </div>
    </SectionContainer>
  );
}
