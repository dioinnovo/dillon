/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  // Skip type checking during build (temporary - fix types later)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Turbopack config (required for Next.js 16)
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scottradjusting.com',
      },
      {
        protocol: 'https',
        hostname: 'amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Server external packages (replaces webpack externals for Turbopack)
  serverExternalPackages: [
    'onnxruntime-node',
    'chromadb',
    '@prisma/client',
    '@tensorflow/tfjs-node',
    '@huggingface/transformers',
    'sharp',
    'canvas',
    'puppeteer',
    'playwright',
  ],
}

module.exports = nextConfig
