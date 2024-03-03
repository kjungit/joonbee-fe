'use client';
import React from 'react';
import { Button } from '../../ui/Button';

export interface DetailAnswerCardProps {
  question: string;
  answer: string;
  onClick: () => void;
}

export const DetailAnswerCard = ({ question, answer, onClick }: DetailAnswerCardProps) => {
  const baseStyles =
    'flex p-6 h-[140px] w-full z-10 border-l-main-primary border-l-[12px] flex-col font-bold shadow-md rounded-xl';

  return (
    <div className="relative h-[140px] w-full max-w-[590px] shadow-md rounded-xl">
      <div className="absolute h-[140px] w-[96%] right-0 top-0 rounded-xl z-20 bg-gradient-to-t from-white to-white/0  "></div>
      <div className="absolute w-full ">
        <div className={baseStyles}>
          <p className="text-md ">질문 1</p>
          <p className="text-sm">{question}</p>
          <p className="text-md mt-2">답변</p>
          <p className="text-sm truncate w-[360px]">{answer}</p>
        </div>
      </div>
      <div className="absolute z-30 right-5 bottom-6">
        <Button text="sm" size="sm" color="darkNavy" onClick={onClick}>
          자세히보기
        </Button>
      </div>
    </div>
  );
};
