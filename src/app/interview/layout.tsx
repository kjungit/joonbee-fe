import SecondHeader from '@/components/header/secondHeader';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <SecondHeader />
      {children}
    </div>
  );
}
