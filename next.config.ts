import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unpkg.com', 'raw.githubusercontent.com'],
  },
};

export default nextConfig;
