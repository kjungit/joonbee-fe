import React from 'react';

import { Button } from '../Button';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { CategoryName, SubcategoryName } from '@/types/question';

type DropdownProps = {
  size?: 'sm' | 'md';
  data: (CategoryName | SubcategoryName)[];
  title?: string;
  selected: CategoryName | SubcategoryName;
  onSelect: (item: any) => void;
  color?: 'white' | 'darkNavy';
};

const Dropdown = ({
  size = 'md',
  data,
  title = '카테고리',
  onSelect,
  selected,
  color = 'darkNavy',
}: DropdownProps) => {
  const { isOpened, toggleModal, modalRef } = useModalOutsideClick();

  const onSelectItem = (item: CategoryName | SubcategoryName) => {
    onToggleList();
    onSelect(item);
  };

  const onToggleList = () => {
    toggleModal();
  };

  const showSelectedItem = () => {
    return selected || title;
  };

  const sizeStyles = {
    sm: {
      item: 'px-[14px] py-[8px] text-[14px]',
      section: 'w-[116px]',
      list: 'top-[50px] h-[178px]',
    },
    md: {
      item: 'px-[22px] py-[12px] text-[20px]',
      section: 'w-[160px]',
      list: 'top-[70px] h-[234px] w-[160px]',
    },
  };

  return (
    <section ref={modalRef} className={`${sizeStyles[size].section} relative`}>
      <Button color={color} text={size} size={`dropdown-${size}`} onClick={onToggleList}>
        {showSelectedItem()}
      </Button>
      {isOpened && (
        <ul
          className={`shadow-md px-[8px] py-[6px] rounded-[8px] overflow-y-scroll scroll-hide  bg-white absolute
          ${sizeStyles[size].list}`}>
          {data.map(item => (
            <div key={item}>
              <li
                className={`font-bold hover:bg-hover-grayLight hover:shadow-normal rounded-[8px] text-center
                text-[#444] ${sizeStyles[size].item} ${
                  item === selected ? 'bg-hover-grayLight shadow-noraml' : ''
                }`}
                onClick={() => onSelectItem(item)}>
                {item}
              </li>
              <div className="border-b-2 border-gray-normal" />
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Dropdown;
