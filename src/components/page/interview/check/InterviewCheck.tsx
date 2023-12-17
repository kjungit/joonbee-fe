'use client';

import { interviewAtom } from '@/recoil/interviewQuestion/atom';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function InterviewCheck() {
  const interview = useRecoilValue(myInterviewAtom);
  console.log('인터뷰 결과', interview);

  return (
    <section className="w-[1024px] h-[706px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px]"></section>
  );
}
