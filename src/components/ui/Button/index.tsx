'use client';

import React from 'react';

export type ButtonColor =
  | 'white'
  | 'darkNavy'
  | 'bluePrimary'
  | 'blueSecondary'
  | 'blueNormal'
  | 'blueTertiary'
  | 'darkGray'
  | 'gray';
type ButtonSize =
  | 'xs'
  | 'sm'
  | 'md'
  | '2md'
  | 'lg'
  | '2lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | 'dropdown-xs'
  | 'dropdown-sm'
  | 'dropdown-md'
  | 'setting';
type ButtonText = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  const baseStyles = 'rounded-[8px] font-bold  shadow-md';

  const sizeStyles = {
    xs: 'w-[90px] h-[50px]',
    sm: 'w-[100px] h-[40px]',
    md: 'min-w-[150px] h-[60px]',
    '2md': 'w-[180px] h-[60px]',
    lg: 'w-[274px] h-[60px]',
    '2lg': 'w-[292px] min-h-[58px]',
    xl: 'w-[340px] h-[50px]',
    '2xl': 'w-[500px] h-[60px]',
    '3xl': 'w-[500px] h-[80px]',
    '4xl': 'w-[440px] h-[60px]',
    setting: 'min-w-[110px] h-[60px]',
    'dropdown-xs': 'w-[110px] h-[44px]',
    'dropdown-sm': 'w-[114px] h-[44px]',
    'dropdown-md': 'w-[160px] h-[60px]',
  };

  const textStyles = {
    xs: 'text-[14px]',
    sm: 'text-[18px]',
    md: 'text-[20px]',
    lg: 'text-[24px]',
    xl: 'text-[32px]',
  };

  const colorStyles = {
    darkNavy: 'bg-main-primary hover:bg-hover-primary text-white',
    bluePrimary: 'bg-blue-primary hover:bg-hover-bluePrimary text-white',
    blueSecondary: 'bg-blue-secondary hover:bg-hover-blueSecondary text-white',
    blueTertiary: 'bg-blue-tertiary hover:bg-hover-blueTertiary text-white',
    blueNormal: 'bg-blue-normal hover:bg-hover-blueNormarl text-white',
    white: 'bg-white hover:bg-gray-light text-main-primary',
    darkGray: 'bg-gray-dark  text-white',
    gray: 'bg-gray-normal hover:bg-gray-dark text-white',
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
