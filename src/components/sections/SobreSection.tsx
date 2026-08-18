import Image from "next/image";

import { BlurFade } from "@/components/BlurFade";
import { CheckIcon } from "@/components/icons";
import { SectionContainer } from "@/components/ui/layout/SectionContainer";
import { SectionEyebrow } from "@/components/ui/layout/SectionEyebrow";
import { sobre } from "@/config/ebook-content";

export function SobreSection() {
  return (
    <SectionContainer bg="white" id="autora" innerClassName="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <BlurFade>
          <div className="relative">
            <Image
              src="/gabi/gabriela-moreira.jpg"
              alt="Gabriela Moreira, consultora e especialista em NR-1"
              width={1000}
              height={722}
              sizes="(min-width: 1024px) 380px, 100vw"
              className="w-full h-[320px] sm:h-[400px] lg:h-auto rounded-2xl object-cover object-[center_15%] lg:object-top"
            />
            <div
              className="mt-5 border-l-2 pl-5"
              style={{ borderColor: "#4544BD" }}
            >
              <p className="font-serif text-[1.375rem] font-bold" style={{ color: "#070A26" }}>
                {sobre.title}
              </p>
              <p className="text-[0.9375rem]" style={{ color: "rgba(7, 10, 38, 0.68)" }}>
                {sobre.role}
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="flex flex-col gap-8">
          <BlurFade index={1}>
            <SectionEyebrow>{sobre.eyebrow}</SectionEyebrow>
            <div className="mt-5 flex flex-col gap-5">
              {sobre.paragrafos.map((paragrafo, i) => (
                <p
                  key={i}
                  className="max-w-[62ch] text-[1rem] leading-[1.75] md:text-[1.0625rem]"
                  style={{ color: "rgba(7, 10, 38, 0.78)" }}
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </BlurFade>

          <BlurFade index={2}>
            <div className="border-t pt-8" style={{ borderColor: "rgba(7, 10, 38, 0.12)" }}>
              <p
                className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: "rgba(7, 10, 38, 0.68)" }}
              >
                {sobre.areasEyebrow}
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {sobre.areas.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-3 text-[0.9375rem] leading-[1.55] md:text-[1rem]"
                    style={{ color: "rgba(7, 10, 38, 0.8)" }}
                  >
                    <CheckIcon className="mt-[0.3em] h-4 w-4 flex-none" style={{ color: "#4544BD" }} />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        </div>
      </div>
    </SectionContainer>
  );
}
