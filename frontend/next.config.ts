import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Build enxuto, otimizado pra containers (Docker/Cloud Run)
  output: 'standalone',
}

export default nextConfig