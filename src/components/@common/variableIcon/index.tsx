import React from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaDeleteLeft } from 'react-icons/fa6';
import { BsFillSendFill } from 'react-icons/bs';
import { FaUserGroup } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCheckSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BsQuestionSquare } from 'react-icons/bs';

export type IconName =
  | 'emptyLike'
  | 'copy'
  | 'filledLike'
  | 'alarm'
  | 'close'
  | 'delete'
  | 'edit'
  | 'leftArrow'
  | 'send'
  | 'group'
  | 'fillCheckCir'
  | 'fillCheckRec'
  | 'checkRec'
  | 'document'
  | 'questionBox';
export type VariableIconProps = {
  name: IconName;
  size?: number;
  onClick?: () => void;
  className?: string;
};

export const VariableIcon = ({ size = 24, name, onClick, className }: VariableIconProps) => {
  const components = {
    leftArrow: MdOutlineArrowForwardIos,
    emptyLike: BiLike,
    filledLike: BiSolidLike,
    copy: HiOutlineClipboardDocumentList,
    alarm: HiOutlineBellAlert,
    close: IoMdClose,
    delete: FaDeleteLeft,
    edit: MdEdit,
    calender: MdOutlineDateRange,
    send: BsFillSendFill,
    group: FaUserGroup,
    fillCheckCir: FaCheckCircle,
    fillCheckRec: FaCheckSquare,
    checkRec: FaRegCheckSquare,
    document: IoDocumentTextOutline,
    questionBox: BsQuestionSquare,
  };

  const Icon = components[name];

  return <Icon size={size} onClick={onClick} className={`${className} cursor-pointer `} />;
};
