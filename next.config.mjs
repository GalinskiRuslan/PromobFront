import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "promobilograf.kz",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dspt7sohnkg6q.cloudfront.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
