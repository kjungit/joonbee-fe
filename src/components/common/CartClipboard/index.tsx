'use client';
import React, { useEffect, useState } from 'react';
import { VariableIcon } from '@/components/ui/VariableIcon';
import ModalPortal from '@/components/ui/ModalPortal';
import { QustionItem } from '@/types/question';
import useMutateUserQuestion from '@/hooks/questions/useMutateUserQuestion';
import { postUserQuestion } from '@/app/apis/services/question';
import useSWRMutation from 'swr/mutation';
import { useRecoilState } from 'recoil';
import { isTokenStatus } from '@/recoil/isToken/atoms';
import ModalAlert from '../ModalAlert';

type CardColor = 'text-black' | 'text-white';

export interface CartClipboardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: QustionItem;
  color?: CardColor;
}

export const CartClipboard = ({ color = 'text-white', item }: CartClipboardProps) => {
  const { questionId, subcategoryName } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isError, setIsError] = useState(false);

  const { trigger, data } = useSWRMutation(
    '/api/cart/question/save',
    () => postUserQuestion(questionId, subcategoryName),
    {
      onSuccess: () => {},
      onError: error => {
        if (error.response.status === 401) {
          setIsLoginError(true);
        }
        if (error.response.status === 400) {
          setIsError(true);
        }
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
      {isLoginError && (
        <ModalAlert
          title="로그인이 필요합니다."
          subTitle="로그인 후 나의 질문에 추가할 수 있어요!"
          onClose={() => setIsLoginError(false)}
        />
      )}
      {isError && (
        <ModalAlert
          title="나의질문에 담겨있는 질문이에요."
          subTitle="나의 질문 페이지를 확인해보세요!"
          onClose={() => setIsError(false)}
        />
      )}
    </>
  );
};
