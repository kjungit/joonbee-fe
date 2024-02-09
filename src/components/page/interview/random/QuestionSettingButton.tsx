'use client';
import ButtonTimeSetting from '@/components/common/ButtonTimeSetting';
import DropdownCategory from '@/components/common/DropdownCategory';
import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';

import { questionCountAtom } from '@/recoil/interviewSetting/atoms';
import {
  selectedRandomCategoryAtom,
  selectedRandomSubcategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { selectedSubcategoryListAtom } from '@/recoil/selectedSubcategoryList/atom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type QuestionSettingButtonProps = {
  onClick?: () => void;
};

export default function QuestionSettingButton({ onClick }: QuestionSettingButtonProps) {
  const [questionCount, setQuestionCount] = useRecoilState(questionCountAtom);
  const [subcategories, setSubcategories] = useRecoilState(selectedSubcategoryListAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedRandomCategoryAtom);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const buttonValues = [2, 4, 6, 8, 10];
  const handleClickQuestionCount = (value: number) => {
    setQuestionCount(value);
  };
  const disableBtn = () => {
    return !selectedCategory;
  };

  // 카테고리 여러개 선택
  // const uniqueSubcategories = Array.from(new Set(subcategories));
  // const handleRemoveSubcategory = (subcategory: SubcategoryName) => {
  //   setSubcategories(prevSubcategories => prevSubcategories.filter(item => item !== subcategory));
  // };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-bold">면접 카테고리를 선택해주세요</h3>
      </div>
      <div className="flex gap-5">
        <div className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
          질문 카테고리
        </div>
        {/* {uniqueSubcategories.map(subcategory => (
          <Button color="white" key={subcategory} size="auto" text="xs" className="relative">
            <p className="inline-block">{subcategory}</p>
            <VariableIcon
              name="close"
              size={16}
              onClick={() => handleRemoveSubcategory(subcategory)}
              className="absolute top-1 right-1"
            />
          </Button>
        ))} */}
        {/* <DropdownCategory
          size="sm"
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedSubcategory={setSelectedSubcategory}
        /> */}
        <Dropdown
          color="white"
          title="카테고리"
          size="sm"
          selected={selectedCategory}
          data={['fe', 'be', 'cs', 'mobile', 'etc', 'language']}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className="flex gap-5">
        <div className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
          질문 수
        </div>
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
        size="lg"
        text="sm"
        onClick={onClick}
        disabled={disableBtn()}
        className="absolute bottom-9 right-[50px]">
        랜덤 면접 질문 보기
      </Button>
    </div>
  );
}
