'use client';
import Image from 'next/image';
import React from 'react';

type CardSize = 'md' | 'lg';
type Border = boolean;
interface Question {
  title: string;
  subTitle: string;
  question: string;
}

export interface CategorizedQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  isFocus?: Border;
  data: Question;
}

export const CategorizedQuestionCard = ({
  size = 'md',
  isFocus = false,
  data,
  ...props
}: CategorizedQuestionCardProps) => {
  const baseStyles =
    'flex h-[54px] text-[18px] px-[10px] justify-between items-center font-bold shadow-md rounded-xl';

  const sizeStyles = {
    md: 'w-[900px] text-[18px]',
    lg: 'w-[1100px] text-[20px]',
  };

  const textStyles = 'flex justify-center w-[190px]';

  const borderPositionStyles = 'border-main-primary border-4';
  const buttonStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${isFocus ? borderPositionStyles : 'border-white border-4'}
  `;

  return (
    <div className={buttonStyles} {...props}>
      <div className="flex">
        <div className={textStyles}>{data.title}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>{data.subTitle}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="ml-10">{data.question}</div>
      </div>
      {isFocus && <div>icon</div>}
    </div>
  );
};
