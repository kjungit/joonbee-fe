import React from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';

export type IconName = 'emptyLike' | 'copy' | 'filledLike' | 'alarm' | 'close' | 'delete' | 'edit';

export type VariableIconProps = {
  name: IconName;
  size?: number;
  onClick?: () => void;
  className?: string;
};

export const VariableIcon = ({ size = 24, name, onClick, className }: VariableIconProps) => {
  const components = {
    emptyLike: BiLike,
    filledLike: BiSolidLike,
    copy: HiOutlineClipboardDocumentList,
    alarm: HiOutlineBellAlert,
    close: IoMdClose,
    delete: RiDeleteBin6Fill,
    edit: MdEdit,
  };

  const Icon = components[name];

  return (
    <Icon
      size={size}
      onClick={onClick}
      className={`${className} cursor-pointer hover:text-gray-disabled`}
    />
  );
};
