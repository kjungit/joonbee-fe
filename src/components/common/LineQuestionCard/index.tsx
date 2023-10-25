'use client';
import React from 'react';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';
type CardColor = 'white' | 'gray';
type FontSize = 'md' | 'lg';
type BorderPosition = 'left' | 'bottom';

export interface LineQuestrionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  color?: CardColor;
  fontSize?: FontSize;
  borderPosition?: BorderPosition;
}

export const LineQuestrionCard = ({
  color = 'white',
  size = 'sm',
  fontSize = 'md',
  borderPosition = 'left',
  children,
}: LineQuestrionCardProps) => {
  const baseStyles = 'flex p-6 items-center text-ellipsis font-bold shadow-md rounded-xl';

  const sizeStyles = {
    sm: 'h-[54px] w-[740px]',
    md: 'min-h-[104px] w-[584px]',
    lg: ' w-[1040px]',
    xl: ' w-[500px]',
  };

  const colorStyles = {
    white: 'bg-white text-main-primary',
    gray: `bg-gray-normal text-main-primary`,
  };

  const fontStyles = {
    md: 'text-[16px]',
    lg: `text-[20px]`,
  };

  const borderPositionStyles = {
    left: 'border-l-main-primary border-l-[12px]',
    bottom: `border-b-main-primary border-b-[12px]`,
  };

  const buttonStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${colorStyles[color]}
  ${fontStyles[fontSize]}
  ${borderPositionStyles[borderPosition]}
  `;

  return (
    <div className={buttonStyles}>
      <p>{children}</p>
    </div>
  );
};
