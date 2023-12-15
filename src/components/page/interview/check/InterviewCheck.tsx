'use client';

import { interviewAtom } from '@/recoil/interviewQuestion/atom';
import React from 'react';
import { useRecoilState } from 'recoil';

export default function InterviewCheck() {
  const interview = useRecoilState(interviewAtom);
  console.log('인터뷰 결과', interview);

  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] overflow-scroll"></section>
  );
}
