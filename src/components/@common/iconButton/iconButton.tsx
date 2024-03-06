import React from 'react';
import Button, { ButtonProps } from '../button/button';
import { IconName, VariableIcon } from '../VariableIcon';

interface IconButtonProps extends ButtonProps {
  iconName: IconName;
  edge?: 'start' | 'end';
}

export default function IconButton({
  iconName,
  children,
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

  return (
    <Button size={size} color={color} className={`${props.className}`}>
      <div className="flex justify-center gap-2 items-center">
        {edge === 'start' && <VariableIcon name={iconName} size={sizeStyles[size]} />}
        {children}
        {edge === 'end' && <VariableIcon name={iconName} size={sizeStyles[size]} />}
      </div>
    </Button>
  );
}
