import InterviewProgressBar from '@/components/@common/InterviewProgressBar';
import IconButton from '@/components/@common/iconButton';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import { IconType, InterviewType } from '@/types';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import InterviewTypeMenu from '@/components/@common/interviewTypeMenu';

interface InterviewHeaderProps {
  selectedInterviewType?: InterviewType | null;
}

const INTERVIEW_TYPE = {
  choice: {
    iconName: 'checklist.png' as IconType,
    text: '선택 질문',
  },
  random: {
    iconName: 'random.png' as IconType,
    text: '랜덤 질문',
  },
};

export const InterviewHeader = ({}: InterviewHeaderProps) => {
  const pathName = usePathname();

  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);

  return (
    <nav className="flex items-center">
      <div className="flex">
        {pathName === '/interview/choice' && <InterviewTypeMenu />}
        {pathName === '/interview/random' && <InterviewTypeMenu />}

        {pathName === '/interview/choice/setting' && (
          <div className="flex gap-8 items-center">
            <IconButton
              iconName="checklist.png"
              color="blue"
              size="sm"
              className="cursor-default font-bold">
              선택 질문
            </IconButton>
            <InterviewProgressBar />
          </div>
        )}
        {pathName === '/interview/random/setting' && (
          <div className="flex gap-8 items-center">
            <IconButton
              iconName="random.png"
              color="blue"
              size="sm"
              className="cursor-default font-bold">
              랜덤 질문
            </IconButton>
            <InterviewProgressBar />
          </div>
        )}
        {pathName === '/interview/permission' && (
          <nav className="flex items-center justify-between w-full px-4 relative">
            <div className="flex gap-8 items-center">
              <IconButton
                iconName={INTERVIEW_TYPE[interviewType].iconName}
                color="blue"
                size="sm"
                className="cursor-default font-bold">
                {INTERVIEW_TYPE[interviewType].text}
              </IconButton>
              <InterviewProgressBar interview="DeviceSetting" />
            </div>
          </nav>
        )}
        {pathName === '/interview/progress' && (
          <nav className="flex items-center justify-between w-full px-4 relative">
            <div className="flex gap-8 items-center">
              <IconButton
                iconName={INTERVIEW_TYPE[interviewType].iconName}
                color="blue"
                size="sm"
                className="cursor-default font-bold">
                {INTERVIEW_TYPE[interviewType].text}
              </IconButton>
              <InterviewProgressBar interview="InterviewConducting" />
            </div>
          </nav>
        )}
        {pathName === '/interview/result' && (
          <nav className="flex items-center justify-between w-full px-4 relative">
            <div className="flex gap-8 items-center">
              <IconButton
                iconName={INTERVIEW_TYPE[interviewType].iconName}
                color="blue"
                size="sm"
                className="cursor-default font-bold">
                {INTERVIEW_TYPE[interviewType].text}
              </IconButton>
              <InterviewProgressBar interview="InterviewResult" />
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
};
