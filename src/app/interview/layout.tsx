'use client';
import { ViewSizeCheck } from '@/components/@common/viewSizeCheck';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMount, setIsMount] = useState(false);
  const pathName = usePathname();

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
