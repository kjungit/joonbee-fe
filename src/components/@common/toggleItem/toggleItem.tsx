'use client';
import React, { useState } from 'react';
import { VariableIcon } from '../VariableIcon';
export interface ItemProps {
  id: string;
  isOpen: boolean;
  value: string;
  children: ChildrenProps[];
}

interface ChildrenProps {
  id: string;
  value: string;
}

export interface ToggleItemProps {
  item: ItemProps;
  onClickOpen: (clickedItem: ItemProps) => void;
}

export const ToggleItem = ({ item, onClickOpen }: ToggleItemProps) => {
  return (
    <button className="flex items-center" onClick={() => onClickOpen(item)}>
      <VariableIcon name="leftArrow" size={14} className={`${item.isOpen ? 'rotate-90' : ''}`} />
      <div>{item.value}</div>
    </button>
  );
};
