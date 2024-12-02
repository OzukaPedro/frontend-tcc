import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  compiler: {
    styledComponents: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [],
    });

    return config;
  },
};

export default nextConfig;
