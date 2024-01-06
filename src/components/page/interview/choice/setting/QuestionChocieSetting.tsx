'use client';

import ButtonTimeSetting from '@/components/common/ButtonTimeSetting';
import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';

import { selectedChocieCategoryAtom } from '@/recoil/selectedCategory/atom';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function QuestionChocieSetting() {
  const questions = useRecoilValue(myQuestionAtom);

  const categories = [...new Set(questions.map(question => question.category))];
  const [category, setCategory] = useRecoilState(selectedChocieCategoryAtom);

  const disableBtn = () => {
    return !category;
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Dropdown
          size="xs"
          color="white"
          selected={category}
          onSelect={setCategory}
          data={categories}
        />
        <p className="text-[#7D7D7D] mb-2">전체 질문 카테고리를 선택해주세요</p>
      </div>
      <div
        className={`flex flex-col gap-2 scroll-hide overflow-y-scroll items-center h-[276px] ${
          questions.length === 0 && 'justify-center'
        }`}>
        {questions?.map(question => (
          <CategorizedQuestionCard
            category={question.category}
            subcategory={question.subcategory}
            questionContent={question.questionContent}
            key={question.questionId}
            size="sm"
          />
        ))}
      </div>
      <div className="">
        <p className="text-[#7D7D7D] mb-2">* 개별 질문당 시간을 설정해주세요</p>
        <ButtonTimeSetting />
      </div>
      <Link href="/interview/permission">
        <Button
          color="blueSecondary"
          size="lg"
          text="sm"
          className="absolute bottom-8 right-8"
          disabled={disableBtn()}>
          면접 시작하기
        </Button>
      </Link>
    </>
  );
}
