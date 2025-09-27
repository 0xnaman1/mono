import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude browser-only packages from server-side bundle
      config.externals = config.externals || [];
      config.externals.push({
        "@arx-research/libhalo": "commonjs @arx-research/libhalo",
      });
    }

    return config;
  },
  experimental: {
    // Enable server components by default
    serverComponentsExternalPackages: ["@arx-research/libhalo"],
  },
};

export default nextConfig;
