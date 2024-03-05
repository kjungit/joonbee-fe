import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'outlined' | 'filled';
type ButtonColors = 'primary' | 'white' | 'disabled';
type ButtonSizes = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
}

export default function Button({
  size = 'md',
  color = 'primary',
  variant = 'filled',
  children,
  ...props
}: ButtonProps) {
  const colorStyles = {
    primary: `bg-main-primary text-white hover:bg-hover-primary`,
    white: `bg-white text-black`,
    disabled: `bg-gray-disabled text-white cursor-not-allowed`,
  };

  const sizeStyles = {
    sm: 'w-[82px] h-[48px]',
    md: 'w-[142px] h-[48px]',
    lg: 'w-[234px] h-[48px]',
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
      className={`${variantStyles[variant]} ${sizeStyles[size]} shadow-md rounded-md ${buttonStyles} ${props.className}`}
      {...props}>
      {children}
    </button>
  );
}
