'use client';

import { interviewAtom } from '@/recoil/interviewQuestion/atom';
import React from 'react';
import { useRecoilState } from 'recoil';

export default function InterviewCheck() {
  const interview = useRecoilState(interviewAtom);
  console.log('인터뷰 결과', interview);

  return <div></div>;
}
