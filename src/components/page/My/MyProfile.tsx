'use client';
import { getLogout } from '@/app/apis/services/auth';
import { BetweenBox } from '@/components/common/BetweenBox';
import NickEditModal from '@/components/common/NickEditModal';
import { PolarChart } from '@/components/common/PolarChart';
import { Button } from '@/components/ui/Button';
import ModalPortal from '@/components/ui/ModalPortal';
import { VariableIcon } from '@/components/ui/VariableIcon';
import useNickMutation from '@/hooks/useNickMutation';
import { useUserInfo } from '@/hooks/useUserInfo';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import useSWRMutation from 'swr/mutation';

export default function MyProfile() {
  const { userInfo, userInfoMutate } = useUserInfo();
  const [nickName, setNickName] = useState('');
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);
  const [isEdit, setIsEdit] = useState(false);
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);

  const { trigger } = useSWRMutation('/logout', getLogout);

  const router = useRouter();

  const onClickLogout = () => {
    trigger();
    router.replace('/');
    setisLogined(false);
  };

  if (!userInfo) return;
  return (
    <div className="h-auto bg-white w-[280px] p-6 rounded-2xl flex flex-col items-center">
      <h3 className="text-xl font-bold w-full mb-4">프로필</h3>
      <Image
        src={userInfo?.thumbnail}
        alt={userInfo.nickName}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="mt-4 flex flex-col items-center">
        <div className="flex gap-1">
          <p className=" text-xl font-bold">{userInfo?.nickName}</p>
          <button
            onClick={() => {
              setIsTokened({
                ...isTokened,
                id: userInfo.id,
                isLogined: true,
              });
            }}>
            <VariableIcon name="edit" size={20} />
          </button>
        </div>
        <p className="text-sm ">{userInfo?.email && userInfo?.email}</p>
      </div>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
      <div className="flex flex-col gap-4 w-full">
        <BetweenBox first="면접 수" second={userInfo?.interviewCount} />
        <BetweenBox first="질문 수" second={userInfo?.questionCount} />
      </div>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
      <p className="text-xl font-bold pb-2 w-full">내 면접 질문 통계</p>
      <PolarChart data={userInfo.categoryInfo} />
      <div className="justify-end flex w-full">
        <Button size="2xs" text="xs" color="red" onClick={onClickLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}
