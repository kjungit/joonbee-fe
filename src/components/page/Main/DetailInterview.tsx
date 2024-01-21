import { DetailQuestionCard } from '@/components/common/DetailQuestionCard';
import { Avatar } from '@/components/ui/Avartar';
import { Button } from '@/components/ui/Button';
import { VariableIcon } from '@/components/ui/VariableIcon';
import React, { MouseEvent, useEffect } from 'react';
import { InterviewItemType } from './InterviewSection';
import { maskNickname } from '@/utils/format';
import useSWRMutation from 'swr/mutation';
import { postInterviewLike } from '@/app/apis/services/member';
import { useSWRConfig } from 'swr';
import { CategoryName } from '@/types/question';
import { Category } from '@/constants/category';

export default function DetailInterview({
  item,
  onClickClose,
  categorySelect = '',
  current = 1,
  interviewMutate,
}: {
  current?: number;
  item: InterviewItemType;
  onClickClose: () => void;
  categorySelect?: CategoryName;
  interviewMutate: any;
}) {
  const { interviewId, categoryName, questions, likeCount, thumbnail, memberId, nickname } = item;
  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const { mutate } = useSWRConfig();

  const { trigger } = useSWRMutation('api/member/like', () => postInterviewLike(interviewId), {
    onSuccess: () => {
      mutate(['/api/interview/all', categorySelect, current]);
      interviewMutate();
    },
  });

  const onClickLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    trigger();
  };

  useEffect(() => {
    console.log(likeCount);
  }, [likeCount]);

  return (
    <div className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
      <div
        onClick={onClickOpen}
        className="bg-white border-4  border-main-primary gap-4 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-2xl pl-2">{Category[categoryName]}</h3>
          <Button size="xs" color="darkGray" text="sm" onClick={onClickClose}>
            닫기
          </Button>
        </div>
        <div className="flex justify-between items-center border-gray-normal px-2  py-[12px]">
          <div className="flex gap-2 items-center">
            <Avatar size="lg" thumbnail={thumbnail} onClick={() => {}} />
            <p className="font-bold text-[16px]">by {maskNickname(nickname)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={onClickLike} className="p-1 ">
              {item.liked ? <VariableIcon name="filledLike" /> : <VariableIcon name="emptyLike" />}
            </button>
            <p className="font-bold text-[16px] w-4">{likeCount}</p>
          </div>
        </div>
        <ul className=" gap-4 flex flex-col max-h-[220px] overflow-y-auto p-2">
          {questions.map((question, index) => (
            <DetailQuestionCard
              question={question.questionContent}
              questionCount={index + 1}
              key={question.questionId}
            />
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
