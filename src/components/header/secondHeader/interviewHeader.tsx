import IconButton from '@/components/@common/iconButton';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const InterviewHeader = () => {
  const pathName = usePathname();
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);

  return (
    <nav className="flex items-center justify-between w-full px-4 relative">
      <div className="flex gap-4">
        <Link href="/interview/choice">
          <IconButton
            iconName="checklist.png"
            color="white"
            size="sm"
            className={`${pathName.includes('choice') ? 'font-bold bg-blue-light' : ''}`}
            onClick={() => setInterviewType('choice')}>
            선택 질문
          </IconButton>
        </Link>
        <Link href="/interview/random">
          <IconButton
            iconName="random.png"
            color="white"
            size="sm"
            className={`${pathName.includes('random') ? 'font-bold bg-blue-light' : ''}`}
            onClick={() => setInterviewType('random')}>
            랜덤 질문
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};
