'use client';
import React from 'react';

type CardSize = 'sm' | 'md' | 'lg';
type CardColor = 'white' | 'gray' | 'navy';

export interface QuestrionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CardSize;
  color?: CardColor;
}

export const QuestrionCard = ({ color = 'white', size = 'sm', children }: QuestrionCardProps) => {
  const baseStyles = 'flex items-center font-bold pl-5 shadow-md rounded-xl';

  const sizeStyles = {
    sm: 'h-[42px] w-[354px] text-[14px]',
    md: 'h-[52px] w-[584px] ',
    lg: 'h-[68px] w-[556px] text-[16px]',
  };

  const colorStyles = {
    white: 'bg-white text-main-primary',
    gray: `bg-gray-normal text-main-primary`,
    navy: 'bg-main-primary text-gray-normal',
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${colorStyles[color]}`;

  return <button className={buttonStyles}>{children}</button>;
};
