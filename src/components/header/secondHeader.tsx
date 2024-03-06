'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import InterviewTypeMenu from '@/components/@common/interviewTypeMenu/interviewTypeMenu';

export default function SecondHeader() {
  const pathName = usePathname();

  return (
    <header className="w-full h-[60px] effect-white dark:effect-dark dark:border-b  flex items-center ">
      <InterviewTypeMenu />
    </header>
  );
}
