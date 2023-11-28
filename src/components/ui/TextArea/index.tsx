'use client';
import Image from 'next/image';
import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDisabled?: boolean;
  inputValue?: string;
  isVoice?: boolean;
  setInputValue?: (value: string) => void;
}

export const TextArea = ({
  isDisabled = false,
  inputValue = '',
  setInputValue,
  isVoice = false,
}: TextareaProps) => {
  const baseStyles = `text-[18px] border-4 border-gray-normal ${
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
    <div className="relative">
      <textarea
        readOnly
        minLength={10}
        rows={10}
        cols={20}
        className={TextAreaStyles}
        placeholder="질문을 작성해주세요."
        disabled={isDisabled}
        value={inputValue}
        onChange={onChange}></textarea>
      {isVoice && (
        // <Image
        //   height={80}
        //   width={80}
        //   src="/voice.gif"
        //   alt="voice"
        //   className="absolute right-4 bottom-4"
        // />
        <div className="voice"></div>
      )}
    </div>
  );
};
