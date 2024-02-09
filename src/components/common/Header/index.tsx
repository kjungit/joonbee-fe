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
import NickEditModal from '../NickEditModal';
import useNickMutation from '@/hooks/useNickMutation';

const Header = () => {
  const [nickName, setNickName] = useState('');
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const [isToken, setIsToken] = useRecoilState(isTokenStatus);
  const [isSame, setIsSame] = useRecoilState(isSameStatus);
  const { isLogined, userInfo } = useUserInfo();

  const { isNickError, isDuplicate, nickTrigger } = useNickMutation({ nickName });

  const onChangeNinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onClickNickName = async () => {
    nickTrigger();
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
            {userInfo ? (
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
          <NickEditModal
            isDuplicate={isDuplicate}
            isNickError={isNickError}
            onChangeNinkName={onChangeNinkName}
            onClickNickName={onClickNickName}
          />
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
