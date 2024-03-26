'use client';
import { useSearchParams } from 'next/navigation';
import DetailInterviewSection from './interview/detailInterviewSection';
import { InterviewWrapper } from './interview/interviewWrapper';
import { QuestionWrapper } from './question/questionWrapper';

export const HomeSectionWrapper = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <div className="flex h-full w-full ">
      {categoryParams !== null && categoryParams === 'interview' && <InterviewWrapper />}
      {categoryParams === 'interview' && <DetailInterviewSection />}
      {categoryParams === 'question' && <QuestionWrapper />}
    </div>
  );
};
