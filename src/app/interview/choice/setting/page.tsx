'use client';

import { Text } from '@/components/@common/text';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import InterviewLoading from '@/components/@common/interviewLoading/';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import QuestionCreateForm from '@/components/@pages/interview/choice/questionCreateForm';
import IconButton from '@/components/@common/iconButton';
import QuestionCheck from '@/components/@pages/interview/choice/questionCheck';
import CategoryDropdown from '@/components/@common/categoryDropdown';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import QuestionTimeButtonGroup from '@/components/@common/questionTimeButtonGroup';
import {
  addQuestionListSelector,
  addQuestionSelector,
  updateCategoryNameSelector,
  updateUserNameSelector,
} from '@/recoils/myInterview/withAdd';
import {
  interviewQuestionCountAtom,
  interviewTypeAtom,
  isOpenedCategoryResetModalAtom,
  isClickNextBtnAtom,
  checkedQuestionIdListAtom,
} from '@/recoils/interview/atom';
import userQueries from '@/queries/user/useGetUser';
import PreventBackModal from '@/components/@common/preventBackModal';
import AlertModal from '@/components/@common/alertModal';
import { useModal } from '@/hooks/useModal';
import PermissionButtonGroup from '@/components/@common/permissionButtonGroup';
import { useGetSettingQuestion } from '@/queries/interview/useGetSettingQuestion';
import { Category } from '@/constants/category';

export default function ChoiceSettingPage() {
  const [isClickNextBtn, setIsClickNextBtn] = useRecoilState(isClickNextBtnAtom);
  const [isClickMicrophone, setIsClickMicrophone] = useState<boolean>(false);
  const [isClickCamera, setIsClickCamera] = useState<boolean>(false);
  const [checkedQuestionIdList, setCheckedQuestionIdList] =
    useRecoilState(checkedQuestionIdListAtom);

  const {
    isOpened: isOpenedMaxQuestion,
    onClose: onCloseMaxQuestion,
    onOpen: onOpenMaxQuestion,
  } = useModal();

  const [mySelectCategory, setMySelectCategory] = useRecoilState(mySelectQuestionCategoryState);
  const checkedQuestionList = useRecoilValue(addQuestionSelector);
  const setQuestion = useSetRecoilState(addQuestionListSelector);
  const setUserName = useSetRecoilState(updateUserNameSelector);
  const setCategory = useSetRecoilState(updateCategoryNameSelector);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/permission');
  const { questionData, setTarget } = useGetSettingQuestion();

  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);

  const { data: userInfo } = userQueries.useGetInfo();

  const handleClickQuestion = (
    questionId: number,
    questionContent: string,
    category: string,
    isChecked: boolean,
  ) => {
    if (checkedQuestionIdList.length > 7 && !isChecked) {
      onOpenMaxQuestion();
      return;
    }

    setCheckedQuestionIdList(prevList => {
      const index = prevList.findIndex(item => item.questionId === questionId);
      if (index !== -1) {
        return prevList.filter(item => item.questionId !== questionId);
      } else {
        return [...prevList, { questionId, questionContent, category }];
      }
    });
  };

  useEffect(() => {
    setInterviewType('choice');
  }, []);

  useEffect(() => {
    const uniqueCategories = new Set(checkedQuestionIdList.map(item => item.category));
    setCategoryList([...uniqueCategories]);
  }, [checkedQuestionIdList]);

  const handleMove = () => {
    onMovePage();
    setUserName(userInfo?.nickName);
    setCategory(mySelectCategory.category);
  };

  useEffect(() => {
    if (isClickNextBtn) {
      if (!checkedQuestionIdList.length) {
        setCategoryList([mySelectCategory.category]);
        return;
      }

      setQuestion(
        checkedQuestionIdList.map(({ category, ...rest }) => ({
          ...rest,
          answerContent: '',
        })),
      );
      setQuestionCount(checkedQuestionIdList.length);
    }
  }, [isClickNextBtn]);

  useEffect(() => {
    setCheckedQuestionIdList([]);
  }, [mySelectCategory.category]);

  return (
    <>
      {!isPressedBtn ? (
        !isClickNextBtn ? (
          <div className="py-14 flex flex-col justify-between questionListHeight">
            <div>
              <Text as="h2" size="xl" weight="lg" className="mb-5">
                나의 질문
              </Text>
              <Text as="h2" size="md" weight="md" color="blue" className="mb-2">
                * 면접을 진행할 질문을 선택해주세요
              </Text>
              <ul className="overflow-auto h-[360px] mb-8 flex flex-col gap-2">
                {questionData?.map(item => (
                  <QuestionCheck
                    key={item.questionId}
                    question={item}
                    isChecked={checkedQuestionIdList.some(
                      checkedItem => checkedItem.questionId === item.questionId,
                    )}
                    onCheckChange={() =>
                      handleClickQuestion(
                        item.questionId,
                        item.questionContent,
                        item.category,
                        checkedQuestionIdList.some(
                          checkedItem => checkedItem.questionId === item.questionId,
                        ),
                      )
                    }
                  />
                ))}
                <div className="h-[1px]" ref={setTarget}></div>
              </ul>
            </div>
            <div>
              <div className="flex justify-between">
                <CategoryDropdown
                  direction="top"
                  size="md"
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
                <IconButton
                  iconName="next_arrow.png"
                  edge="end"
                  size="md"
                  onClick={() => setIsClickNextBtn(true)}
                  disabled={!checkedQuestionIdList.length}>
                  다음 단계
                </IconButton>
              </div>
              <QuestionCreateForm />
            </div>
          </div>
        ) : (
          <div className="py-14 questionListHeight flex flex-col justify-between">
            <div>
              <Text as="h2" size="xl" weight="lg" className="mb-5">
                선택한 질문
              </Text>
              <ul className="mb-8 h-[300px] overflow-auto">
                {checkedQuestionList.map(item => (
                  <QuestionCheck key={item.questionId} question={item} isChecked={true} />
                ))}
                <div className="h-[1px]" ref={setTarget}></div>
              </ul>
            </div>
            <div>
              <div className="mb-5">
                <Text as="h3" size="lg" className="mb-2">
                  전체 질문 카테고리를 선택해주세요
                </Text>
                <div className="flex gap-10">
                  <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
                    카테고리
                  </p>
                  <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
                    {Category[mySelectCategory.category]}
                  </p>
                </div>
              </div>
              <QuestionTimeButtonGroup />
              <div className="flex justify-between items-end">
                <PermissionButtonGroup
                  isClickMicrophone={isClickMicrophone}
                  setIsClickMicrophone={setIsClickMicrophone}
                  isClickCamera={isClickCamera}
                  setIsClickCamera={setIsClickCamera}
                />
                <IconButton
                  iconName="next_arrow.png"
                  edge="end"
                  size="md"
                  onClick={handleMove}
                  disabled={!isClickMicrophone}>
                  다음 단계
                </IconButton>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
          <InterviewLoading />
          <Text size="xl">면접을 준비중입니다</Text>
        </div>
      )}
      <AlertModal
        isOpened={isOpenedMaxQuestion}
        onClose={onCloseMaxQuestion}
        text="질문은 최대 8개 선택할 수 있습니다."
      />
      <PreventBackModal />
    </>
  );
}
