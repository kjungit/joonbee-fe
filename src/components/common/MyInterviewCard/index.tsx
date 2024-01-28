'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Category } from '@/constants/category';
import { VariableIcon } from '@/components/ui/VariableIcon';
import useSWRMutation from 'swr/mutation';
import { deleteInterview, postInterviewLike } from '@/app/apis/services/member';

export interface DetailAnswerCardProps {
  categoryName: string;
  interviewId: number;
  questionCount: number;
  onHover: () => void;
  onClick: () => void;
  mutate?: any;
  selectInterview: 'my_interview' | 'liked';
}

export const MyInterviewCard = ({
  onHover,
  categoryName,
  questionCount,
  interviewId,
  onClick,
  mutate,
  selectInterview,
}: DetailAnswerCardProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const { trigger: deleteTrigger } = useSWRMutation(
    'api/member/interview/delete',
    () => deleteInterview(interviewId),
    {
      onSuccess: () => {
        mutate();
      },
    },
  );

  const { trigger: likeTrigger } = useSWRMutation(
    'api/member/like',
    () => postInterviewLike(interviewId),
    {
      onSuccess: () => {
        mutate();
      },
    },
  );

  return (
    <li
      onMouseOver={onHover}
      className={`w-full max-w-[290px] ${
        isFocus ? 'border-main-primary border-4 rounded-[20px]' : ' border-4 border-white'
      } `}>
      <div className="border-l-main-primary border-l-[12px] h-[140px] w-full max-w-[290px] shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
        <div className=" flex justify-between items-center">
          <p className="text-2xl font-bold">{Category[categoryName]}</p>
          <button onClick={() => (selectInterview === 'liked' ? likeTrigger() : deleteTrigger())}>
            <VariableIcon name="delete" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">질문 수 {questionCount}개</p>
          <div
            onMouseOver={() => {
              setIsFocus(true);
            }}
            onMouseOut={() => setIsFocus(false)}>
            <Button text="sm" size="sm" color="darkNavy" onClick={onClick}>
              자세히보기
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
