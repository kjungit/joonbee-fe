import React from 'react';

import { Button } from '../Button';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useModal } from '@/hooks/useModal';

type DropdownProps = {
  size?: 'xs' | 'sm' | 'md';
  data: (CategoryName | SubcategoryName)[];
  title?: string;
  selected: CategoryName | SubcategoryName;
  onSelect: (item: any) => void;
  color?: 'white' | 'darkNavy';
  isDisabled?: boolean;
};

const Dropdown = ({
  size = 'sm',
  data,
  title = '카테고리',
  onSelect,
  selected,
  color = 'darkNavy',
  isDisabled = false,
}: DropdownProps) => {
  const { isOpened, onClose, onToggle } = useModal();
  const { modalRef } = useModalOutsideClick(onClose);

  const onSelectItem = (item: CategoryName | SubcategoryName) => {
    onToggleList();
    onSelect(item);
  };

  const onToggleList = () => {
    onToggle();
  };

  const showSelectedItem = () => {
    return selected || title;
  };

  const sizeStyles = {
    xs: {
      item: 'px-[14px] py-[8px] text-[12px]',
      section: 'w-[110px]',
      list: 'top-[50px] h-[178px]',
    },

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
      <Button
        color={color}
        text={size}
        size={`dropdown-${size}`}
        onClick={onToggleList}
        disabled={isDisabled}>
        {showSelectedItem()}
      </Button>
      {isOpened && (
        <ul
          className={`shadow-normal w-full px-[8px] py-[6px] rounded-[8px] overflow-y-scroll scroll-hide  bg-white absolute
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
