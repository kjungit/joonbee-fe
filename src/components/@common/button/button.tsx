import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'outlined' | 'filled';
export type ButtonColors = 'primary' | 'blue' | 'white' | 'disabled';
type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  className?: string;
}

export default function Button({
  size = 'auto',
  color = 'primary',
  variant = 'filled',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const colorStyles = {
    primary: `bg-main-primary text-white hover:bg-hover-primary`,
    blue: `bg-blue-light text-black`,
    white: `bg-white text-black`,
    disabled: `bg-gray-disabled text-white cursor-not-allowed`,
  };

  const sizeStyles = {
    auto: 'w-auto px-4 py-2',
    xs: 'w-[82px] h-[48px] text-[14px] shadow-md',
    sm: 'w-[120px] h-[40px] text-[14px]',
    md: 'w-[142px] h-[48px] text-[16px]',
    lg: 'w-[200px] h-[48px] text-[16px]',
    xl: 'w-[234px] h-[48px] text-[18px]',
  };

  const variantStyles = {
    outlined: `border-2 border-main-primary ${colorStyles[color]} bg-transparent`,
    filled: `${colorStyles[color]}`,
  };

  const buttonStyles = props.disabled
    ? colorStyles['disabled']
    : `${colorStyles[color]} cursor-pointer`;

  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-md ${buttonStyles} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
