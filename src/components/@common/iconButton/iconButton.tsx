import React from 'react';
import Button, { ButtonProps } from '../button/button';
import { IconName, IconType, VariableIconName } from '@/types';
import { Icon } from '../icon/icon';
import { VariableIconList } from '@/constants/icon';
import { VariableIcon } from '../variableIcon/variableIcon';

type Icons = VariableIconName | IconName;

interface IconButtonProps extends ButtonProps {
  iconName: IconType;
  edge?: 'start' | 'end';
  onClick?: () => void;
}

export default function IconButton({
  iconName,
  children,
  onClick,
  size = 'auto',
  color = 'primary',
  edge = 'start',
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    auto: 14,
    xs: 14,
    sm: 14,
    md: 16,
    lg: 16,
    xl: 18,
  };

  const isVariableIcon = VariableIconList.includes(iconName as any);
  const iconComponent = isVariableIcon ? (
    <VariableIcon name={iconName as VariableIconName} size={sizeStyles[size]} />
  ) : (
    <Icon name={iconName as IconName} className="w-4" />
  );

  return (
    <Button size={size} color={color} className={`${props.className}`} onClick={onClick}>
      <div className="flex justify-center gap-2 items-center">
        {edge === 'start' && iconComponent}
        {children}
        {edge === 'end' && iconComponent}
      </div>
    </Button>
  );
}
