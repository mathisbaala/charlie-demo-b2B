import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@anthropic-ai/sdk"],
  },
};

export default nextConfig;
