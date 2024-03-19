'use client';
import React, { MouseEvent, useEffect } from 'react';
import ThemeSwitch from '../themeSwitch/themeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { selectMenuState } from '@/recoils/home/selectMenu/atom';
import { Text } from '../@common/text';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { userInfoState } from '@/recoils/user/userInfo/atom';
import { MyHeader } from './secondHeader/myHeader';
import { InterviewHeader } from './secondHeader/interviewHeader';
import { HomeHeader } from './secondHeader/homeHeader';
import { isLoginedStatus } from '@/recoils/user/isLogined/atom';
import { VariableIcon } from '../@common/variableIcon';

export default function Header() {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedStatus);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );
  const [selectMenu, setSelectMenu] = useRecoilState(selectMenuState);
  const resetSelectInterview = useResetRecoilState(selectInterviewState);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParams = searchParams.get('category');

  const handleClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectMenu(target.id);
    console.log(target.id);
    if (target.id === 'interview') {
      router.push(`/?category=${target.id}&Ifield=fe`);
    } else if (target.id === 'question') {
      // question navbar 설정 후 상태값 적용해야함
      router.push(`/?category=${target.id}&Qfield=fe&subField=react`);
    }

    if (categoryParams !== target.id)
      setSelectInterviewCategory({ category: 'fe', sort: 'latest' });
  };

  useEffect(() => {
    console.log(userInfo.thumbnail);
  }, []);

  return (
    <header
      className="flex-col w-screen 
     h-[114px]  ">
      <div className="h-[60px] effect-white dark:border-b dark:effect-dark flex items-center">
        <div className="min-w-[260px] flex items-center justify-center">
          <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} />
        </div>
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex gap-4">
            <button onClick={resetSelectInterview}>
              <Link className={`${pathName === '/' && 'font-bold'}`} href="/">
                홈
              </Link>
            </button>
            <Link className={`${pathName.includes('interview') && 'font-bold'}`} href="/interview">
              AI 면접
            </Link>
            <Link className={`${pathName.includes('resume') && 'font-bold'}`} href="/resume">
              이력서
            </Link>
            {/* {userInfo && userInfo.id !== '' && (
              <Link
                className={`${pathName.includes('my') && 'font-bold'}`}
                href="/my?category=interview&Ifield=fe">
                마이페이지
              </Link>
            )} */}
          </div>
          <div className="flex justify-center items-center gap-4">
            {isLogined ? (
              <div className="relative">
                <Link href="/my?category=interview&Ifield=fe">
                  <Image
                    src={userInfo.thumbnail}
                    alt={`${userInfo.nickName} profile`}
                    width={26}
                    height={26}
                    className="rounded-full hover:outline-4 hover:outline-blue-primary/20 hover:outline "
                  />
                </Link>
                <div className="absolute top-0 right-0"></div>
              </div>
            ) : (
              <Link href="/login">로그인</Link>
            )}
            <div className="min-w-[40px">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full
    h-[54px] effect-white dark:effect-dark dark:border-b flex items-center">
        <div className="h-full min-w-[260px] flex items-center justify-center border-r-[1px] border-gray-normal">
          {isLogined ? (
            <div className="flex gap-2 items-center">
              <Image
                src={userInfo.thumbnail}
                alt={`${userInfo.nickName} profile`}
                width={24}
                height={24}
                className="rounded-full"
              />
              <Text size="lg">{userInfo.nickName}</Text>
              <VariableIcon name="edit" size={16} />
            </div>
          ) : (
            <Text size="lg">로그인을 해주세요.</Text>
          )}
        </div>
        <div className="flex items-center justify-between w-full ">
          <div className="flex gap-4 px-2 w-full">
            {pathName === '/' && <HomeHeader />}
            {pathName === '/interview' && <InterviewHeader />}
            {pathName === '/my' && <MyHeader />}
          </div>
        </div>
      </div>
    </header>
  );
}
