import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gps-staging.getfleet.ai/api/:path*',
      },
    ]
  },
}

export default nextConfig
