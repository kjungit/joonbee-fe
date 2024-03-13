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
import { BsQuestionSquare } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuCalendarCheck } from 'react-icons/lu';
import { GoTriangleRight } from 'react-icons/go';

import { VariableIconName } from '@/types';

export interface VariableIconProps {
  name: VariableIconName;
  size?: number;
  onClick?: () => void;
  className?: string;
}

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
    questionBox: BsQuestionSquare,
    document: IoDocumentTextOutline,
    calendar: LuCalendarCheck,
    tringleRight: GoTriangleRight,
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
