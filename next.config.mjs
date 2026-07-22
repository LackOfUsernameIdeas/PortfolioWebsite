/** @type {import('next').NextConfig} */

const devIP = process.env.NEXT_PUBLIC_DEV_IP;

const nextConfig = {
  output: "export",
  allowedDevOrigins: devIP ? [devIP] : []
};

export default nextConfig;
