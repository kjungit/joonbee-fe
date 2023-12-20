'use client';
import React from 'react';

interface Question {
  index: number;
  questionId: string;
  questionContent: string;
}

export interface DetailQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Question;
}

export const DetailQuestionCard = ({ data }: DetailQuestionCardProps) => {
  const baseStyles =
    'flex  w-full text-[18px] text-main-primary px-[10px] py-2 items-center font-bold shadow-md rounded-xl';
  const textStyles = 'flex justify-center ';

  return (
    <li className={baseStyles}>
      <div className={`${textStyles} text-[18px]  basis-40 border-r-gray-normal border-r-2 `}>
        질문{data.index + 1}
      </div>
      <div className={`${textStyles} text-start text-[14px] w-auto px-4 overflow-x-auto `}>
        {data.questionContent}
      </div>
    </li>
  );
};
