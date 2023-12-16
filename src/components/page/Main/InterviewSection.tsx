'use client';
import { getInterview } from '@/app/apis/services/interview';
import InterviewCard from '@/components/common/InterviewCard';
import { RadiusButton } from '@/components/common/RadiusButton';
import Dropdown from '@/components/ui/Dropdown';
import { CategoryName } from '@/types/question';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export type QuestionItemType = {
  questionId: string;
  questionContent: string;
};

export interface InterviewItemType {
  id: string;
  categoryName: string;
  questions: QuestionItemType[];
  likeCount: string;
  thumbnail: string;
  memberId: string;
}

export default function InterviewSection() {
  const [select, setSelect] = useState<CategoryName>('');
  const router = useRouter();

  const { data } = useSWR<InterviewItemType[]>('/api/interview/all', () =>
    getInterview({ page: 0 }),
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <section className=" pt-8 flex flex-col bg-gray-light w-full items-center border-b-2 border-b-gray-primary ">
      <div className="w-[1024px]">
        <div>
          <Dropdown
            color="white"
            title="카테고리"
            size="md"
            selected={select}
            data={['프론트엔드', '백엔드', '언어', 'CS', '모바일', '기타']}
            onSelect={item => {
              setSelect(item);
            }}
          />
        </div>
        <ul className="flex flex-wrap justify-between">
          {data &&
            data.map(i => (
              <li key={i.id} className="mt-8">
                <InterviewCard props={i} />
              </li>
            ))}
        </ul>
        <div className="flex justify-center my-12">
          <RadiusButton
            text="md"
            color="dark"
            size="sm"
            onClick={() => {
              router.push('/questions');
            }}>
            전체 질문 보기
          </RadiusButton>
        </div>
      </div>
    </section>
  );
}
