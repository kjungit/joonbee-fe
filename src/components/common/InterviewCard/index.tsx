'use client';
import React, { useEffect, useState } from 'react';
import { maskNickname } from '@/utils/format';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avartar';
import { VariableIcon } from '@/components/ui/VariableIcon';
import { QuestionCard } from '../QuestionCard';

type InterviewCardProps = {
  data: any;
};

const InterviewCard = ({ data }: InterviewCardProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { category, userInfo, likeCount, questions } = data;

  const onOpenModal = () => {};

  const onClickAvatar = () => {};

  return (
    <div
      className={`${
        isFocus && 'border-main-primary border-4 rounded-[20px]'
      }w-[380px] h-[392px] shadow-normal rounded-[20px] border-4 border-gray-normal`}>
      <div className="bg-[#252A32] h-[70px] p-[24px] shadow-normal rounded-t-[16px]">
        <h2 className="text-white text-[16px] font-bold">{category}</h2>
      </div>
      <div className="h-[242px] px-[10px] py-[16px] flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-2">
          {questions.map((question: any) => (
            <QuestionCard key={question.id}>{question.question}</QuestionCard>
          ))}
        </ul>
        <button onMouseOver={() => setIsFocus(true)} onMouseOut={() => setIsFocus(false)}>
          <Button size="xl" text="sm" color="blueTertiary" className="shadow-normal">
            <p>질문 자세히 보기</p>
          </Button>
        </button>
      </div>
      <div className="flex justify-between items-center rounded-b-[20px] h-[80px] border-t border-t-gray-normal px-[28px] py-[12px]">
        <div className="flex gap-2">
          <Avatar size="sm" thunbnail={userInfo.thumbnail} onClick={onClickAvatar} />
          <p className="font-bold text-[16px]">by {maskNickname(userInfo.nickName)}</p>
        </div>
        <div className="flex gap-2">
          <VariableIcon name="emptyLike" onClick={onOpenModal} />
          <p className="font-bold text-[16px]">{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
