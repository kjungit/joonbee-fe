'use client';
import { getInterview } from '@/app/apis/services/interview';
import InterviewCard from '@/components/common/InterviewCard';
import { RadiusButton } from '@/components/common/RadiusButton';
import Dropdown from '@/components/ui/Dropdown';
import ModalPortal from '@/components/ui/ModalPortal';
import { CategoryName } from '@/types/question';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react';
import useSWR from 'swr';
import DetailInterview from './DetailInterview';
import SkeletonInterview from './SkeletonInterview';

export type QuestionItemType = {
  questionId: string;
  questionContent: string;
};

export interface InterviewItemType {
  interviewId: string;
  categoryName: string;
  questions: QuestionItemType[];
  likeCount: string;
  thumbnail: string;
  memberId: string;
}

export default function InterviewSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectInterview, setSelectInterview] = useState<null | InterviewItemType>(null);
  const [categorySelect, setCategorySelect] = useState<CategoryName>('');
  const [interviewData, setInterviewData] = useState(null);
  const router = useRouter();

  const { data, isLoading } = useSWR<InterviewItemType[]>(
    ['/api/interview/all', categorySelect],
    () => getInterview({ page: 0, category: categorySelect }),
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );

  const onClickOpen = (e: MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    console.log(selectInterview);
  }, [data, selectInterview]);

  return (
    <section className=" pt-8 flex flex-col bg-gray-light w-full items-center border-b-2 border-b-gray-primary ">
      <div className="max-w-[1024px] w-full px-5">
        <div>
          <Dropdown
            color="white"
            title="카테고리"
            size="md"
            selected={categorySelect}
            data={['fe', 'be', 'cs', 'mobile', 'ect', 'language']}
            onSelect={setCategorySelect}
          />
        </div>
        {isLoading && <SkeletonInterview />}
        <ul className="flex flex-wrap justify-between ">
          {data &&
            data.slice(0, 6).map(i => (
              <li
                key={i.interviewId}
                className="mt-8 w-full max-w-[320px]"
                onClick={e => {
                  setSelectInterview(i);
                  onClickOpen(e);
                }}>
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
        {isOpen && (
          <ModalPortal>
            {selectInterview && (
              <div onClick={onClickOpen}>
                <DetailInterview item={selectInterview} onClickClose={() => setIsOpen(false)} />
              </div>
            )}
          </ModalPortal>
        )}
      </div>
    </section>
  );
}
