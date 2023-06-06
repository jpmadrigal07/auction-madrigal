/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
  },
};

module.exports = nextConfig;
