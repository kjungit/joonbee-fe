'use client';
import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDisabled?: boolean;
}

export const TextArea = ({ isDisabled = false }: TextareaProps) => {
  const baseStyles = `text-[18px]  ${
    isDisabled ? 'text-gray-disabled' : 'text-main-primary'
  } px-[20px] font-bold shadow-md rounded-xl`;

  const sizeStyles = 'h-[360px] w-[540px] text-4';

  const buttonStyles = `
  ${baseStyles} ${sizeStyles}
  `;

  return (
    <TextArea
      minLength={10}
      rows={10}
      cols={20}
      className={buttonStyles}
      placeholder="질문을 작성해주세요."
      disabled={isDisabled}
    />
  );
};
