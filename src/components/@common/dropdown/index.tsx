import React, { useEffect, useState } from 'react';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useModal } from '@/hooks/useModal';
import Button, { ButtonColors } from '../button';
import { Category } from '@/constants/category';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';

type DropdownProps = {
  data: string[];
  title?: string;
  selected: string;
  onSelect: (item: any) => void;
  color?: ButtonColors;
  size?: 'sm' | 'md';
  disabled?: boolean;
  direction?: 'top' | 'bottom';
};
const Dropdown = ({
  data,
  size = 'sm',
  title = '카테고리',
  onSelect,
  selected,
  color = 'primary',
  direction = 'bottom',
  disabled = false,
}: DropdownProps) => {
  const { isOpened, onToggle, onClose } = useModal();
  const { modalRef } = useModalOutsideClick<HTMLUListElement>(onClose);

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const onSelectItem = (item: string) => {
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
      ul: 'top-12 max-h-[210px] h-auto w-[124px]',
    },
    md: {
      item: 'px-[16px] py-[6px]  text-[14px]',
      section: 'min-w-[160px]',
      button: 'h-[60px] min-w-[160px]',
      ul: 'top-12 max-h-[210px] h-auto w-[142px]',
    },
  };

  useEffect(() => {
    if (direction === 'top' && modalRef.current) {
      const dropdownHeight = modalRef.current.offsetHeight;
      setDropdownStyle({
        top: `calc(100% - 70px - ${dropdownHeight}px)`,
      });
    } else {
      setDropdownStyle({});
    }
  }, [isOpened, direction, modalRef.current]);

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
          style={dropdownStyle}
          ref={modalRef}
          className={`shadow-normal px-[8px] mt-[10px]  py-[6px] top-10 rounded-[8px] overflow-y-auto bg-white absolute
           z-10 ${sizeStyles[size].ul} `}>
          {data.map((item, index) => (
            <li key={item} className="cursor-pointer">
              <div
                className={` hover:bg-hover-grayLight my-1 px-2 py-2 rounded-[8px] text-center
                text-[#444] ellipsis ${sizeStyles[size].item} ${
                  item === selected ? 'bg-hover-grayLight ' : ''
                }`}
                onClick={() => onSelectItem(item)}>
                {!item ? '카테고리' : Category[item]}
              </div>
              {index !== data.length - 1 && <div className="border-b-[1px] border-gray-normal" />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default Dropdown;
