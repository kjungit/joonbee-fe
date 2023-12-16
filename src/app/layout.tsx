import RecoilRootProvider from '@/recoil/recoilRootProvider';
import { RouteChangesProvider } from 'nextjs-router-events';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/common/Header';
import SWRConfigContext from '@/context/SWRConfigContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JOONBEE',
  description: 'Generated by create next app',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} id="potal">
        <RecoilRootProvider>
          <SWRConfigContext>
            <RouteChangesProvider>
              <Header />
              <main className="h-[calc(100vh-64px)] ">{children}</main>
            </RouteChangesProvider>{' '}
          </SWRConfigContext>
        </RecoilRootProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
