'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/Button';

export interface LinkBox extends React.HtmlHTMLAttributes<HTMLDivElement> {
  imgSrc?: string;
  nickName?: string;
  category?: string;
  questionCount?: number;
  questionMin?: number;
}

export const InterviewStartBox = ({
  imgSrc = 'logo',
  nickName = 'n******',
  category = '프론트엔드',
  questionCount = 3,
  questionMin = 2,
}: LinkBox) => {
  const router = useRouter();

  const image = require(`/public/icons/${imgSrc}.png`);

  const baseStyles = `font-bold flex items-center text-[30px] shadow-md`;
  const buttonStyles = `${baseStyles} `;

  const onNavigate = () => {
    router.push('/interview/progress');
  };

  return (
    <div className="w-[564px] h-[580px] bg-gray-light border-2 border-gray-normal rounded-3xl flex flex-col justify-center items-center">
      <Image src={image} width={172} height={172} alt={`${nickName}프로필`} />
      <p className="font-bold mt-3">{nickName}</p>
      <p className="mt-4 text-4xl font-bold">{category}</p>
      <p className="mt-2 text-2xl font-bold">질문 {questionCount}개</p>
      <p className="mt-5 text-2xl mb-10 font-bold">개별 질문 시간 {questionMin}분</p>
      <Button size="2xl" text="lg" color="bluePrimary" onClick={onNavigate}>
        AI 면접 시작하기
      </Button>
    </div>
  );
};
