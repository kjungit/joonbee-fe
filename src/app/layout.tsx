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
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE} />
        <meta property="og:image" content={META.ogImage} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
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
