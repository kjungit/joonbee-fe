'use client';
import React, { useState } from 'react';
import { Avatar } from '../../ui/Avartar';
import ModalPortal from '../../ui/ModalPortal';
import { useRecoilState } from 'recoil';
import { isNickNameStatus } from '../../../recoil/isNickNameStatus/atoms';

import Link from 'next/link';
import { useUserInfo } from '../../../hooks/useUserInfo';
import ModalAlert from '../ModalAlert';
import { isSameStatus } from '../../../recoil/isSame/atoms';
import NickEditModal from '../NickEditModal';
import useNickMutation from '../../../hooks/useNickMutation';
import { isLoginedStatus } from '../../../recoil/isLogined/atom';
import { isTokenStatus } from '../../../recoil/isToken/atoms';

const Header = () => {
  const [nickName, setNickName] = useState('');
  const [nickNameStatus, setNickNameStatus] = useRecoilState(isNickNameStatus);
  const [isToken, setIsToken] = useRecoilState(isTokenStatus);
  const [isSame, setIsSame] = useRecoilState(isSameStatus);
  const { userInfo } = useUserInfo();
  const { isDuplicate, nickTrigger } = useNickMutation({
    userId: nickNameStatus.id,
    nickName,
  });
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const onChangeNinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onClickNickName = async () => {
    nickTrigger();
  };

  return (
    <>
      <header className="w-screen sticky top-0 z-50 h-[60px] shadow-sm flex justify-center items-center bg-white">
        <div className="max-w-[1024px] p-5  w-full flex justify-between items-center">
          <Link href="/">
            <div className="flex gap-3 items-center">
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

      {nickNameStatus.isNickStatus && (
        <ModalPortal>
          <NickEditModal
            isDuplicate={isDuplicate}
            onChangeNinkName={onChangeNinkName}
            onClickNickName={onClickNickName}
          />
        </ModalPortal>
      )}
      {isToken && (
        <ModalAlert
          title="로그인이 필요합니다."
          subTitle="로그인 후 질문을 저장해보세요!"
          onClose={() => setIsToken(false)}
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
