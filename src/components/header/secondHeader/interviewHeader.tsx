import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export const InterviewHeader = () => {
  const pathName = usePathname();

  return (
    <>
      <Link className={`${pathName.includes('choice') && 'font-bold'}`} href="/interview/choice">
        선택 질문
      </Link>
      <Link className={`${pathName.includes('random') && 'font-bold'}`} href="/interview/random">
        랜덤 질문
      </Link>
    </>
  );
};
