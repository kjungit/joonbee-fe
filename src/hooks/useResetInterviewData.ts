import {
  currentCountAtom,
  interviewQuestionCountAtom,
  interviewTimeAtom,
  interviewTypeAtom,
  interviewVideoUrlAtom,
  isClickNextBtnAtom,
  selectedDeviceIdAtom,
} from '@/recoils/interview/atom';
import { myInterviewAtom } from '@/recoils/myInterview/atom';
import { InterviewType } from '@/types';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function useResetInterviewData(interviewType: InterviewType) {
  const [, setInterviewType] = useRecoilState(interviewTypeAtom);
  const resetInterviewQuestionCount = useResetRecoilState(interviewQuestionCountAtom);
  const resetInterviewTime = useResetRecoilState(interviewTimeAtom);
  const resetInterviewVideoUrl = useResetRecoilState(interviewVideoUrlAtom);
  const resetSelectedDeviceId = useResetRecoilState(selectedDeviceIdAtom);
  const resetCurrentCount = useResetRecoilState(currentCountAtom);
  const resetIsClickNextBtn = useResetRecoilState(isClickNextBtnAtom);
  const resetMyInterview = useResetRecoilState(myInterviewAtom);

  useEffect(() => {
    resetInterviewQuestionCount();
    resetInterviewTime();
    resetInterviewVideoUrl();
    resetSelectedDeviceId();
    resetCurrentCount();
    resetIsClickNextBtn();
    resetMyInterview();
    setInterviewType(interviewType);
  }, []);
}
