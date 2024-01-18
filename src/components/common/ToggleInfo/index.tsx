'use client';
import React, { useState } from 'react';

export interface ToggleInfoProps {
  title: string;
  explanation: string;
}

export const ToggleInfo = ({ title, explanation }: ToggleInfoProps) => {
  const [isClick, setIsClick] = useState(false);

  const baseStyles = `w-full lg:max-w-[480px] flex-col cursor-pointer bg-white justify-center flex border-b-main-primary border-b-[12px] font-bold shadow-md py-6 px-10  rounded-xl ${
    isClick ? 'h-auto' : 'h-[110px]'
  }`;

  return (
    <div className={baseStyles} onClick={() => setIsClick(!isClick)}>
      <p className="text-xl h-[50px] mt-2">{title}</p>
      {isClick && <p className="text-sm">{explanation}</p>}
    </div>
  );
};
