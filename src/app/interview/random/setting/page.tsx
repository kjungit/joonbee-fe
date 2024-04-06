'use client';

import IconButton from '@/components/@common/iconButton';
import Button from '@/components/@common/button';
import { Text } from '@/components/@common/text';
import { interviewQuestionCountAtom } from '@/recoils/interview/atom';

import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import CategoryDropdown from '@/components/@common/categoryDropdown';
import InterviewLoading from '@/components/@common/interviewLoading';
import Image from 'next/image';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import QuestionTimeButtonGroup from '@/components/@common/questionTimeButtonGroup';
import { updateCategoryNameSelector, updateUserNameSelector } from '@/recoils/myInterview/withAdd';
import userQueries from '@/queries/user/useGetUser';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import PreventBackModal from '@/components/@common/preventBackModal';

export default function RandomSettingPage() {
  const [mySelectCategory, setMySelectCategory] = useRecoilState(mySelectQuestionCategoryState);
  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);
  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/permission');

  const setUserName = useSetRecoilState(updateUserNameSelector);
  const setCategory = useSetRecoilState(updateCategoryNameSelector);

  const { data: userInfo } = userQueries.useGetInfo();

  const handleMove = () => {
    setUserName(userInfo?.nickName);
    setCategory(mySelectCategory.category);
    onMovePage();
  };

  useBeforeUnload();

  return (
    <>
      {!isPressedBtn ? (
        <div className="py-14 flex flex-col justify-between h-full">
          <div>
            <Text as="h2" size="xl" weight="lg" className="mb-5">
              면접 설정
            </Text>
            <div className="mb-4">
              <Text as="h3" size="lg" className="mb-2">
                전체 질문 카테고리를 선택해주세요
              </Text>
              <div className="flex gap-10">
                <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
                  카테고리
                </p>
                <CategoryDropdown
                  selectedCategory={mySelectCategory.category}
                  setSelectedCategory={(category: any) =>
                    setMySelectCategory(prev => ({ ...prev, category }))
                  }
                  selectedSubcategory={mySelectCategory.subCategory}
                  setSelectedSubcategory={(subCategory: any) =>
                    setMySelectCategory(prev => ({ ...prev, subCategory }))
                  }
                  size="md"
                  className="mb-4"
                />
              </div>
            </div>
            <div className="mb-4">
              <Text as="h3" size="lg" className="mb-2">
                질문 개수를 설정해주세요
              </Text>
              <div className="flex gap-10">
                <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
                  질문 개수
                </p>
                <div className="flex gap-5">
                  <Button
                    size="square"
                    color={questionCount === 2 ? 'primary' : 'white'}
                    onClick={() => setQuestionCount(2)}
                    className="shadow-md">
                    2
                  </Button>
                  <Button
                    size="square"
                    color={questionCount === 4 ? 'primary' : 'white'}
                    onClick={() => setQuestionCount(4)}
                    className="shadow-md">
                    4
                  </Button>
                  <Button
                    size="square"
                    color={questionCount === 6 ? 'primary' : 'white'}
                    onClick={() => setQuestionCount(6)}
                    className="shadow-md">
                    6
                  </Button>
                  <Button
                    size="square"
                    color={questionCount === 8 ? 'primary' : 'white'}
                    onClick={() => setQuestionCount(8)}
                    className="shadow-md">
                    8
                  </Button>
                  <Button
                    size="square"
                    color={questionCount === 10 ? 'primary' : 'white'}
                    onClick={() => setQuestionCount(10)}
                    className="shadow-md">
                    10
                  </Button>
                </div>
              </div>
            </div>
            <QuestionTimeButtonGroup />
          </div>
          <IconButton
            className="self-end"
            iconName="next_arrow.png"
            edge="end"
            size="md"
            onClick={handleMove}>
            다음 단계
          </IconButton>
          <div className="absolute top-14 right-14">
            <Image src="/laptop.png" alt="laptop" width={220} height={180} />
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
          <InterviewLoading />
          <Text size="xl">랜덤 면접을 준비중입니다</Text>
        </div>
      )}
      <PreventBackModal />
    </>
  );
}
