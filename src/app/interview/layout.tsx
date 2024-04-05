import { ViewSizeCheck } from '@/components/@common/viewSizeCheck';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative h-[calc(100vh - 144px)]">
      <ViewSizeCheck />
      <CenterSectionWrapper>{children}</CenterSectionWrapper>
    </div>
  );
}
