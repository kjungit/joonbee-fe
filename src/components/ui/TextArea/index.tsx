'use client';
import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDisabled?: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

export const TextArea = ({ isDisabled = false, inputValue = '', setInputValue }: TextareaProps) => {
  const baseStyles = `text-[18px] border-white focus:border-main-primary border-4 focus:border-4 ${
    isDisabled ? 'text-gray-disabled' : 'text-main-primary'
  } p-5 font-bold shadow-md rounded-xl`;

  const sizeStyles = 'h-[360px] w-[540px] text-4';

  const TextAreaStyles = `
  ${baseStyles} ${sizeStyles}
  `;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setInputValue) {
      setInputValue(event.target.value);
    }
  };

  return (
    <textarea
      minLength={10}
      rows={10}
      cols={20}
      className={TextAreaStyles}
      placeholder="질문을 작성해주세요."
      disabled={isDisabled}
      value={inputValue}
      onChange={onChange}
    />
  );
};
