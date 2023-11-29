'use client';
import { MouseEvent, useEffect, useState } from 'react';
import Alarm from '../Alarm';
import { Avatar } from '@/components/ui/Avartar';
import Logo from '@/components/ui/Logo';
import { alarmData } from '@/constants/alarm';
import ModalPortal from '@/components/ui/ModalPortal';
import { LoginBox } from '../LoginBox';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const data = alarmData;
  const router = useRouter();

  const onClickLogin = () => {
    setIsOpen(!isOpen);
  };

  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="w-screen z-50 h-[60px] shadow-sm flex justify-center items-center bg-white">
        <div className="min-w-[1200px] flex justify-between items-center">
          <button onClick={() => router.push('/')}>
            <div className="flex gap-3 items-center">
              <Logo />
              <h2 className="text-blue-secondary text-[24px] font-bold">JOONBEE</h2>
            </div>
          </button>
          <div className="flex gap-4">
            <Alarm data={data} />
            {isLogin ? (
              <Avatar size="md" thunbnail="" />
            ) : (
              <button onClick={onClickLogin}>로그인</button>
            )}
          </div>
        </div>
      </header>
      {isOpen && (
        <ModalPortal>
          <div
            onClick={onClickOpen}
            className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
            <LoginBox />
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default Header;
