'use client';
import { UserQuestionsResponseData } from '@/app/apis/services/cart';
import { Icon } from '@/components/ui/Icon';
import { myQuestionClickSelector } from '@/recoil/myQuestion/withClick';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';

type CardSize = 'sm' | 'md' | 'lg';

type CategorizedQuestionCardProps = UserQuestionsResponseData & {
  size?: CardSize;
  isClicked?: boolean;
  className?: string;
};
export const CategorizedQuestionCard = ({
  size = 'md',
  category,
  subcategory,
  questionContent,
  questionId,
  isClicked = false,
  className,
}: CategorizedQuestionCardProps) => {
  const pathname = usePathname();

  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionClickSelector);

  const baseStyles = `flex px-[10px] justify-between items-center font-bold shadow-md shrink-0
     rounded-[8px] bg-white cursor-pointer ${className}`;

  const sizeStyles = {
    sm: 'w-full text-[14px] h-[46px]',
    md: 'w-full text-[18px] h-[54px]',
    lg: 'w-[1100px] text-[20px] min-h-[54px] h-[54px]',
  };

  const textStyles = 'flex justify-center w-[190px]';

  const borderPositionStyles = 'border-main-primary border-2';
  const cardStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${isClicked ? borderPositionStyles : 'border-white border-2'}
  `;

  const onClickQuestion = () => {
    if (pathname === '/interview/choice') {
      setMyQuestion([
        {
          category,
          subcategory,
          questionContent,
          questionId,
          isClicked: !isClicked,
        },
      ]);
    }
  };

  console.log(isClicked);

  return (
    <div className={cardStyles} onClick={onClickQuestion}>
      <div className="flex">
        <div className={textStyles}>{category}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>{subcategory}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="ml-10">{questionContent}</div>
      </div>
      {isClicked && <Icon name="check" />}
    </div>
  );
};
