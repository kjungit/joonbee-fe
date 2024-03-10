import RecoilRootProvider from '../../../src/recoils/recoilRootProvider';
import { RouteChangesProvider } from 'nextjs-router-events';

import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import SWRConfigContext from '../context/SWRConfigContext';
import Header from '@/components/common/Header';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JOONBEE' || '준비',
  description: '개발자를 위한 AI 면접 서비스',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="790Y2Fo5k5nIvvZRacBoSA3jqr-DIKThbxNFVMRHhuw"
        />
        <meta name="google-adsense-account" content="ca-pub-7301751207531014" />
      </head>
      <body className={notoSansKr.className} id="potal">
        <RecoilRootProvider>
          <SWRConfigContext>
            <RouteChangesProvider>
              <Header />
              <main>{children}</main>
            </RouteChangesProvider>
          </SWRConfigContext>
        </RecoilRootProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
