'use client';
import React from 'react';
import { VariableIcon } from '../variableIcon';
import { ToggleProps } from '@/types';

export const ToggleItem = ({ item, onClickOpen, className }: ToggleProps) => {
  return (
    <button
      className={`${className} flex items-center gap-2 w-full hover:bg-blue-light hover:font-bold px-2 py-2 rounded-md`}
      onClick={() => onClickOpen(item)}>
      <VariableIcon name="leftArrow" size={14} className={`${item.isOpen ? 'rotate-90' : ''}`} />
      <div>{item.value}</div>
    </button>
  );
};
