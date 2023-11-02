'use client';
import React from 'react';
import { Button } from '../Button';

export interface DetailAnswerCardProps {
  question: string;
  answer: string;
}

export const DetailAnswerCard = ({ question, answer }: DetailAnswerCardProps) => {
  const baseStyles =
    'flex p-6 h-[200px] w-[540px] z-10 border-l-main-primary border-l-[12px] flex-col font-bold shadow-md rounded-xl';

  return (
    <div className="relative h-[200px] w-[540px]">
      <div className="absolute h-[200px] w-[520px] top-0 right-0 z-20 bg-gradient-to-t from-white to-white/0 rounded-xl "></div>
      <div className="absolute">
        <div className={baseStyles}>
          <p className="text-lg ">질문 1</p>
          <p>{question}</p>
          <p className="text-lg mt-4">답변</p>
          <p className="truncate w-[360px]">{answer}</p>
        </div>
      </div>
      <div className="absolute z-30 right-5 bottom-6">
        <Button text="sm" size="sm" color="darkNavy" onClick={() => {}}>
          자세히보기
        </Button>
      </div>
    </div>
  );
};
