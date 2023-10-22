'use client';
import Link from 'next/link';
import React from 'react';

type CardSize = 'sm' | 'md' | 'lg';
type CardColor = 'gray' | 'navy';
interface Discription {
  first: string;
  second: string;
  third: string;
}
export interface LinkBox extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CardSize;
  color?: CardColor;
  title: string;
  subTitle?: Discription;
  propsLink: string;
}

export const LinkBox = ({
  color = 'gray',
  size = 'sm',
  propsLink = '/',
  title = 'AI면접 시작하기',
  subTitle,
  ...props
}: LinkBox) => {
  const baseStyles = `font-bold flex items-center text-[30px] shadow-md  ${
    size === 'lg' ? 'rounded-2xl ' : 'rounded-xl'
  }`;

  const sizeStyles = {
    sm: 'justify-between h-[140px] w-[584px] px-[80px]',
    md: 'justify-between h-[312px] w-[584px] pl-[80px] pr-[100px]',
    lg: 'justify-center h-[560px] w-[560px] flex-col-reverse',
  };

  const colorStyles = {
    gray: `bg-gray-light text-main-primary border-gray-normal border-2`,
    navy: 'bg-main-primary text-gray-light',
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${colorStyles[color]}`;

  return (
    <button {...props}>
      <Link href={propsLink} className={buttonStyles}>
        {size === 'lg' && (
          <div className="text-[20px]  mt-6 text-[#717171]">
            <p>{subTitle?.first}</p>
            <p>{subTitle?.second}</p>
            <p>{subTitle?.third}</p>
          </div>
        )}
        <div className={`${size === 'lg' && 'mt-10'}`}>{title}</div>
        <div>아이콘</div>
      </Link>
    </button>
  );
};
