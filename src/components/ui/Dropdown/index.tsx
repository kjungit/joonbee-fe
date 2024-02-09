import React from 'react';
import { Button } from '../Button';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useModal } from '@/hooks/useModal';
import { Category, MainCategory } from '@/constants/category';

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
    return Category[selected] || title;
  };
  const sizeStyles = {
    xs: {
      item: 'px-1 py-2 text-[12px]',
      section: 'min-w-[110px]',
      button: 'h-[44px] min-w-[110px]',
      ul: 'top-[50px] h-[178px] w-full',
    },
    sm: {
      item: 'px-[14px] py-[8px] text-[14px] ',
      section: 'min-w-[116px] h-full',
      button: 'h-[50px] min-w-[140px]',
      ul: 'top-[50px] h-auto  max-h-[180px] w-full',
    },
    md: {
      item: 'px-[22px] py-[12px] text-[20px]',
      section: 'min-w-[160px]',
      button: 'h-[60px] min-w-[160px]',
      ul: 'top-[70px] h-[234px]',
    },
  };
  return (
    <section ref={modalRef} className={`${sizeStyles[size].section} relative`}>
      <Button
        color={color}
        text={size}
        size="auto"
        onClick={onToggleList}
        className={`${sizeStyles[size].button}`}
        disabled={isDisabled}>
        {showSelectedItem()}
      </Button>
      {isOpened && (
        <ul
          className={`shadow-normal px-[8px] py-[6px] top-[60px] rounded-[8px] overflow-y-auto bg-white absolute z-10
          ${sizeStyles[size].ul}`}>
          {data.map((item, index) => (
            <li key={item} className="cursor-pointer">
              <div
                className={`font-bold hover:bg-hover-grayLight hover:shadow-normal rounded-[8px] text-center
                text-[#444] ellipsis ${sizeStyles[size].item} ${
                  item === selected ? 'bg-hover-grayLight shadow-noraml' : ''
                }`}
                onClick={() => onSelectItem(item)}>
                {!item ? '카테고리' : Category[item]}
              </div>
              {index !== data.length - 1 && <div className="border-b-2 border-gray-normal" />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default Dropdown;
