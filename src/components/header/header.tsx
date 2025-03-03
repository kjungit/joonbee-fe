'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { MyHeader } from './secondHeader/myHeader';
import { InterviewHeader } from './secondHeader/interviewHeader';
import { HomeHeader } from './secondHeader/homeHeader';
import ModalPortal from '../@common/modalPortal';
import { NickNameModal } from '../@common/nickNameModal';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LoginInfo } from './LoginInfo';

const MainHeader = dynamic(() => import('./mainHeader').then(mod => mod.MainHeader), {
  ssr: false,
});

export default function Header() {
  const isOpen = useRecoilValue(NavbarIsOpenAtom);

  const pathName = usePathname();
  const isLogined = useRecoilValue(isLoginedAtom);
  const isNickOpen = useRecoilValue(isNickAtom);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <header className="z-50 flex-col w-screen h-[114px] relative bg-white text-gray-dark">
      <div className="h-[60px] effect-white md:px-0 px-2 flex items-center">
        <div className="md:min-w-[260px] min-w-[100px] flex items-center justify-center">
          <Link href="/">
            <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} priority />
          </Link>
        </div>
        <MainHeader />
      </div>
      <div
        className="w-full
    h-[54px] effect-white flex items-center">
        <LoginInfo />
        <div className="flex items-center justify-between w-full overflow-hidden ">
          <div className={`flex px-2 w-full ${isOpen && 'min-w-[320px]'}`}>
            {pathName === '/' && <HomeHeader />}
            <InterviewHeader />
            {pathName === '/my' && <MyHeader />}
          </div>
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
