'use client';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { MyHeader } from './secondHeader/myHeader';
import { InterviewHeader } from './secondHeader/interviewHeader';
import { HomeHeader } from './secondHeader/homeHeader';
import InterviewProgressBar from '../@common/InterviewProgressBar';
import IconButton from '../@common/iconButton';
import ModalPortal from '../@common/modalPortal';
import { NickNameModal } from '../@common/nickNameModal';
import { LoginInfo } from './LoginInfo';
import { MainHeader } from './mainHeader';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';

export default function Header() {
  const pathName = usePathname();
  const isLogined = useRecoilValue(isLoginedAtom);
  const isNickOpen = useRecoilValue(isNickAtom);

  return (
    <header className="flex-col w-screen h-[114px]  ">
      <div className="h-[60px] effect-white dark:border-b dark:effect-dark flex items-center">
        <div className="min-w-[260px] flex items-center justify-center">
          <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} />
        </div>
        <MainHeader />
      </div>
      <div
        className="w-full
    h-[54px] effect-white dark:effect-dark dark:border-b flex items-center">
        <LoginInfo />
        <div className="flex items-center justify-between w-full px-2">
          {pathName === '/' && <HomeHeader />}
          <InterviewHeader />
          {pathName === '/my' && <MyHeader />}
        </div>
      </div>

      {isNickOpen && (
        <ModalPortal>
          <NickNameModal isClose={isLogined} />
        </ModalPortal>
      )}
    </header>
  );
}
