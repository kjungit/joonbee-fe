'use client';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
}

export const Input = ({ isDisabled = false }: InputProps) => {
  const baseStyles = `text-[18px]   ${isDisabled ? 'text-gray-disabled' : 'text-main-primary'}
   px-[10px] font-bold shadow-md rounded-xl `;

  const sizeStyles = 'h-[60px] w-[570px] flex text-5 items-center';

  const buttonStyles = `
  ${baseStyles} ${sizeStyles}
  `;

  return (
    <input className={buttonStyles} placeholder="질문을 작성해주세요." disabled={isDisabled} />
  );
};
