'use client';
import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDisabled?: boolean;
}

export const TextArea = ({ isDisabled = false }: TextareaProps) => {
  const baseStyles = `text-[18px] border-white focus:border-main-primary border-4 focus:border-4 ${
    isDisabled ? 'text-gray-disabled' : 'text-main-primary'
  } p-5 font-bold shadow-md rounded-xl`;

  const sizeStyles = 'h-[360px] w-[540px] text-4';

  const TextAreaStyles = `
  ${baseStyles} ${sizeStyles}
  `;

  return (
    <textarea
      minLength={10}
      rows={10}
      cols={20}
      className={TextAreaStyles}
      placeholder="질문을 작성해주세요."
      disabled={isDisabled}
    />
  );
};
