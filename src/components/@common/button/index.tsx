import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'outlined' | 'filled';
export type ButtonColors = 'primary' | 'blue' | 'white';
type ButtonSizes = 'xs' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl' | 'auto';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  size = 'auto',
  color = 'primary',
  variant = 'filled',
  className = '',
  onClick,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const colorStyles = {
    primary: `bg-main-primary text-white hover:bg-hover-primary`,
    blue: `bg-blue-light text-black`,
    white: `bg-white text-black`,
  };

  const sizeStyles = {
    auto: 'w-auto px-4 py-2',
    xs: 'w-[82px] h-[48px] text-[14px] shadow-md',
    sm: 'w-[120px] h-[40px] text-[14px]',
    sm2: 'w-[80px] h-[40px] text-[14px]',
    md: 'w-[142px] h-[48px] text-[16px]',
    lg: 'w-[200px] h-[48px] text-[16px]',
    xl: 'w-[234px] h-[48px] text-[16px]',
  };

  const variantStyles = {
    outlined: `border-2 border-main-primary ${colorStyles[color]} bg-transparent cursor-pointer`,
    filled: `${colorStyles[color]}`,
  };

  const buttonStyles = disabled
    ? `bg-gray-disabled text-white cursor-not-allowed`
    : `${variantStyles[variant]}`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${buttonStyles} ${sizeStyles[size]} rounded-md ${className}`}
      {...props}>
      {children}
    </button>
  );
}
