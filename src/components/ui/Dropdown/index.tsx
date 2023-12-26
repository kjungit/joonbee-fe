import React from 'react';

import { Button } from '../Button';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useModal } from '@/hooks/useModal';
import { Category, MainCategory } from '@/constants/category';

type DropdownProps = {
  size?: 'sm' | 'md';
  data: (CategoryName | SubcategoryName)[];
  title?: string;
  selected: CategoryName | SubcategoryName;
  onSelect: (item: any) => void;
  color?: 'white' | 'darkNavy';
  isDisabled?: boolean;
};

const Dropdown = ({
  size = 'md',
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
    return Category[selected] || title;
  };

  const sizeStyles = {
    sm: {
      item: 'px-[14px] py-[8px] text-[14px]',
      section: 'w-[116px]',
      list: 'top-[50px] max-h-[178px]',
    },
    md: {
      item: 'px-[22px] py-[12px] text-[20px]',
      section: 'w-[160px]',
      list: 'top-[70px] max-h-[234px] w-[160px]',
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
          className={`shadow-normal px-1 py-[6px] rounded-[8px] overflow-y-scroll scroll-hide  bg-white absolute
          ${sizeStyles[size].list}`}>
          {data.map((item, index) => (
            <div key={item}>
              <li
                key={item}
                className={`cursor-pointer font-bold hover:bg-hover-grayLight hover:shadow-normal rounded-[8px] text-center
                text-[#444] ${sizeStyles[size].item} `}
                onClick={() => onSelectItem(item)}>
                {Category[item]}
              </li>
              {index !== data.length - 1 && <div className="border-b-2 border-gray-normal" />}
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Dropdown;
