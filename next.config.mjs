/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["pt"],
    defaultLocale: "pt",
  },
  images: {
    domains: ["www.pbs.org"],
  },
  output: "standalone",
};

export default nextConfig;
