import QuestionForm from '@/components/common/QuestionForm';
import React from 'react';

const data = [
  { category: '프론트엔드', subcategory: ['React', 'Vue', 'Nextjs'] },
  { category: '백엔드', subcategory: ['DB', 'Express', 'MSA'] },
  { category: 'CS', subcategory: ['Docker', '운영체제', '컴퓨터구조'] },
  { category: '모바일', subcategory: ['IOS', '플러터'] },
  { category: '기타', subcategory: ['Git'] },
];

export default function QuestionChoice() {
  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px]">
      <QuestionForm data={data} />
    </section>
  );
}
