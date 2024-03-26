'use client';
import React from 'react';
import { VariableIcon } from '../variableIcon';
import { ToggleProps } from '@/types';

export const ToggleItem = ({ item, onClickOpen }: ToggleProps) => {
  return (
    <button className="flex items-center gap-2" onClick={() => onClickOpen(item)}>
      <VariableIcon name="leftArrow" size={14} className={`${item.isOpen ? 'rotate-90' : ''}`} />
      <div>{item.value}</div>
    </button>
  );
};
