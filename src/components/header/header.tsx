'use client';
import React from 'react';
import ThemeSwitch from '../themeSwitch/themeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();

  return (
    <header
      className="w-screen 
     h-[60px] effect-white dark:border-b dark:effect-dark flex items-center ">
      <div className="min-w-[260px] flex items-center justify-center">
        <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} />
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-4">
          <Link
            className={`${
              !pathName.includes('interview') && !pathName.includes('resume') && 'font-bold'
            }`}
            href="/">
            홈
          </Link>
          <Link className={`${pathName.includes('interview') && 'font-bold'}`} href="/interview">
            AI 면접
          </Link>
          <Link className={`${pathName.includes('resume') && 'font-bold'}`} href="/resume">
            이력서
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link href="/login">로그인</Link>
          <div className="min-w-[40px">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
