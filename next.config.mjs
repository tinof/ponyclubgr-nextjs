/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable full Next.js features including image optimization
  // Vercel handles deployment automatically without static export
  trailingSlash: true, // Ensures compatibility with static hosting
  images: {
    // Enable image optimization for Vercel
    unoptimized: false,
    // Configure external domains for image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Modern image formats for better compression
    formats: ['image/webp', 'image/avif'],
    // Cache optimization for Vercel
    minimumCacheTTL: 60,
  },
  experimental: {
    reactCompiler: true, // Enable React Compiler for automatic optimizations
    staleTimes: {
      dynamic: 30,   // Dynamic content is considered fresh for 30 seconds
      static: 180,  // Static content is considered fresh for 180 seconds
    },
  },
}

export default nextConfig
