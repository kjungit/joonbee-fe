'use client';
import { QuestionResponse } from '@/app/apis/services/question';
import { Icon } from '@/components/ui/Icon';
import { MainCategory, SubCategory } from '@/constants/category';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';

type CardSize = 'sm' | 'md' | 'lg';

type CategorizedQuestionCardProps = QuestionResponse & {
  size?: CardSize;
  isClicked?: boolean;
  className?: string;
  setClickQuestionIds?: React.Dispatch<React.SetStateAction<string[]>>;
  setClickCount?: (prevCount: (prevCount: number) => number) => void;
};
export const CategorizedQuestionCard = ({
  size = 'md',
  category,
  subcategory,
  questionContent,
  questionId,
  isClicked,
  setClickQuestionIds,
  setClickCount,
  className,
}: CategorizedQuestionCardProps) => {
  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionAtom);
  const pathname = usePathname();

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
      setMyQuestion(prevMyQuestion => {
        const clickMyQuestion = [
          ...prevMyQuestion,
          {
            category,
            subcategory,
            questionContent,
            questionId,
          },
        ];
        return clickMyQuestion;
      });

      // 질문의 ID를 배열에 추가하거나 제거
      if (setClickQuestionIds) {
        setClickQuestionIds(prevIds =>
          isClicked ? prevIds.filter(id => id !== questionId) : [...prevIds, questionId],
        );
      }

      // 선택된 질문 개수 set
      if (setClickCount) setClickCount(prevCount => (isClicked ? prevCount - 1 : prevCount + 1));
    }
  };

  return (
    <div className={cardStyles} onClick={onClickQuestion}>
      <div className="flex">
        <div className={textStyles}>{MainCategory[category]}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className={textStyles}>{SubCategory[subcategory]}</div>
        <div className="border-l-gray-normal border-l-2" />
        <div className="ml-10">{questionContent}</div>
      </div>
      {isClicked && <Icon name="check" />}
    </div>
  );
};
