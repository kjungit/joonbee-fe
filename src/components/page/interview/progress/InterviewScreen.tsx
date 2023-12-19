'use client';

import RandomInterview from './RandomInterview';
import ChocieInterview from './ChocieInterview';

export default function InterviewScreen() {
  const { interviewTypeAtom: type } =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('interviewType') || 'null')
      : null;

  return (
    <>
      {type === 'random' && <RandomInterview />}
      {type === 'choice' && <ChocieInterview />}
    </>
  );
}
