import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable full Next.js features including image optimization
  // Vercel handles deployment automatically without static export
  trailingSlash: true, // Ensures compatibility with static hosting

  // Disable ESLint checking during builds since we're using Biome
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Note: i18n config is not compatible with app router
  // Using manual locale routing with [locale] folder structure instead
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

  // Webpack configuration to handle module resolution issues
  webpack: (config, { isServer }) => {
    // Fix for module resolution issues in Next.js 15
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },


}

export default withBundleAnalyzer(nextConfig);
