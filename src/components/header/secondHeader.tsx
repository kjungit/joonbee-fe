'use client';
import React from 'react';
import ThemeSwitch from '../themeSwitch/themeSwitch';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function SecondHeader() {
  const pathName = usePathname();
  return (
    <header
      className="w-full
    h-[60px] effect-white dark:effect-dark dark:border-b  flex items-center ">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-4">
          <Link
            className={`${pathName.includes('choice') && 'font-bold'}`}
            href="/interview/choice">
            선택 질문
          </Link>
          <Link
            className={`${pathName.includes('random') && 'font-bold'}`}
            href="/interview/random">
            랜덤 질문
          </Link>
        </div>
      </div>
    </header>
  );
}
