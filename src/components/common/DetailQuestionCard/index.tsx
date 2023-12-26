'use client';
import React from 'react';

type DetailQuestionCardProps = {
  question: string;
  questionCount: number;
  onClick?: () => void;
};

export const DetailQuestionCard = ({
  question,
  questionCount,
  onClick,
}: DetailQuestionCardProps) => {
  const baseStyles =
    'flex h-[48px] text-[18px] text-main-primary px-[10px] items-center font-bold shadow-md rounded-xl cursor-pointer';
  const textStyles = 'flex justify-center ';

  return (
    <div className={baseStyles} onClick={onClick}>
      <div className={`${textStyles} text-[16px] w-[190px]`}>질문 {questionCount}</div>
      <div className="border-l-gray-normal border-l-2 h-[48px]" />
      <div className={`${textStyles} text-[16px] ml-12`}>{question}</div>
    </div>
  );
};
