import React from 'react';
import Image from 'next/image';
import LogoPic from '/public/icons/logo.png';

export interface LogoProps {
  size?: 'sm' | 'md';
}

export const Logo = ({ size = 'sm' }: LogoProps) => {
  const sizeStyles = {
    sm: 30,
    md: 120,
  };

  return <Image src={LogoPic} alt="Logo" width={sizeStyles[size]} height={sizeStyles[size]} />;
};
