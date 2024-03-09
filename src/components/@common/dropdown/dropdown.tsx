import React from 'react';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useModal } from '@/hooks/useModal';
import Button, { ButtonColors } from '../button/button';
import { Category } from '@/constants/category';

type DropdownProps = {
  data: (CategoryName | SubcategoryName)[];
  title?: string;
  selected: CategoryName | SubcategoryName;
  onSelect: (item: any) => void;
  color?: ButtonColors;
  size?: 'sm' | 'md';
  disabled?: boolean;
};
const Dropdown = ({
  data,
  size = 'md',
  title = '카테고리',
  onSelect,
  selected,
  color = 'primary',
  disabled = false,
}: DropdownProps) => {
  const { isOpened, onToggle } = useModal();
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
      item: 'px-[14px] py-[8px] text-[14px] ',
      section: 'min-w-[116px]',
      button: 'h-[50px] min-w-[140px]',
      ul: 'top-12 h-[234px] w-[120px]',
    },
    md: {
      item: 'px-[22px] py-[12px] text-[14px]',
      section: 'min-w-[160px]',
      button: 'h-[60px] min-w-[160px]',
      ul: 'top-12 h-[234px] w-[142px]',
    },
  };

  return (
    <section className="relative">
      <Button
        color={color}
        size={size}
        onClick={onToggleList}
        className="shadow-md"
        disabled={disabled}>
        {showSelectedItem()}
      </Button>
      {isOpened && (
        <ul
          className={`shadow-normal px-[8px] py-[6px] top-10 rounded-[8px] overflow-y-auto bg-white absolute
           z-10 ${sizeStyles[size].ul}`}>
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
