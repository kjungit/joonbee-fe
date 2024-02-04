'use client';
import React, { useEffect, useState } from 'react';
import { Avatar } from '@/components/ui/Avartar';
import ModalPortal from '@/components/ui/ModalPortal';
import { Button } from '@/components/ui/Button';
import { postNickName } from '@/app/apis/services/auth';
import { useRecoilState } from 'recoil';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import useSWRMutation from 'swr/mutation';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { useUserInfo } from '@/hooks/useUserInfo';
import ModalAlert from '../ModalAlert';
import { isTokenStatus } from '@/recoil/isToken/atoms';
import { isSameStatus } from '@/recoil/isSame/atoms';

const Header = () => {
  const [nickName, setNickName] = useState('');
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const [isToken, setIsToken] = useRecoilState(isTokenStatus);
  const [isSame, setIsSame] = useRecoilState(isSameStatus);
  const [isNickError, setIsError] = useState(false);
  const { isLogined, userInfo, userInfoMutate } = useUserInfo();

  const { error: nickError, trigger } = useSWRMutation(
    '/auth/login/nick',
    () => postNickName({ id: isTokened.id, nickName }),
    {
      onSuccess: () => {
        setIsTokened({
          ...isTokened,
          isLogined: false,
        });
        userInfoMutate();
      },
      onError: error => {
        setIsError(true);
      },
      revalidate: false,
    },
  );

  const onChangeNinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onClickNickName = async () => {
    trigger();
  };

  const onClickReLogin = async () => {
    setIsToken(false);
  };

  useEffect(() => {
    if (userInfo?.nickName === '') {
      setIsTokened({
        ...isTokened,
        id: userInfo.id,
        isLogined: true,
      });
    }
  }, [userInfo, isLogined]);

  return (
    <>
      <header className="w-screen sticky top-0 z-50 h-[60px] shadow-sm flex justify-center items-center bg-white">
        <div className="max-w-[1024px] p-5  w-full flex justify-between items-center">
          <Link href="/">
            <div className="flex gap-3 items-center">
              <Logo />
              <h2 className="text-blue-secondary text-[24px] font-bold">JOONBEE</h2>
            </div>
          </Link>
          <div className="flex gap-4 ">
            {/* <Alarm data={data} /> */}
            {isLogined ? (
              <Link href="/my?category=interview&sort=my_interview">
                {userInfo && <Avatar size="md" thumbnail={userInfo.thumbnail} />}
              </Link>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </div>
        </div>
      </header>

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
      {isToken && (
        <ModalAlert
          title="로그인이 필요합니다."
          subTitle="로그인 후 질문을 저장해보세요!"
          onClose={onClickReLogin}
        />
      )}
      {isSame && (
        <ModalAlert
          title="중복된 질문입니다."
          subTitle="현재 장바구니에 같은 질문이 있어요!"
          onClose={() => setIsSame(false)}
        />
      )}
    </>
  );
};

export default Header;
