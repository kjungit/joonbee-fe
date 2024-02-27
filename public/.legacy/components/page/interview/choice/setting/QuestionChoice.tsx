'use client';

import ButtonTimeSetting from '../../../../common/ButtonTimeSetting';
import { CategorizedQuestionCard } from '../../../../common/CategorizedQuestionCard';
import PreventBackModal from '../../../../common/PreventBackModal';
import PreventTabletModal from '../../../../common/PreventTabletModal';
import { Button } from '../../../../ui/Button';
import Dropdown from '../../../../ui/Dropdown';
import useBeforeUnload from '../../../../../hooks/useBeforeUnload';
import { myQuestionAtom } from '../../../../../recoil/myQuestion/atom';

import { selectedChoiceCategoryAtom } from '../../../../../recoil/selectedCategory/atom';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function QuestionChoiceSetting() {
  const questions = useRecoilValue(myQuestionAtom);
  const categories = [...new Set(questions.map(question => question.category))];
  const [category, setCategory] = useRecoilState(selectedChoiceCategoryAtom);

  const disableBtn = () => {
    return !category;
  };

  useBeforeUnload();

  return (
    <div className="flex flex-col gap-5 w-full h-full bg-background-lightgray p-8 rounded-2xl relative">
      <h2 className="text-[20px] font-bold">면접 전 설정해주세요</h2>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-end">
          <Dropdown
            size="sm"
            color="white"
            selected={category}
            onSelect={setCategory}
            data={categories}
          />
          <p className="text-[#7D7D7D] mb-2 font-bold">전체 질문 카테고리를 선택해주세요</p>
        </div>
        <div
          className={`flex flex-col gap-2 overflow-y-auto items-center h-[220px] ${
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
      </div>

      <div className="flex flex-col gap-2 ">
        <p className="text-[#7D7D7D] font-bold">* 개별 질문당 시간을 설정해주세요</p>
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
      <PreventBackModal />
      <PreventTabletModal />
    </div>
  );
}
