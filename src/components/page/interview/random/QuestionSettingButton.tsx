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
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function QuestionSettingButton() {
  const [questionCount, setQuestionCount] = useRecoilState(questionCountAtom);
  const [subcategories, setSubcategories] = useRecoilState(selectedSubcategoryListAtom);
  const buttonValues = [2, 4, 6, 8, 10];

  const handleClickQuestionCount = (value: number) => {
    setQuestionCount(value);
  };

  const uniqueSubcategories = Array.from(new Set(subcategories));

  const handleRemoveSubcategory = (subcategory: SubcategoryName) => {
    setSubcategories(prevSubcategories => prevSubcategories.filter(item => item !== subcategory));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-5 items-center">
        <DropdownCategory />
        <h3 className="text-[16px] font-bold">면접 카테고리를 선택해주세요</h3>
      </div>

      <div className="flex gap-5">
        <Button color="darkNavy" text="sm">
          질문 카테고리
        </Button>

        {uniqueSubcategories.map(subcategory => (
          <Button color="white" key={subcategory} size="dropdown-xs" text="xs" className="relative">
            {subcategory}
            <div className="absolute top-2 right-2">
              <VariableIcon
                name="close"
                size={16}
                onClick={() => handleRemoveSubcategory(subcategory)}
              />
            </div>
          </Button>
        ))}
      </div>

      <div className="flex gap-5">
        <Button color="darkNavy" text="sm">
          질문 수
        </Button>
        {buttonValues.map(value => (
          <Button
            color={`${questionCount === value ? 'darkNavy' : 'white'}`}
            key={value}
            size="setting"
            text="sm"
            onClick={() => handleClickQuestionCount(value)}>
            {value}
          </Button>
        ))}
      </div>
      <ButtonTimeSetting />
    </div>
  );
}
