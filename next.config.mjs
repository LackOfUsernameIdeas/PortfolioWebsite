/** @type {import('next').NextConfig} */

const devIP = process.env.NEXT_PUBLIC_DEV_IP;

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  allowedDevOrigins: devIP ? [devIP] : []
};

export default nextConfig;
