'use client';

import { useUserInfo } from '@/queries/user/useUserInfo';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const MainHeader = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const resetSelectInterview = useResetRecoilState(selectInterviewState);
  const pathName = usePathname();
  const { userInfoRefetch } = useUserInfo();
  useEffect(() => {
    if (!userInfo.thumbnail) {
      userInfoRefetch();
    }
  }, []);
  return (
    <div className="flex items-center justify-between w-full px-6">
      <div className="flex gap-4 md:text-md text-sm">
        <Link
          className={`${
            pathName === '/' && 'font-bold border-b-2 border-blue-primary'
          } border-b-2 border-white`}
          href="/"
          onClick={resetSelectInterview}>
          홈
        </Link>
        <Link
          className={`${pathName.includes('interview') && 'font-bold'}`}
          href={!!2 ? '/interview/random' : '/login'}>
          AI 면접
        </Link>
        {!!2 && (
          <Link
            className={`${pathName.includes('my') && 'font-bold'}`}
            href="/my?category=interview&Ifield=fe">
            마이페이지
          </Link>
        )}
        {/* <Link className={`${pathName.includes('resume') && 'font-bold'}`} href="/resume">
          이력서
        </Link> */}
      </div>
      <div className="flex justify-center items-center gap-4 md:text-md text-sm">
        {!!2 ? (
          <div className="relative">
            <Link href="/my?category=interview&Ifield=fe">
              <Image
                className="rounded-full hover:outline-4 hover:outline-blue-primary/20 hover:outline "
                src={userInfo.thumbnail}
                alt={`${userInfo.nickName} profile`}
                width={26}
                height={26}
              />
            </Link>
            <div className="absolute top-0 right-0"></div>
          </div>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};
