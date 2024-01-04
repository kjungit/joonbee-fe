'use client';

import RandomInterview from './RandomInterview';
import ChocieInterview from './ChocieInterview';
import { useRecoilValue } from 'recoil';
import { interviewTypeAtom } from '@/recoil/interviewType/atom';

export default function InterviewScreen() {
  const type = useRecoilValue(interviewTypeAtom);

  return (
    <>
      {type === 'random' && <RandomInterview />}
      {type === 'choice' && <ChocieInterview />}
    </>
  );
}
