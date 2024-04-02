'use client';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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

export default function Navbar() {
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

  useEffect(() => {
    setSelectQuestionCategory({
      category: fieldParams || 'fe',
      subCategory: subFieldParams || 'react',
    });
  }, [selectMenu]);

  return (
    <div className="min-w-[260px] questionListHeight effect-white">
      <div className="h-full">
        {pathName === '/' && categoryParams === null && (
          <div className="mt-24">
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
