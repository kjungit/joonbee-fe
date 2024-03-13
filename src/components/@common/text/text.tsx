'use client';
import React from 'react';
export type TextColor = '' | 'lightGray' | 'gray' | 'darkGray' | 'black' | 'white' | 'red';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
type TextWeight = 'sm' | 'md' | 'lg';
type TextAs = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextProps = {
  as?: TextAs;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  children: React.ReactNode;
  className?: string;
};
export const Text = ({
  color = '',
  as: Typography = 'p',
  size = 'md',
  weight = 'md',
  children,
  className = '',
}: TextProps) => {
  const textStyles = {
    xs: 'text-[8px]',
    sm: 'text-[10px]',
    md: 'text-[12px]',
    lg: 'text-[14px]',
    xl: 'text-[16px]',
    '2xl': 'text-[20px]',
    '4xl': 'text-[32px]',
  };
  const textWeight = {
    sm: 'font-light',
    md: 'font-medium',
    lg: 'font-bold',
  };
  const colorStyles = {
    '': '',
    lightGray: 'text-gray-light',
    gray: 'text-gray-primary',
    darkGray: 'text-gray-dark',
    white: 'text-white',
    black: 'text-black',
    red: 'text-status-alert',
  };
  const styles = `${textStyles[size]} ${textWeight[weight]} ${colorStyles[color]} ${className}`;
  return <Typography className={styles + ' break-keep'}>{children}</Typography>;
};
