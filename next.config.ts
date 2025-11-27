import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS image sources
      },
      {
        protocol: 'http',
        hostname: '**', // (Optional) Allow all HTTP image sources too
      },
    ],
  },
}

export default nextConfig