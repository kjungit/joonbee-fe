/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net',
      'phinf.pstatic.net',
      'i.ytimg.com',
      'lh3.googleusercontent.com',
      'ssl.pstatic.net',
      't1.kakaocdn.net'
    ],
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
