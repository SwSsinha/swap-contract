/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Security Headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Environment Variables Validation
  env: {
    SOLANA_NETWORK: process.env.SOLANA_NETWORK,
    JUPITER_API_BASE: process.env.JUPITER_API_BASE,
    JUPITER_SLIPPAGE_BPS: process.env.JUPITER_SLIPPAGE_BPS,
  },

  // Optimize bundle
  swcMinify: true,

};

module.exports = nextConfig;