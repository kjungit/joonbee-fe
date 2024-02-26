'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { Button } from '../../ui/Button';

export interface LinkBox extends React.HtmlHTMLAttributes<HTMLDivElement> {
  imgSrc?: string;
  nickName?: string;
  category?: string;
  questionCount?: number;
  questionSec?: number;
  onClick?: () => void;
}

export const InterviewStartBox = ({
  imgSrc = 'logo',
  nickName = 'n******',
  category = '프론트엔드',
  questionCount = 3,
  questionSec = 2,
  onClick,
}: LinkBox) => {
  const image = require(`/public/icons/${imgSrc}.png`);

  return (
    <div className="w-[380px] px-5 py-7 bg-gray-light border-2 border-gray-normal rounded-2xl flex flex-col gap-5 justify-center items-center shadow-md">
      <Image src={image} width={140} height={140} alt={`${nickName}프로필`} />
      <p className="font-bold  text-[16px]">{nickName}</p>
      <div className="flex flex-col items-center">
        <p className="font-bold text-[28px]">{category}</p>
        <p className="text-[20px] font-bold">질문 {questionCount}개</p>
      </div>
      <p className="text-[18px] font-bold">개별 질문 시간 {questionSec}초</p>
      <Button size="xl" text="md" color="bluePrimary" onClick={onClick}>
        AI 면접 시작하기
      </Button>
    </div>
  );
};
