'use client';
import React, { useEffect, useState } from 'react';
import { VariableIcon } from '@/components/ui/VariableIcon';
import ModalPortal from '@/components/ui/ModalPortal';
import { PostCartProps, postCartsave } from '@/app/apis/services/member';
import { CategoryName, QustionItem } from '@/types/question';
import useSWRMutation from 'swr/mutation';

type CardColor = 'text-black' | 'text-white';

export interface CartClipboardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: QustionItem;
  categoryName: CategoryName;
  color?: CardColor;
}

export const CartClipboard = ({ color = 'text-white', item, categoryName }: CartClipboardProps) => {
  const { subcategoryName, questionContent } = item;
  const [isOpen, setIsOpen] = useState(false);

  const { trigger } = useSWRMutation(
    'api/cart/question/save',
    item =>
      postCartsave({
        categoryName,
        subcategoryName,
        questionContent,
      }),
    {
      onSuccess: () => {
        setIsOpen(true);
      },
    },
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
            trigger();
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
