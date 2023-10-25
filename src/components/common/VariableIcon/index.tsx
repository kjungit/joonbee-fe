import React from 'react';
import { GoThumbsup } from 'react-icons/go';
import { IoMdCopy } from 'react-icons/io';

export type IconName = 'like' | 'copy';

export type VariableIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  onClick: () => void;
};

export const VariableIcon = ({ size = 24, name, color = 'black', onClick }: VariableIconProps) => {
  const components = {
    like: GoThumbsup,
    copy: IoMdCopy,
  };

  const Icon = components[name];

  return <Icon size={size} color={color} onClick={onClick} />;
};
