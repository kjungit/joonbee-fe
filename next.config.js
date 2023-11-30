/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://back.joonbee.co.kr/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
