/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      // { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'effigy.im' },
    ],
  },
  /* experimental: {
    turbo: { resolveAlias: { fs: { browser: '' }, net: { browser: '' }, tls: { browser: '' } } },
  }, */
};
