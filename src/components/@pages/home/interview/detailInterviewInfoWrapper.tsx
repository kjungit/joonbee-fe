'use client';
import AlertModal from '@/components/@common/alertModal';
import IconButton from '@/components/@common/iconButton';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { MainCategory, SubCategory } from '@/constants/category';
import { useCategoryImageList } from '@/constants/toggleNavbarItem';
import { useModal } from '@/hooks/useModal';
import { useUserInfo } from '@/queries/user/useUserInfo';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import {
  interviewQuestionCountAtom,
  interviewTypeAtom,
  isClickNextBtnAtom,
} from '@/recoils/interview/atom';
import { myInterviewAtom } from '@/recoils/myInterview/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { CategoryName } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { GoCodeReview } from 'react-icons/go';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export default function DetailInterviewInfoWrapper() {
  const selectInterview = useRecoilValue(selectInterviewState);
  const resetSelectInterview = useResetRecoilState(selectInterviewState);
  const [isClickNextBtn, setIsClickNextBtn] = useRecoilState(isClickNextBtnAtom);
  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);
  const [mySelectCategory, setMySelectCategory] = useRecoilState(mySelectQuestionCategoryState);
  const [interviewType, setInterviewType] = useRecoilState(interviewTypeAtom);
  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);
  const userInfo = useRecoilValue(userInfoAtom);

  const setMyInterview = useSetRecoilState(myInterviewAtom);

  const { isOpened, onClose, onOpen } = useModal();
  const router = useRouter();

  const handleClose = () => {
    resetSelectInterview();
  };
  const handleMove = () => {
    if (!userInfo.thumbnail) {
      setIsOpen(true);
      return;
    }
    onOpen();
  };
  const handleConfirm = () => {
    setIsClickNextBtn(true);

    setMyInterview(oldState => ({
      ...oldState,
      categoryName: selectInterview.categoryName,
      questions: selectInterview.questions.map(q => ({
        questionId: q.questionId,
        questionContent: q.questionContent,
        answerContent: '',
      })),
    }));
    setMySelectCategory(prev => ({
      ...prev,
      category: selectInterview.categoryName as CategoryName,
    }));
    setQuestionCount(selectInterview.questions.length);
    setInterviewType('choice');

    router.push('/interview/choice/setting');
  };

  return (
    <>
      <div
        className={`md:w-full max-w-[800px] flex flex-col bg-white questionListHeight effect-white ${
          selectInterview.categoryName === '' && 'hidden'
        }`}>
        <div className="gap-4 p-6 flex justify-between">
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-5 items-center">
              <Text size="xl" weight="lg">
                {MainCategory[selectInterview.categoryName]}
              </Text>
              <div className="flex items-center gap-1">
                {useCategoryImageList.includes(selectInterview.subCategoryName[0]) ? (
                  <Image
                    src={`/icons/logo/${selectInterview.subCategoryName[0]}.png`}
                    alt="react"
                    width={30}
                    height={30}
                  />
                ) : (
                  <div className="w-[30px] h-[30px] flex items-center justify-center">
                    <GoCodeReview className="w-[24px] h-[24px] text-gray-light" />
                  </div>
                )}
                <Text size="lg" weight="lg">
                  {SubCategory[selectInterview.subCategoryName[0]]}
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                width={28}
                height={28}
                alt={selectInterview.nickname + ' image'}
                src={
                  !selectInterview.thumbnail || selectInterview.thumbnail === 'NONE'
                    ? '/basicProfile.png'
                    : selectInterview.thumbnail
                }
              />
              <Text size="lg" weight="lg" className="p-1">
                {selectInterview.nickname}
              </Text>
            </div>
          </div>
          <VariableIcon
            name="close"
            size={32}
            className="leading-5 cursor-pointer p-2"
            onClick={handleClose}
          />
        </div>
        <ul className="flex flex-col p-6 gap-5 justify-between ">
          {selectInterview.questions.map(item => (
            <div key={item.questionId} className="flex gap-2 leading-5 items-center">
              <div className="min-w-4 h-full pt-[2px]">
                <VariableIcon name="questionBox" size={16} className="leading-5 min-w-5 min-h-4" />
              </div>
              <Text size="lg" weight="md">
                {item.questionContent}
              </Text>
            </div>
          ))}
        </ul>
        <div className="mt-auto p-6 hidden justify-end lg:flex">
          <IconButton
            iconName="next_arrow.png"
            edge="end"
            size="md"
            className=""
            onClick={handleMove}>
            면접 보기
          </IconButton>
        </div>
      </div>
      <AlertModal
        isOpened={isOpened}
        onClose={onClose}
        onConfirm={handleConfirm}
        text="면접을 진행하시겠습니까?"
      />
    </>
  );
}
