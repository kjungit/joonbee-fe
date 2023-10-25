'use client';

import React from 'react';

type ButtonColor = 'dark' | 'light' | 'blue';
type ButtonText = 'sm' | 'md';
type ButtonSize = 'sm' | 'md';

export interface RadiusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  text: ButtonText;
  size: ButtonSize;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const RadiusButton = ({
  color = 'dark',
  text = 'md',
  size = 'sm',
  children,
  onClick,
  disabled = false,
  ...props
}: RadiusButtonProps) => {
  const baseStyles = 'rounded-[74px] font-bold text-[30px] text-white shadow-md';

  const colorStyles = {
    dark: 'bg-main-primary hover:bg-hover-primary',
    light: 'bg-gray-light hover:bg-hover-grayLight text-black',
    blue: 'bg-blue-secondary hover:bg-hover-blueSecondary',
  };

  const textStyles = {
    sm: 'text-[20px]',
    md: 'text-[30px]',
  };

  const sizeStyles = {
    sm: 'w-[250px] h-[88px]',
    md: 'w-[590px] h-[80px]',
  };

  const buttonStyles = `${baseStyles} ${textStyles[text]} ${sizeStyles[size]} ${
    disabled ? 'bg-gray-disabled cursor-not-allowed ' : colorStyles[color]
  }`;

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
