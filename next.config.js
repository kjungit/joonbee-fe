/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['k.kakaocdn.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://back.joonbee.co.kr/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
