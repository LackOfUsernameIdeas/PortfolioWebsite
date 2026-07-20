/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  allowedDevOrigins: ["192.168.50.54"]
};

export default nextConfig;
