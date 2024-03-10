'use client';

import { useSearchParams } from 'next/navigation';
import { InterviewWrapper } from './interview/interviewWrapper';
import { QuestionWrapper } from './question/questionWrapper';

export default function SecondSection() {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <section>
      {categoryParams !== null &&
        (categoryParams === 'interview' ? <InterviewWrapper /> : <QuestionWrapper />)}
    </section>
  );
}
