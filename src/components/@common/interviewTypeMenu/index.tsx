'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconButton from '@/components/@common/iconButton';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import { useRecoilState } from 'recoil';

export default function InterviewTypeMenu() {
  const pathName = usePathname();
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);

  return (
    <nav className="flex items-center justify-between w-full gap-2">
      <Link href="/interview/random">
        <IconButton
          iconName="random.png"
          color={interviewType === 'random' ? 'blue' : 'white'}
          className={`${interviewType === 'random' ? 'font-bold' : ''}`}
          size="sm"
          onClick={() => setInterviewType('random')}>
          랜덤 질문
        </IconButton>
      </Link>
      <Link href="/interview/choice">
        <IconButton
          iconName="checklist.png"
          color={interviewType === 'choice' ? 'blue' : 'white'}
          className={`${interviewType === 'choice' ? 'font-bold' : ''}`}
          size="sm"
          onClick={() => setInterviewType('choice')}>
          선택 질문
        </IconButton>
      </Link>
    </nav>
  );
}
