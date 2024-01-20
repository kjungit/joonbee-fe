'use client';

import { Icon } from '@/components/ui/Icon';
import { MainCategory, SubCategory } from '@/constants/category';
import { CategoryName, SubcategoryName } from '@/types/question';

type CardSize = 'sm' | 'md' | 'lg';

type CategorizedQuestionCardProps = {
  category: CategoryName;
  subcategory: SubcategoryName;
  questionContent: string;
  questionId?: string;
  size?: CardSize;
  isClicked?: boolean;
  className?: string;
  onClick?: any;
};

export const CategorizedQuestionCard = ({
  size = 'md',
  category,
  subcategory,
  questionId,
  questionContent,
  isClicked,
  onClick,
  className,
}: CategorizedQuestionCardProps) => {
  const baseStyles = `flex px-[10px] justify-between items-center font-bold shadow-md shrink-0 relative z-0
     rounded-[8px] bg-white cursor-pointer ${className}`;

  const sizeStyles = {
    sm: 'w-full text-[14px] min-h-[46px] ',
    md: 'w-full text-[18px] h-[54px]',
    lg: 'w-[1100px] text-[20px] min-h-[54px] h-[54px]',
  };

  const textStyles = 'flex justify-center items-center min-w-[140px]';

  const borderPositionStyles = 'border-main-primary border-2';
  const cardStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${isClicked ? borderPositionStyles : 'border-white border-2'}
  `;

  return (
    <div className={cardStyles} onClick={onClick}>
      <div className="flex">
        <div className={textStyles}>{MainCategory[category]}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>{SubCategory[subcategory]}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="pr-10 pl-4">{questionContent}</div>
      </div>
      <div className="w-6 h-6 absolute right-4">{isClicked && <Icon name="check" />}</div>
    </div>
  );
};
