import QueryProvider from '@/queries/queryProvider';
import RecoilRootProvider from '@/recoils/recoilRootProvider';

import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/header/header';
import Navbar from '@/components/navbar/navbar';
import { META } from '@/constants/openGraph';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    siteName: META.siteName,
    description: META.description,
    images: [
      {
        url: META.ogImage,
        width: 1200,
        height: 630,
        alt: META.title,
      },
    ],
    url: META.url,
  },
  keywords: META.keyword,
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content={META.googleVerification} />
        <meta name="naver-site-verification" content={META.naverVerification} />
        <meta name="google-adsense-account" content="ca-pub-7301751207531014" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={(notoSansKr.className, 'bg-white text-gray-dark')}
        id="portal">
        <RecoilRootProvider>
          <QueryProvider>
            <Header />
            <main className="flex">
              <Navbar />
              {children}
            </main>
          </QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
