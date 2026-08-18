"use client";

import { DownloadIcon } from "@/components/icons";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";

export function DownloadButton({ label }: { label: string }) {
  return (
    <a
      href={site.ebook.file}
      download={site.ebook.downloadAs}
      onClick={() => track("ebook_download", { source: "obrigado" })}
      className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
      style={{ background: "#FEC717", color: "#252534" }}
    >
      <DownloadIcon className="h-[18px] w-[18px]" />
      {label}
    </a>
  );
}
