import React, { useState } from 'react';
import Item from './Item';
import List from './List';
import { Button } from '../Button';
import { link } from 'fs';

type DropdownProps = {
  size?: 'sm' | 'md';
  data: string[];
  title: string;
};

const Dropdown = ({ size = 'md', data, title = '카테고리' }: DropdownProps) => {
  const [selected, setSelected] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  const onSelectItem = (item: string) => {
    setSelected(item);
    onToggleList();
  };

  const onToggleList = () => {
    setIsOpened(prev => !prev);
  };

  const showSelectedItem = () => {
    return selected || title;
  };

  const sizeStyles = {
    sm: {
      item: 'px-[14px] py-[8px] text-[16px]',
      section: 'w-[116px]',
      list: 'h-[178px]',
      button: 'mb-2',
    },
    md: {
      item: 'px-[26px] py-[12px] text-[20px]',
      section: 'w-[160px] h-[212px]',
      list: 'h-[234px]',
      button: 'mb-4',
    },
  };

  return (
    <section className={`${sizeStyles[size].section}`}>
      <Button
        color="darkNavy"
        text={size}
        size={`dropdown-${size}`}
        onClick={onToggleList}
        className={sizeStyles[size].button}>
        {showSelectedItem()}
      </Button>
      {isOpened && (
        <ul
          className={`shadow-md px-[8px] py-[6px] rounded-[8px] overflow-y-scroll ${sizeStyles[size].list}`}>
          {data.map(item => (
            <>
              <li
                className={`font-bold hover:bg-hover-grayLight hover:shadow-dropdown rounded-[8px] text-center
                text-[#444]
               ${sizeStyles[size].item}`}
                key={item}
                onClick={() => onSelectItem(item)}>
                {item}
              </li>
              <div className="border-b-2 border-gray-normal" />
            </>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Dropdown;
