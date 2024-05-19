import Link from 'next/link';
import React from 'react';

type ButtonVariants = 'outlined' | 'filled';
export type ButtonColors = 'primary' | 'blue' | 'white';
type ButtonSizes = 'xs' | 'sm' | 'sm2' | 'sm3' | 'md' | 'lg' | 'xl' | '2xl' | 'auto' | 'square';

export interface LinkButtonProps {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  className?: string;
  path: string;
  children: string;
}

export default function LinkButton({
  size = 'auto',
  color = 'primary',
  variant = 'filled',
  className = '',
  path,
  children,
  ...props
}: LinkButtonProps) {
  const colorStyles = {
    primary: `bg-main-primary text-white hover:bg-hover-primary`,
    blue: `bg-blue-light text-black`,
    white: `bg-white text-black`,
  };
  const sizeStyles = {
    auto: 'w-auto px-4 py-2 md:text-[16px] text-[14px]',
    xs: 'w-[82px] h-[48px] text-[14px] shadow-md',
    sm: 'w-[118px] h-[40px] text-[14px]',
    sm2: 'w-[80px] h-[40px] text-[14px]',
    md: 'w-[142px] h-[48px] text-[14px]',
    sm3: 'w-[100px] h-[48px] text-[14px]',
    lg: 'w-[200px] h-[48px] text-[16px]',
    xl: 'w-[234px] h-[48px] text-[16px]',
    '2xl': 'w-[234px] h-[56px] text-[16px]',
    square: 'w-12 h-12',
  };
  const variantStyles = {
    outlined: `border-2 border-main-primary ${colorStyles[color]} bg-transparent cursor-pointer`,
    filled: `${colorStyles[color]}`,
  };
  return (
    <Link
      href={path}
      className={`${variantStyles[variant]} ${sizeStyles[size]} flex items-center justify-center rounded-md ${className}`}
      {...props}>
      {children}
    </Link>
  );
}
