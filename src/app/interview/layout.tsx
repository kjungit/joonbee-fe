'use client';
import authApis from '@/apis/services/authApis';
import { ViewSizeCheck } from '@/components/@common/viewSizeCheck';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(['joonbee-token']);
  const router = useRouter();

  useEffect(() => {
    if (!cookies['joonbee-token']) {
      authApis.getRefresh().then(data => {
        if (data.status !== 200) router.push('/login');
      });
    }
  }, []);

  return (
    <div className="w-full relative h-[calc(100vh - 144px)]">
      <ViewSizeCheck />
      <CenterSectionWrapper>{children}</CenterSectionWrapper>
    </div>
  );
}
