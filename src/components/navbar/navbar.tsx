'use client';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { selectMenuState } from '@/recoils/home/selectMenu/atom';
import { usePathname, useSearchParams } from 'next/navigation';
import { InterviewMenu } from '@/components/navbar/interviewMenu';
import { CategoryName, SubcategoryName } from '@/types';
import { selectQuestionCategoryState } from '@/recoils/home/question/selectQuestionCategory/atom';
import Image from 'next/image';
import { QuestionMenu } from '@/components/navbar/questionMenu';
import { MyMenu } from './myMenu';
import QuestionProgressMenu from './questionProgressMenu';
import ChoiceSettingMenu from './choiceSettingMenu';
import { isClickNextBtnAtom } from '@/recoils/interview/atom';
import { VariableIcon } from '../@common/variableIcon';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useRecoilState(NavbarIsOpenAtom);
  const [selectQuestionCategory, setSelectQuestionCategory] = useRecoilState(
    selectQuestionCategoryState,
  );

  const isClickNextBtn = useRecoilValue(isClickNextBtnAtom);
  const selectMenu = useRecoilValue(selectMenuState);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const fieldParams = searchParams.get('Qfield') as CategoryName;
  const subFieldParams = searchParams.get('subField') as SubcategoryName;
  const categoryParams = searchParams.get('category');
  const resetSelectInterview = useResetRecoilState(selectInterviewState);

  useEffect(() => {
    setSelectQuestionCategory({
      category: fieldParams || 'fe',
      subCategory: subFieldParams || 'react',
    });
  }, [selectMenu]);

  const onClickOpen = () => {
    setIsOpen(!isOpen);
    resetSelectInterview();
  };

  return (
    <div
      className={`md:min-w-[260px] min-w-[50px] relative questionListHeight effect-white text-gray-dark bg-white ${
        isOpen ? '!min-w-[260px]' : 'md:min-w-[260px] min-w-[50px]'
      }`}>
      <div
        className={`flex absolute top-2 right-2 md:hidden hover:bg-blue-light rounded-md p-2 ${
          isOpen && '!justify-end '
        }`}>
        <VariableIcon name="bar" onClick={onClickOpen} />
      </div>
      <div
        className={`h-full md:min-w-[260px] min-w-[50px] hidden md:block ${
          isOpen ? '!min-w-[260px] !block' : 'md:min-w-[260px] min-w-[50px]'
        }`}>
        {pathName === '/' && categoryParams === null && (
          <div className="mt-24 flex justify-center">
            <Image src="/bgItem_1.png" alt="bgItem_1" width={216} height={316} />
          </div>
        )}
        {pathName === '/' && categoryParams === 'interview' && <InterviewMenu />}
        {pathName === '/' && categoryParams === 'question' && <QuestionMenu />}
        {pathName === '/my' && <MyMenu />}
        {pathName === '/interview/progress' && <QuestionProgressMenu />}
        {pathName === '/interview/choice/setting' && !isClickNextBtn && <ChoiceSettingMenu />}
      </div>
    </div>
  );
}
