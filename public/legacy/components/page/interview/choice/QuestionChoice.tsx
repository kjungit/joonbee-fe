'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '../../../common/CategorizedQuestionCard';
import QuestionForm from '../../../common/QuestionForm';
import { Button } from '../../../ui/Button';
import NoQuestionMessage from '../../../ui/NoQuestionMessage';
import React, { useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  selectedSubmitCategoryAtom,
  selectedSubmitSubcategoryAtom,
} from '../../../../recoil/selectedCategory/atom';
import useInfiniteUserQuestion from '../../../../hooks/questions/useInfiniteUserQuestion';
import { myQuestionAtom } from '../../../../recoil/myQuestion/atom';
import { QuestionResponse } from '../../../../app/apis/services/question';
import AlertModal from '../../../ui/Modal/AlertModal';
import { useModal } from '../../../../hooks/useModal';
import useBeforeUnload from '../../../../hooks/useBeforeUnload';
import PreventBackModal from '../../../common/PreventBackModal';
import PreventTabletModal from '../../../common/PreventTabletModal';

export default function QuestionChoice() {
  useBeforeUnload();
  const [clickCount, setClickCount] = useState(0);
  const [clickQuestionIds, setClickQuestionIds] = useState<string[]>([]);
  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionAtom);

  const category = useRecoilValue(selectedSubmitCategoryAtom);
  const subcategory = useRecoilValue(selectedSubmitSubcategoryAtom);

  const { isOpened, onClose, onOpen } = useModal();

  const {
    newData: myQuestions,
    setTarget,
    mutate,
  } = useInfiniteUserQuestion(category, subcategory);

  const handleSubmitQuestion = async () => {
    await mutate();
  };

  const disableBtn = () => {
    return !clickCount;
  };

  const clickQuestion = (id: string): boolean => {
    return clickQuestionIds.includes(id);
  };

  const onClickQuestion = (question: QuestionResponse) => {
    const { category, subcategory, questionContent, questionId } = question;
    setMyQuestion(prevMyQuestion => {
      const existingQuestion = prevMyQuestion.find(q => q.questionId === questionId);

      if (existingQuestion) {
        const updatedMyQuestion = prevMyQuestion.filter(q => q.questionId !== questionId);
        return updatedMyQuestion;
      } else {
        const updatedMyQuestion = [
          ...prevMyQuestion,
          {
            category,
            subcategory,
            questionContent,
            questionId,
          },
        ];
        return updatedMyQuestion;
      }
    });

    // 질문의 ID를 배열에 추가하거나 제거
    setClickQuestionIds(prevIds => {
      const newIds = clickQuestion(question.questionId)
        ? prevIds.filter(id => id !== questionId)
        : [...prevIds, questionId];

      if (newIds.length > 10) {
        return prevIds;
      }
      return newIds;
    });

    // 선택된 질문 개수 set
    setClickCount(prevCount => {
      const newCount = clickQuestion(question.questionId) ? prevCount - 1 : prevCount + 1;
      if (newCount > 10) {
        onOpen();
        return prevCount;
      }
      return newCount;
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full bg-background-lightgray p-8 rounded-2xl relative">
      <h2 className="text-[20px] font-bold">질문을 준비해주세요</h2>
      <QuestionForm callback={handleSubmitQuestion} />
      <p className="items-end flex justify-end text-sm text-status-alert font-bold">
        카테고리를 선택하고 질문을 등록해주세요.
      </p>
      <ul
        className={`overflow-y-scroll flex flex-col gap-2 items-center h-[270px]  ${
          myQuestions?.length === 0 && 'justify-center'
        }`}>
        {myQuestions?.map(question => (
          <CategorizedQuestionCard
            category={question.category}
            subcategory={question.subcategory}
            questionContent={question.questionContent}
            onClick={() => onClickQuestion(question)}
            isClicked={clickQuestion(question.questionId)}
            key={question.questionId}
            size="sm"
          />
        ))}
        {myQuestions?.length === 0 && <NoQuestionMessage />}
        <div ref={setTarget} className="w-full h-[1px] shrink-0"></div>
      </ul>

      <Link href="/interview/choice/setting">
        <Button
          color="blueSecondary"
          size="lg"
          text="sm"
          className="absolute bottom-8 right-8"
          disabled={disableBtn()}>
          {clickCount}개 선택된 질문 보기
        </Button>
      </Link>

      {isOpened && (
        <AlertModal
          title="알림"
          body="질문은 최대 10개 까지 선택할 수 있습니다."
          isOpened={isOpened}
          onClose={onClose}
        />
      )}
      <PreventBackModal />
      <PreventTabletModal />
    </div>
  );
}
