'use client';
import { ViewSizeCheck } from '@/components/@common/viewSizeCheck';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMount, setIsMount] = useState(false);
  const [cookies] = useCookies(['joonbee-token']);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!cookies['joonbee-token']) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div className="w-full relative h-[calc(100vh - 144px)]">
      {isMount && pathName.includes('interview') && <ViewSizeCheck />}
      <CenterSectionWrapper>{children}</CenterSectionWrapper>
    </div>
  );
}
