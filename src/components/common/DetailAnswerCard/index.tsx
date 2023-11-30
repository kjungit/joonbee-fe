'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';

export interface DetailAnswerCardProps {
  question: string;
  answer: string;
  onClick: () => void;
}

export const DetailAnswerCard = ({ question, answer, onClick }: DetailAnswerCardProps) => {
  const baseStyles =
    'flex p-6 h-[160px] w-[400px] z-10 border-l-main-primary border-l-[12px] flex-col font-bold shadow-md rounded-xl';

  return (
    <div className="relative h-[160px] w-[400px] shadow-md">
      <div className="absolute h-[160px] w-[380px] top-0 right-0 z-20 bg-gradient-to-t from-white to-white/0 rounded-xl "></div>
      <div className="absolute">
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
