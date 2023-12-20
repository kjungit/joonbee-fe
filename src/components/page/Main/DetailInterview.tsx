import { DetailQuestionCard } from '@/components/common/DetailQuestionCard';
import { Avatar } from '@/components/ui/Avartar';
import { Button } from '@/components/ui/Button';
import { VariableIcon } from '@/components/ui/VariableIcon';
import React, { MouseEvent } from 'react';
import { InterviewItemType } from './InterviewSection';

export default function DetailInterview({
  item,
  onClickClose,
}: {
  item: InterviewItemType;
  onClickClose: () => void;
}) {
  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
      <div
        onClick={onClickOpen}
        className="bg-white border-4  border-main-primary gap-4 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-xl">프론트엔드</h3>
          <Button size="xs" color="darkGray" text="sm" onClick={onClickClose}>
            닫기
          </Button>
        </div>
        <div className="flex justify-between items-center border-gray-normal px-2  py-[12px]">
          <div className="flex gap-2">
            <Avatar size="md" thumbnail={''} onClick={() => {}} />
            <p className="font-bold text-[16px]">by kjun</p>
          </div>
          <div className="flex gap-2">
            <VariableIcon name="emptyLike" size={20} onClick={() => {}} />
            <p className="font-bold text-[16px]">{10}</p>
          </div>
        </div>
        <ul className=" gap-4 flex flex-col max-h-[220px] overflow-y-auto p-2">
          {item.questions.map((question, index) => (
            <DetailQuestionCard data={{ ...question, index }} key={question.questionId} />
          ))}
        </ul>
        <div className="flex justify-end">
          <Button size="lg" text="sm">
            면접 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
