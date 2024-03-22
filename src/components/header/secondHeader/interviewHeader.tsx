import IconButton from '@/components/@common/iconButton';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const InterviewHeader = () => {
  const pathName = usePathname();
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);

  return (
    <nav className="flex items-center">
      <div className="flex">
        <Link href="/interview/choice">
          <IconButton
            iconName="checklist.png"
            color={interviewType === 'choice' ? 'blue' : 'white'}
            className={`${interviewType === 'choice' ? 'font-bold' : ''}`}
            size="sm"
            onClick={() => setInterviewType('choice')}>
            선택 질문
          </IconButton>
        </Link>
        <Link href="/interview/random">
          <IconButton
            iconName="random.png"
            color={interviewType === 'random' ? 'blue' : 'white'}
            className={`${interviewType === 'random' ? 'font-bold' : ''}`}
            size="sm"
            onClick={() => setInterviewType('random')}>
            랜덤 질문
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};
