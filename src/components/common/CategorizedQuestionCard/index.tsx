'use client';
import { Icon } from '@/components/ui/Icon';
import { MyQuestion } from '@/recoil/myQuestion/atom';
import { myQuestionAddSelector } from '@/recoil/myQuestion/withAdd';
import { myQuestionClickSelector } from '@/recoil/myQuestion/withClick';
import { CategoryName, SubcategoryName } from '@/types/question';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useRecoilState } from 'recoil';

type CardSize = 'md' | 'lg';

interface CategorizedQuestionCardProps extends MyQuestion {
  size?: CardSize;
}
export const CategorizedQuestionCard = ({
  size = 'md',
  categoryName,
  subcategoryName,
  questionContent,
  questionId,
  isChecked,
}: CategorizedQuestionCardProps) => {
  const pathname = usePathname();

  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionClickSelector);

  const baseStyles = `flex h-[54px] text-[18px] px-[10px] justify-between items-center font-bold shadow-md
     rounded-[8px] bg-white cursor-pointer`;

  const sizeStyles = {
    md: 'w-[900px] text-[18px]',
    lg: 'w-[1100px] text-[20px] min-h-[54px]',
  };

  const textStyles = 'flex justify-center w-[190px]';

  const borderPositionStyles = 'border-main-primary border-2';
  const buttonStyles = `
  ${baseStyles}
  ${sizeStyles[size]}
  ${isChecked ? borderPositionStyles : 'border-white border-2'}
  `;

  const onClickQuestion = () => {
    if (pathname === '/interview/choice/setting') {
      return;
    }
    setMyQuestion([
      {
        categoryName,
        subcategoryName,
        questionContent,
        questionId,
        isChecked: !isChecked,
      },
    ]);
  };

  return (
    <div className={buttonStyles} onClick={onClickQuestion}>
      <div className="flex">
        <div className={textStyles}>{categoryName}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>{subcategoryName}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="ml-10">{questionContent}</div>
      </div>
      {isChecked && <Icon name="check" />}
    </div>
  );
};
