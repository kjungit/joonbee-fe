'use client';
import Image from 'next/image';
import React from 'react';

type CardSize = 'md' | 'lg';
type Border = boolean;

export interface CategorizedQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  isFocus?: Border;
}

export const CategorizedQuestionCard = ({
  size = 'md',
  isFocus = false,
  children,
  ...props
}: CategorizedQuestionCardProps) => {
  const baseStyles =
    'flex h-[54px] text-[18px] px-[14px] justify-between items-center font-bold shadow-md rounded-xl';

  const sizeStyles = {
    md: 'w-[900px] text-[18px]',
    lg: 'w-[1100px] text-[20px]',
  };

  const textStyles = 'flex justify-center w-[170px]';

  const borderPositionStyles = 'border-main-primary border-4';
  const buttonStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${isFocus ? borderPositionStyles : 'border-white border-4'}
  `;

  return (
    <div className={buttonStyles} {...props}>
      <div className="flex">
        <div className={textStyles}>프론트엔드</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>React</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="ml-10">React Life Cycle에 대해서 설명해주세요.</div>
      </div>
      {isFocus && <div>icon</div>}
    </div>
  );
};
