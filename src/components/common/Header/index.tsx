'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import Alarm from '../Alarm';
import { Avatar } from '@/components/ui/Avartar';
import { alarmData } from '@/constants/alarm';
import ModalPortal from '@/components/ui/ModalPortal';
import { LoginBox } from '../LoginBox';
import { Button } from '@/components/ui/Button';
import { postNickName } from '@/app/apis/services/auth';
import { useRecoilState } from 'recoil';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import useSWRMutation from 'swr/mutation';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { useUserInfo } from '@/hooks/useUserInfo';
import { isRefreshStatus } from '@/recoil/isRefresh/atoms';
import { isLoginedStatus } from '@/recoil/isLogined/atom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nickName, setNickName] = useState('');
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const [isRefresh, setIsRefresh] = useRecoilState(isRefreshStatus);
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);
  const [isNickError, setIsError] = useState(false);
  const { userInfo } = useUserInfo();

  const { error: nickError, trigger } = useSWRMutation(
    '/auth/login/nick',
    () => postNickName({ id: isTokened.id, nickName }),
    {
      onSuccess: () => {
        setIsTokened({
          ...isTokened,
          isLogined: false,
        });
      },
      onError: error => {
        setIsError(true);
      },
      revalidate: false,
    },
  );

  const data = alarmData;

  const onClickLogin = () => {
    setIsOpen(!isOpen);
  };

  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onChangeNinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onClickNickName = async () => {
    trigger();
  };

  const onClickReLogin = async () => {
    setIsRefresh(false);
  };

  return (
    <>
      <header className="w-screen z-50 h-[60px] shadow-sm flex justify-center items-center bg-white">
        <div className="max-w-[1024px] p-5  w-full flex justify-between items-center">
          <Link href="/">
            <div className="flex gap-3 items-center">
              <Logo />
              <h2 className="text-blue-secondary text-[24px] font-bold">JOONBEE</h2>
            </div>
          </Link>
          <div className="flex gap-4 ">
            <Alarm data={data} />
            {isLogined ? (
              <Link href="/my?category=interview&sort=my_interview">
                {userInfo && <Avatar size="md" thumbnail={userInfo.data.thumbnail} />}
              </Link>
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
      {isTokened.isLogined && (
        <ModalPortal>
          <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
            <div className="w-[390px]  h-[380px] rounded-[50px] bg-white shadow-md">
              <div className="flex flex-col gap-[26px] items-center justify-center p-[30px]">
                <Logo size={'md'} />
                <h3 className="text-[#4149A6] text-2xl font-bold">닉네임을 작성해주세요.</h3>
                <div className="flex flex-col gap-2 relative">
                  <p className="absolute top-[-22px] text-[red] text-sm h-4">
                    {isNickError && '중복된 닉네임입니다.'}
                  </p>
                  <form action="" className="flex gap-[12px] flex-col">
                    <div className="outline-none  w-[292px] h-[54px] shadow-md rounded-xl">
                      <input
                        onChange={onChangeNinkName}
                        className={`w-[292px] h-[54px] border-2 border-white px-6 rounded-xl text-xl font-bold
                        ${nickError && 'border-2 border-[red]'}`}
                        type="text"
                      />
                    </div>
                    <Button size="2lg" onClick={onClickNickName}>
                      등록
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      {isRefresh && (
        <ModalPortal>
          <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
            <div className="w-[390px] h-[380px] flex items-center justify-center rounded-[50px] bg-white shadow-md">
              <div className="flex flex-col gap-[26px] items-center justify-center p-[30px]">
                <Logo size={'md'} />
                <div className="flex flex-col items-center">
                  <h3 className="text-[#4149A6] text-2xl font-bold">로그인을 다시 해주세요.</h3>
                  <p className="text-status-alert font-bold">사용자 정보를 확인할 수 없어요.</p>
                </div>
                <div className="flex flex-col gap-2 relative">
                  <Button size="2lg" onClick={onClickReLogin}>
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default Header;
