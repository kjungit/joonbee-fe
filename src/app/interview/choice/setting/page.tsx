'use client';

import { Text } from '@/components/@common/text';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InterviewLoading from '@/components/@common/interviewLoading/';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import Image from 'next/image';
import { useGetMyQuestion } from '@/queries/question/useGetMyQuestion';
import QuestionCreateForm from '@/components/@pages/interview/choice/questionCreateForm';
import IconButton from '@/components/@common/iconButton';
import QuestionCheck from '@/components/@pages/interview/choice/questionCheck';
import CategoryDropdown from '@/components/@common/categoryDropdown';
import Dropdown from '@/components/@common/dropdown';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import QuestionTimeButtonGroup from '@/components/@common/questionTimeButtonGroup';

export default function ChoiceSettingPage() {
  const [isClickNextBtn, setIsClickNextBtn] = useState<boolean>(false);
  const [checkedQuestionList, setCheckedQuestionList] = useState<number[]>([]);
  // const [selectedCategory, setSelectedCategory] = useRecoilState(selectedChoiceCategoryAtom);
  // const [selectedSubcategory, setSelectedSubcategory] = useRecoilState(
  //   selectedChoiceSubcategoryAtom,
  // );

  const [mySelectCategory, setMySelectCategory] = useRecoilState(mySelectQuestionCategoryState);

  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/permission');
  const { questionData, setTarget } = useGetMyQuestion();

  const handleClickQuestion = (questionId: number) => {
    setCheckedQuestionList(prevList => {
      if (prevList.includes(questionId)) {
        return prevList.filter(id => id !== questionId);
      } else {
        return [...prevList, questionId];
      }
    });
  };

  const categoryList = [...new Set(questionData?.map(question => question.category))];

  console.log('categoryList', categoryList);

  return (
    <>
      {!isPressedBtn ? (
        !isClickNextBtn ? (
          <>
            <ul className=" flex flex-col gap-4 overflow-auto h-[600px]">
              {questionData?.map(item => (
                <QuestionCheck
                  key={item.questionId}
                  question={item}
                  isChecked={checkedQuestionList.includes(item.questionId)}
                  onCheckChange={() => handleClickQuestion(item.questionId)}
                />
              ))}
              <div ref={setTarget}></div>
            </ul>
            <CategoryDropdown
              selectedCategory={mySelectCategory.category}
              setSelectedCategory={(category: any) =>
                setMySelectCategory(prev => ({ ...prev, category }))
              }
              selectedSubcategory={mySelectCategory.subCategory}
              setSelectedSubcategory={(subCategory: any) =>
                setMySelectCategory(prev => ({ ...prev, subCategory }))
              }
              className="mb-4"
            />
            <QuestionCreateForm />
            <IconButton
              iconName="next_arrow.png"
              edge="end"
              size="md"
              className="absolute bottom-14 right-[300px]"
              onClick={() => setIsClickNextBtn(true)}>
              다음 단계
            </IconButton>
            <div className="absolute bottom-14 right-14">
              <Image src="/laptop.png" alt="laptop" width={220} height={180} />
            </div>
          </>
        ) : (
          <>
            <ul className=" flex flex-col gap-4 h-[600px] overflow-auto">
              {questionData
                ?.filter(question => checkedQuestionList.includes(question.questionId))
                .map(item => (
                  <QuestionCheck key={item.questionId} question={item} isChecked={true} />
                ))}
              <div ref={setTarget}></div>
            </ul>
            <Text as="h3" size="lg" weight="lg" className="mb-2">
              전체 질문 카테고리를 선택해주세요
            </Text>
            <div className="flex gap-10">
              <p className="min-w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
                카테고리
              </p>

              <Dropdown
                data={categoryList || []}
                selected={mySelectCategory.category}
                onSelect={category => setMySelectCategory(prev => ({ ...prev, category }))}
              />
            </div>
            <QuestionTimeButtonGroup />

            <IconButton
              iconName="next_arrow.png"
              edge="end"
              size="md"
              className="absolute bottom-14 right-[300px]"
              onClick={onMovePage}>
              다음 단계
            </IconButton>
            <div className="absolute bottom-14 right-14">
              <Image src="/laptop.png" alt="laptop" width={220} height={180} />
            </div>
          </>
        )
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
          <InterviewLoading />
          <Text size="xl">면접을 준비중입니다</Text>
        </div>
      )}
    </>
  );
}
