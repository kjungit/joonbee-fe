import React from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';

import { GoBell } from 'react-icons/go';

export type IconName = 'emptyLike' | 'copy' | 'filledLike' | 'alarm' | 'close';

export type VariableIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  onClick?: () => void;
};

export const VariableIcon = ({ size = 24, name, color = 'black', onClick }: VariableIconProps) => {
  const components = {
    emptyLike: BiLike,
    filledLike: BiSolidLike,
    copy: HiOutlineClipboardDocumentList,
    alarm: GoBell,
    close: IoMdClose,
  };

  const Icon = components[name];

  return <Icon size={size} color={color} onClick={onClick} className="cursor-pointer" />;
};
