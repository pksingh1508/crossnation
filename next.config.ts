import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "determined-unity-de531adc95.media.strapiapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.eucareerserwis.pl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.eucareerserwis.pl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-45c65eb843604170bc538337842fb5a9.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
