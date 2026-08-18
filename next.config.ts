import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O PDF precisa estar disponivel no runtime da rota que o anexa ao e-mail.
  outputFileTracingIncludes: {
    "/api/lead": ["./public/ebook/**"],
  },
};

export default nextConfig;
