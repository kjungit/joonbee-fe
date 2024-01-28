'use client';
import { BetweenBox } from '@/components/common/BetweenBox';
import { PolarChart } from '@/components/common/PolarChart';
import { Button } from '@/components/ui/Button';
import { useUserInfo } from '@/hooks/useUserInfo';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';

export default function MyProfile() {
  const { userInfo, userInfoMutate } = useUserInfo();
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const router = useRouter();
  const cookies = new Cookies();
  const onClickLogout = () => {
    cookies.remove('joonbee-token');
    router.replace('/');
    setisLogined(false);
  };

  if (!userInfo) return;
  return (
    <div className="h-full bg-white w-[280px] p-6 rounded-2xl flex flex-col items-center">
      <h3 className="text-xl font-bold w-full mb-4">프로필</h3>
      <Image
        src={userInfo?.thumbnail}
        alt={userInfo.nickName}
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="mt-4 text-xl font-bold">{userInfo?.nickName}</p>
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
