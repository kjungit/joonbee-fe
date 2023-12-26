'use client';
import ButtonTimeSetting from '@/components/common/ButtonTimeSetting';
import DropdownCategory from '@/components/common/DropdownCategory';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { VariableIcon } from '@/components/ui/VariableIcon';
import { questionCountAtom } from '@/recoil/interviewSetting/atoms';
import { selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { selectedSubcategoryListAtom } from '@/recoil/selectedSubcategoryList/atom';
import { SubcategoryName } from '@/types/question';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
export default function QuestionSettingButton() {
  const [questionCount, setQuestionCount] = useRecoilState(questionCountAtom);
  const [subcategories, setSubcategories] = useRecoilState(selectedSubcategoryListAtom);
  const buttonValues = [2, 4, 6, 8, 10];
  const router = useRouter();
  const handleClickQuestionCount = (value: number) => {
    setQuestionCount(value);
  };
  const disableBtn = () => {
    return subcategories.length === 0;
  };
  const handleNavigate = () => {
    router.push('/interview/permission');
  };
  const uniqueSubcategories = Array.from(new Set(subcategories));
  const handleRemoveSubcategory = (subcategory: SubcategoryName) => {
    setSubcategories(prevSubcategories => prevSubcategories.filter(item => item !== subcategory));
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-bold">면접 카테고리를 선택해주세요</h3>
        <DropdownCategory size="xs" />
      </div>
      <div className="flex gap-5">
        <Button color="darkNavy" text="xs" size="setting">
          질문 카테고리
        </Button>
        {uniqueSubcategories.map(subcategory => (
          <Button color="white" key={subcategory} size="auto" text="xs" className="relative">
            <p className="inline-block">{subcategory}</p>
            <VariableIcon
              name="close"
              size={16}
              onClick={() => handleRemoveSubcategory(subcategory)}
              className="absolute top-1 right-1"
            />
          </Button>
        ))}
      </div>
      <div className="flex gap-5">
        <Button color="darkNavy" text="xs" size="setting">
          질문 수
        </Button>
        {buttonValues.map(value => (
          <Button
            color={`${questionCount === value ? 'darkNavy' : 'white'}`}
            key={value}
            text="xs"
            size="setting"
            onClick={() => handleClickQuestionCount(value)}>
            {value}
          </Button>
        ))}
      </div>
      <ButtonTimeSetting />
      <Button
        color="blueSecondary"
        size="auto"
        text="sm"
        onClick={handleNavigate}
        disabled={disableBtn()}
        className="absolute bottom-9 right-[50px]">
        랜덤 면접 질문 보기
      </Button>
    </div>
  );
}
