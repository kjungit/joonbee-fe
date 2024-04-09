'use client';
import { useSearchParams } from 'next/navigation';
import DetailInterviewSection from './interview/detailInterviewSection';
import { InterviewWrapper } from './interview/interviewWrapper';
import { QuestionWrapper } from './question/questionWrapper';
import { useRecoilValue } from 'recoil';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';

export const HomeSectionWrapper = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const selectInterview = useRecoilValue(selectInterviewState);

  return (
    <div className="flex h-full w-full">
      {categoryParams !== null && categoryParams === 'interview' && <InterviewWrapper />}
      {categoryParams !== 'question' && <DetailInterviewSection />}
      {categoryParams === 'question' && <QuestionWrapper />}
    </div>
  );
};
