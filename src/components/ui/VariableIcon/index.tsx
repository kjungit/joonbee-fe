import React from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export type IconName = 'emptyLike' | 'copy' | 'filledLike' | 'alarm' | 'close' | 'delete';

export type VariableIconProps = {
  name: IconName;
  size?: number;
  onClick?: () => void;
  style?: string;
};

export const VariableIcon = ({ size = 24, name, onClick, style }: VariableIconProps) => {
  const components = {
    emptyLike: BiLike,
    filledLike: BiSolidLike,
    copy: HiOutlineClipboardDocumentList,
    alarm: HiOutlineBellAlert,
    close: IoMdClose,
    delete: RiDeleteBin6Fill,
  };

  const Icon = components[name];

  return (
    <Icon
      size={size}
      onClick={onClick}
      className={`${style} cursor-pointer hover:text-gray-disabled`}
    />
  );
};
