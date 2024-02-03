'use client';
import React from 'react';

type DetailQuestionCardProps = {
  question: string;
  questionCount: number;
  onClick?: () => void;
  isBorderAlert?: boolean;
};

export const DetailQuestionCard = ({
  question,
  questionCount,
  onClick,
  isBorderAlert,
}: DetailQuestionCardProps) => {

  const baseStyles = `xs:justify-normal justify-center flex min-h-[48px] text-[18px] bg-white
     text-main-primary px-[10px] items-center font-bold shadow-md rounded-xl
    cursor-pointer border-4 hover:border-4 hover:border-main-primary
    ${isBorderAlert ? 'border-status-alert' : 'border-white'}`;

  return (
    <div className={baseStyles} onClick={onClick}>
      <div className={`flex justify-center text-[16px] min-w-[100px] w-full max-w-[150px]`}>
        질문 {questionCount}
      </div>
      <div className="border-l-gray-normal border-l-2 h-3/4 hidden xs:flex" />
      <div
        className={`text-[16px] ml-12 hidden xs:block  break-words whitespace-nowrap overflow-hidden text-ellipsis`}>
        {question}
      </div>
    </div>
  );
};
