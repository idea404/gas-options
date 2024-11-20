/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        encoding: false,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@iden3/js-crypto': require.resolve('@iden3/js-crypto')
    };
    return config;
  },
}

module.exports = nextConfig