import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set desired value here
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edmv2.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
