'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { QuestionCard } from '@/components/common/QuestionCard';
import SlideSection from './SlideSection';
import DropdownCategory from '@/components/common/DropdownCategory';

const data = [
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
  'react에 대해서 설명해주세요.',
];
const COLOR_NUMBER = [2, 3, 6, 7, 10, 11, 14, 15];

export default function QuestionSection() {
  const [select, setSelect] = useState('');

  return (
    <section className="flex flex-col items-center bg-blue-light pb-[200px]">
      <h3 className="mt-14 mb-4  text-main-primary text-center text-2xl font-bold">
        여러 언어의 질문을 찾아보세요.
      </h3>
      <SlideSection />

      <div className="max-w-[1024px] w-full mt-14">
        <div className="flex gap-6">
          <DropdownCategory color="white" />
        </div>

        <ul className="flex flex-wrap gap-4 justify-between mt-10">
          {data.map((i, index) => (
            <QuestionCard
              key={index}
              size="md"
              color={COLOR_NUMBER.includes(index + 1) ? 'gray' : 'navy'}
              isCopy
              btnColor={COLOR_NUMBER.includes(index + 1) ? 'black' : 'white'}>
              {i}
            </QuestionCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
