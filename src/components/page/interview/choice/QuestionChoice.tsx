'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import NoQuestionMessage from '@/components/ui/NoQuestionMessage';
import React, { useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  selectedSubmitCategoryAtom,
  selectedSubmitSubcategoryAtom,
} from '@/recoil/selectedCategory/atom';
import useInfiniteUserQuestion from '@/hooks/questions/useInfiniteUserQuestion';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import { QuestionResponse } from '@/app/apis/services/question';

export default function QuestionChoice() {
  const [clickCount, setClickCount] = useState(0);
  const [clickQuestionIds, setClickQuestionIds] = useState<string[]>([]);
  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionAtom);

  const category = useRecoilValue(selectedSubmitCategoryAtom);
  const subcategory = useRecoilValue(selectedSubmitSubcategoryAtom);

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
      const clickMyQuestion = [
        ...prevMyQuestion,
        {
          category,
          subcategory,
          questionContent,
          questionId,
        },
      ];
      return clickMyQuestion;
    });

    // 질문의 ID를 배열에 추가하거나 제거
    if (setClickQuestionIds) {
      setClickQuestionIds(prevIds =>
        clickQuestion(question.questionId)
          ? prevIds.filter(id => id !== questionId)
          : [...prevIds, questionId],
      );
    }

    // 선택된 질문 개수 set
    if (setClickCount)
      setClickCount(prevCount =>
        clickQuestion(question.questionId) ? prevCount - 1 : prevCount + 1,
      );
  };

  return (
    <>
      <QuestionForm callback={handleSubmitQuestion} />
      <div
        className={`overflow-y-scroll flex flex-col gap-2 items-center h-[360px] scroll-hide ${
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
      </div>

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
    </>
  );
}
