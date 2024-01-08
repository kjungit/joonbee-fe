'use client';
import React, { useEffect, useState } from 'react';
import { VariableIcon } from '@/components/ui/VariableIcon';
import ModalPortal from '@/components/ui/ModalPortal';
import { QustionItem } from '@/types/question';
import useMutateUserQuestion from '@/hooks/questions/useMutateUserQuestion';
import useInfiniteUserQuestion from '@/hooks/questions/useInfiniteUserQuestion';

type CardColor = 'text-black' | 'text-white';

export interface CartClipboardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: QustionItem;
  color?: CardColor;
}

export const CartClipboard = ({ color = 'text-white', item }: CartClipboardProps) => {
  const { categoryName, subcategoryName, questionContent } = item;
  const [isOpen, setIsOpen] = useState(false);

  const { trigger: postUserQuestion } = useMutateUserQuestion(
    categoryName,
    subcategoryName,
    questionContent,
    setIsOpen,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <>
      <button>
        <VariableIcon
          name="copy"
          onClick={() => {
            postUserQuestion();
          }}
          className={color}
        />
      </button>
      {isOpen && (
        <ModalPortal>
          <div className="fixed -translate-x-1/2 left-1/2 top-3/4">
            <div className="fadeOutBox w-[600px] rounded-lg items-center justify-center flex text-lg h-[50px]  bg-[#05081E] opacity-90 text-white">
              내 질문에 추가 되었습니다.
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};
