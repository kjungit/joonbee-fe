'use client';

import React from 'react';

type ButtonColor = 'darkNavy' | 'bluePrimary' | 'blueSecondary' | 'blueNormal';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type ButtonText = 'sm' | 'md' | 'lg' | 'xl';
type ButtonType = 'submit' | 'button';
export type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  type?: ButtonType;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  text?: ButtonText;
};

export const Button = ({
  color = 'bluePrimary',
  size = 'md',
  text = 'lg',
  type = 'button',
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'rounded-[8px] font-bold text-white shadow-md';

  const sizeStyles = {
    xs: 'w-[90px] h-[50px]',
    sm: 'w-[100px] h-[40px]',
    md: 'min-w-[150px] h-[60px]',
    lg: 'w-[274px] h-[60px]',
    xl: 'w-[340px] h-[50px]',
    '2xl': 'w-[500px] h-[60px]',
    '3xl': 'w-[500px] h-[80px]',
    '4xl': 'w-[536px] h-[88px]',
  };

  const textStyles = {
    sm: 'text-[16px]',
    md: 'text-[20px]',
    lg: 'text-[24px]',
    xl: 'text-[32px]',
  };

  const colorStyles = {
    darkNavy: 'bg-main-primary hover:bg-hover-primary',
    bluePrimary: 'bg-blue-primary hover:bg-hover-bluePrimary',
    blueSecondary: 'bg-blue-secondary hover:bg-hover-blueSecondary',
    blueNormal: 'bg-blue-normal hover:bg-hover-blueNormarl',
  };

  const buttonStyles = `${baseStyles} ${textStyles[text]} ${sizeStyles[size]} ${className}  ${
    disabled ? 'bg-gray-disabled cursor-not-allowed ' : colorStyles[color]
  }`;

  return (
    <button type={type} className={buttonStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
