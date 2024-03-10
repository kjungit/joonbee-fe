import React from 'react';
import Button, { ButtonProps } from '../button/button';
import { VariableIcon, VariableIconName } from '../VariableIcon';
import { Icon, IconName } from '../icon/icon';

type Icons = VariableIconName | IconName;

interface IconButtonProps extends ButtonProps {
  iconName: Icons;
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

  const variableIconNames = [
    'leftArrow',
    'emptyLike',
    'copy',
    'filledLike',
    'alarm',
    'leftArrow',
    'delete',
    'edit',
    'group',
    'fillCheckCir',
    'fillCheckRec',
    'checkRec',
  ];

  const isVariableIcon = variableIconNames.includes(iconName);
  const iconComponent = isVariableIcon ? (
    <VariableIcon name={iconName as VariableIconName} size={sizeStyles[size]} />
  ) : (
    <Icon name={iconName as IconName} className="w-4" />
  );

  return (
    <Button size={size} color={color} className={`${props.className}`}>
      <div className="flex justify-center gap-2 items-center">
        {edge === 'start' && iconComponent}
        {children}
        {edge === 'end' && iconComponent}
      </div>
    </Button>
  );
}
