'use client';
import React from 'react';

interface BetweenBoxProps {
  first: string;
  second: string;
}

export const BetweenBox = ({ first, second }: BetweenBoxProps) => {
  return (
    <div
      className={`w-[254px] rounded-md h-[50px] bg-gray-light flex justify-between px-6 py-3 font-bold text-lg text-main-primary items-center`}>
      <p>{first}</p>
      <p>{second}</p>
    </div>
  );
};
