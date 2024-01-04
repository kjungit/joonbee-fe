'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import NoQuestionMessage from '@/components/ui/NoQuestionMessage';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import useInfiniteUserQuestion from '@/hooks/questions/useInfiniteUserQuestion';

export default function QuestionChoice() {
  const [clickCount, setClickCount] = useState(0);
  const [clickQuestionIds, setClickQuestionIds] = useState<string[]>([]);

  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryAtom);

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

  return (
    <>
      <QuestionForm callback={handleSubmitQuestion} />
      <div
        className={`overflow-y-scroll flex flex-col gap-2 items-center h-[360px] scroll-hide ${
          myQuestions?.length === 0 && 'justify-center'
        }`}>
        {myQuestions?.map(question => (
          <CategorizedQuestionCard
            questionId={question.questionId}
            category={question.category}
            subcategory={question.subcategory}
            questionContent={question.questionContent}
            setClickCount={setClickCount}
            setClickQuestionIds={setClickQuestionIds}
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
