'use client';

import React from 'react';

type ButtonColor = 'darkNavy' | 'bluePrimary' | 'blueSecondary' | 'blueNormal';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type ButtonText = 'sm' | 'md' | 'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  text?: ButtonText;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button = ({
  color = 'bluePrimary',
  size = 'md',
  text = 'md',
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'rounded-[8px] font-bold text-white shadow-md';

  const sizeStyles = {
    xs: 'w-[90px] h-[50px]',
    sm: 'w-[100px] h-[40px]',
    md: 'w-[150px] h-[60px]',
    lg: 'w-[280px] h-[60px]',
    xl: 'w-[340px] h-[50px]',
    '2xl': 'w-[500px] h-[60px]',
    '3xl': 'w-[280px] h-[80px]',
    '4xl': 'w-[536px] h-[88px]',
  };

  const colorStyles = {
    darkNavy: 'bg-main-primary hover:bg-hover-primary',
    bluePrimary: 'bg-blue-primary hover:bg-hover-bluePrimary',
    blueSecondary: 'bg-blue-secondary hover:bg-hover-blueSecondary',
    blueNormal: 'bg-blue-normal hover:bg-hover-blueNormarl',
  };

  const textStyles = {
    sm: 'text-[14px]',
    md: 'text-[24px]',
    lg: 'text-[32px]',
  };

  const buttonStyles = `${baseStyles} ${textStyles[text]} ${sizeStyles[size]}  ${
    disabled ? 'bg-gray-disabled cursor-not-allowed ' : colorStyles[color]
  }`;

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
