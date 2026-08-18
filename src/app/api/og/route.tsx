import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070A26",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Halo indigo */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 900,
            height: 620,
            borderRadius: 9999,
            background: "#4544BD",
            opacity: 0.5,
            filter: "blur(140px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 28, height: 3, background: "#FEC717" }} />
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(249,249,251,0.72)",
            }}
          >
            E-book gratuito · Edição 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#F9F9FB",
            }}
          >
            NR-1 na prática
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: 880,
              color: "rgba(249,249,251,0.76)",
            }}
          >
            {site.ebook.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(249,249,251,0.18)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#F9F9FB" }}>
              {site.founder.name}
            </div>
            <div style={{ fontSize: 22, color: "rgba(249,249,251,0.6)" }}>
              {site.founder.role}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["28 páginas", "8 capítulos", "PDF"].map((badge) => (
              <div
                key={badge}
                style={{
                  border: "1px solid rgba(249,249,251,0.28)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 20,
                  color: "rgba(249,249,251,0.82)",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
