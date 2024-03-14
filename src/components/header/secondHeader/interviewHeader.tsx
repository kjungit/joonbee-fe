import IconButton from '@/components/@common/iconButton/iconButton';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export const InterviewHeader = () => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center justify-between w-full px-4 relative">
      <div className="flex gap-4">
        <Link href="/interview/choice">
          <IconButton
            iconName="checklist.png"
            color="white"
            size="sm"
            className={`${pathName.includes('choice') ? 'font-bold bg-blue-light' : ''}`}>
            선택 질문
          </IconButton>
        </Link>
        <Link href="/interview/random">
          <IconButton
            iconName="random.png"
            color="white"
            size="sm"
            className={`${pathName.includes('random') ? 'font-bold bg-blue-light' : ''}`}>
            랜덤 질문
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};
