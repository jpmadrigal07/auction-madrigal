/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    WEB_URL: "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
  }
};

module.exports = nextConfig;
