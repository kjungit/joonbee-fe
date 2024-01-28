'use client';
import React, { MouseEvent, useState } from 'react';
import { maskNickname } from '@/utils/format';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avartar';
import { VariableIcon } from '@/components/ui/VariableIcon';
import { QuestionCard } from '../QuestionCard';
import { Category } from '@/constants/category';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import { useLikeMutation } from '@/hooks/useLikeMutation';
import AlertModal from '@/components/ui/Modal/AlertModal';

const InterviewCard = ({ props }: { props: InterviewItemType }) => {
  const {
    categoryName,
    nickname,
    thumbnail,
    likeCount,
    liked,
    questions,
    interviewId,
    categorySelect = '',
    current = 1,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [isLikeCooldown, setIsLikeCooldown] = useState(false);

  const { likeTrigger, isLikeError, setIsLikeError } = useLikeMutation(
    interviewId,
    categorySelect,
    current,
  );
  const onClickLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isLikeCooldown) {
      setIsLikeCooldown(true);
      likeTrigger();

      setTimeout(() => {
        setIsLikeCooldown(false);
      }, 1200);
    }
  };

  return (
    <>
      <button
        onMouseOver={() => setIsFocus(true)}
        onMouseOut={() => setIsFocus(false)}
        className={`${
          isFocus && 'border-main-primary border-4 rounded-[20px]'
        } md:max-w-[320px] w-full flex-grow h-[392px] shadow-normal rounded-[20px] border-4 border-gray-normal`}>
        <div className="bg-[#252A32] h-[70px] p-[24px] shadow-normal rounded-t-[16px]">
          <h2 className="text-white text-[16px] font-bold">{Category[categoryName]}</h2>
        </div>
        <div className="h-[242px] px-[10px] py-[16px] flex flex-col items-center justify-between">
          <ul className="flex flex-col gap-2 w-full">
            {questions.slice(0, 3).map((question: any) => (
              <QuestionCard key={question.questionId} text={question.questionContent} />
            ))}
          </ul>
          <div>
            <Button size="xl" text="sm" color="blueTertiary" className="shadow-normal">
              <p>질문 자세히 보기</p>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center rounded-b-[20px] h-[80px] border-t border-t-gray-normal px-[28px] py-[12px]">
          <div className="flex gap-2">
            {thumbnail && <Avatar size="sm" thumbnail={thumbnail} />}
            {nickname && <p className="font-bold text-[16px]">by {maskNickname(nickname)}</p>}
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={onClickLike} className="p-1 ">
              {liked ? <VariableIcon name="filledLike" /> : <VariableIcon name="emptyLike" />}
            </button>

            <p className="font-bold text-[16px] w-4">{likeCount}</p>
          </div>
        </div>
      </button>
      {isLikeError && (
        <AlertModal
          isOpened={isLikeError}
          onClose={() => setIsLikeError(false)}
          title="로그인이 필요합니다."
          body={`로그인 후 좋아요를 할 수 있어요!`}
          onConfirm={e => {
            e?.stopPropagation();
            setIsLikeError(false);
          }}
        />
      )}
    </>
  );
};

export default InterviewCard;
