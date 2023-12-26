'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Category } from '@/constants/category';
import { Icon } from '@/components/ui/Icon';
import { VariableIcon } from '@/components/ui/VariableIcon';

export interface DetailAnswerCardProps {
  categoryName: string;
  interviewId: number;
  questionCount: number;
  onClick: () => void;
  onDelete: () => void;
}

export const MyInterviewCard = ({
  categoryName,
  interviewId,
  questionCount,
  onClick,
  onDelete,
}: DetailAnswerCardProps) => {
  return (
    <div className="border-l-main-primary border-l-[12px] h-[140px] w-full max-w-[290px] shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
      <div className=" flex justify-between items-center">
        <p className="text-2xl font-bold">{Category[categoryName]}</p>
        <button>
          <VariableIcon name="delete" size={20} />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">질문 수 {questionCount}개</p>
        <Button text="sm" size="sm" color="darkNavy" onClick={onClick}>
          자세히보기
        </Button>
      </div>
    </div>
  );
};
