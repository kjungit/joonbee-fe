'use client';
import { BetweenBox } from '@/components/common/BetweenBox';
import { PolarChart } from '@/components/common/PolarChart';
import { useUserInfo } from '@/hooks/useUserInfo';
import Image from 'next/image';
import React from 'react';

export default function MyProfile() {
  const { userInfo } = useUserInfo();
  if (!userInfo) return;
  return (
    <div className="h-full bg-white w-[280px] p-6  rounded-2xl flex flex-col items-center">
      <h3 className="text-xl font-bold w-full mb-4">프로필</h3>
      <Image
        src={userInfo?.data.thumbnail}
        alt={userInfo.data.nickName}
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="mt-4 text-xl font-bold">{userInfo?.data.nickName}</p>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
      <div className="flex flex-col gap-4 w-full">
        <BetweenBox first="면접 수" second={userInfo?.data.interviewCount} />
        <BetweenBox first="질문 수" second={userInfo?.data.questionCount} />
      </div>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
      <p className="text-xl font-bold pb-2 w-full">내 면접 질문 통계</p>
      <PolarChart data={userInfo.data.categoryInfo} />
    </div>
  );
}
