'use client';
import React from 'react';

interface Question {
  title: string;
  question: string;
}

export interface DetailQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Question;
}

export const DetailQuestionCard = ({ data, ...props }: DetailQuestionCardProps) => {
  const baseStyles =
    'flex h-[100px] w-auto text-[18px] text-main-primary px-[10px] items-center font-bold shadow-md rounded-xl';
  const textStyles = 'flex justify-center ';
  const buttonStyles = `
  ${baseStyles}
  `;

  return (
    <div className={buttonStyles} {...props}>
      <div className={`${textStyles} text-[32px] w-[190px]`}>{data.title}</div>
      <div className="border-l-gray-normal border-l-2 h-16" />
      <div className={`${textStyles} text-[24px] ml-12`}>{data.question}</div>
    </div>
  );
};
