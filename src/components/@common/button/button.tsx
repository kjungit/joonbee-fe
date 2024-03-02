import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'outlined' | 'filled';
type ButtonColors = 'navy' | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  color?: ButtonColors;
  textColor?: string;
  textSize?: string;
  variant?: ButtonVariants;
}

export default function Button({
  width = 'w-auto',
  height = 'h-10',
  color = 'navy',
  textColor = 'text-white',
  textSize = 'text-base',
  variant = 'filled',
  children,
  ...props
}: ButtonProps) {
  const colorStyles = {
    navy: 'bg-main-primary ',
    white: 'bg-white',
  };

  const variantStyles = {
    outlined: `border-2 border-main-primary ${colorStyles[color]} bg-transparent `,
    filled: `${colorStyles[color]}`,
  };

  return (
    <button
      className={`${variantStyles[variant]} ${width} ${height} rounded-md ${textColor} ${textSize} ${props.className}`}
      {...props}>
      {children}
    </button>
  );
}
