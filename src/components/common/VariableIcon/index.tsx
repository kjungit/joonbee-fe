import React from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

export type IconName = 'emptyLike' | 'copy' | 'filledLike';

export type VariableIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  onClick: () => void;
};

export const VariableIcon = ({ size = 24, name, color = 'black', onClick }: VariableIconProps) => {
  const components = {
    emptyLike: BiLike,
    filledLike: BiSolidLike,
    copy: HiOutlineClipboardDocumentList,
  };

  const Icon = components[name];

  return <Icon size={size} color={color} onClick={onClick} />;
};
