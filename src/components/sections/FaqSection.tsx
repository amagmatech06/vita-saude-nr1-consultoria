import { BlurFade } from "@/components/BlurFade";
import { PlusIcon } from "@/components/icons";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/layout/SectionHeading";
import { faq } from "@/config/ebook-content";

export function FaqSection() {
  return (
    <SectionContainer bg="neutra" id="faq" innerClassName="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <BlurFade className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} accent="baixar" size="sm" />
        </BlurFade>

        <BlurFade index={1}>
          <div className="flex flex-col">
            {faq.items.map((item) => (
              <details
                key={item.pergunta}
                className="group border-t"
                style={{ borderColor: "rgba(37, 37, 52, 0.12)" }}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3
                    className="font-serif text-[1.125rem] font-bold leading-[1.35] md:text-[1.25rem]"
                    style={{ color: "#252534" }}
                  >
                    {item.pergunta}
                  </h3>
                  <PlusIcon
                    className="mt-1 h-5 w-5 flex-none transition-transform duration-200 group-open:rotate-45"
                    style={{ color: "#4544BD" }}
                  />
                </summary>
                <p
                  className="max-w-[64ch] pb-7 pr-10 text-[0.9375rem] leading-[1.75] md:text-[1rem]"
                  style={{ color: "rgba(37, 37, 52, 0.72)" }}
                >
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </BlurFade>
      </div>
    </SectionContainer>
  );
}
