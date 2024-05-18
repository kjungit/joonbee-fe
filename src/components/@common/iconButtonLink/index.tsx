import React from 'react';
import Button, { ButtonColors, ButtonSizes } from '../button';
import { IconName, IconType, VariableIconName } from '@/types';
import { Icon } from '../icon';
import { VariableIconList } from '@/constants/icon';
import { VariableIcon } from '../variableIcon';
import Link from 'next/link';

interface IconButtonLinkProps {
  iconName: IconType;
  edge?: 'start' | 'end';
  size?: ButtonSizes;
  path: string;
  disabled?: boolean;
  className?: string;
  children: string;
  color?: ButtonColors;
}

export default function IconButtonLink({
  iconName,
  size = 'auto',
  color = 'primary',
  edge = 'start',
  className,
  children,
  path,
  ...props
}: IconButtonLinkProps) {
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
  const colorStyles = {
    primary: `bg-main-primary text-white hover:bg-hover-primary`,
    blue: `bg-blue-light text-black`,
    white: `bg-white text-black`,
  };

  const isVariableIcon = VariableIconList.includes(iconName as any);
  const iconComponent = isVariableIcon ? (
    <VariableIcon name={iconName as VariableIconName} size={20} className="md:w-5 w-[14px]" />
  ) : (
    <Icon name={iconName as IconName} className="w-5" />
  );

  return (
    <Link
      href={path}
      color={color}
      className={`${className} ${colorStyles[color]} ${sizeStyles[size]} rounded-md flex items-center justify-center`}>
      <div className="flex justify-center gap-2 items-center">
        {edge === 'start' && iconComponent}
        {children}
        {edge === 'end' && iconComponent}
      </div>
    </Link>
  );
}
