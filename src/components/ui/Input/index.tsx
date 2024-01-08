'use client';
import React, { useState } from 'react';

export type InputProps = {
  isDisabled?: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  size?: 'sm' | 'md';
};

export const Input = ({
  isDisabled = false,
  inputValue,
  setInputValue,
  size = 'md',
}: InputProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const baseStyles = `flex text-5 items-center ${
    isDisabled ? 'text-gray-disabled' : 'text-main-primary'
  }
   px-5 font-bold shadow-md rounded-lg focus:border-main-primary border-4 border-white`;

  const sizeStyles = {
    md: 'h-[60px] w-full text-[18px]',
    sm: 'h-[50px] w-full text-[18px]',
  };

  const inputStyles = `${baseStyles} ${sizeStyles[size]}`;

  return (
    <input
      onChange={onChange}
      value={inputValue}
      className={inputStyles}
      placeholder="질문을 작성해주세요."
      disabled={isDisabled}
    />
  );
};
