'use client';
import InterviewCard from '@/components/common/InterviewCard';
import { RadiusButton } from '@/components/common/RadiusButton';
import Dropdown from '@/components/ui/Dropdown';
import ModalPortal from '@/components/ui/ModalPortal';
import { CategoryName } from '@/types/question';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react';
import DetailInterview from './DetailInterview';
import SkeletonInterview from './SkeletonInterview';
import Image from 'next/image';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import useInterviewAll from '@/hooks/main/useInterviewAll';
import useSWR from 'swr';
import { getInterview } from '@/app/apis/services/interview';
import { sortType } from '@/constants/apiState';
import useInfiniteInterview from '@/hooks/interview/useInfiniteInterview';

export type QuestionItemType = {
  questionId: string;
  questionContent: string;
};

export interface InterviewItemType {
  interviewId: number;
  categoryName: string;
  nickname: string;
  questions: QuestionItemType[];
  likeCount: string;
  liked: boolean;
  thumbnail: string;
  memberId: string;
  categorySelect?: CategoryName;
  current?: number;
}

export default function InterviewSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<number>(1);

  const [selectInterview, setSelectInterview] = useState<null | InterviewItemType>(null);
  const [categorySelect, setCategorySelect] = useState<CategoryName>('');
  const router = useRouter();

  // const {
  //   data,
  //   isLoading,
  //   mutate: interviewAllMutate,
  // } = useSWR<InterviewItemType[]>(
  //   ['/api/interview/all', categorySelect, current],
  //   () => getInterview({ categorySelect, current: sortType[current] }),
  //   {
  //     revalidateIfStale: false,
  //   },
  // );

  const { newData, isLoading, setTarget } = useInfiniteInterview(categorySelect, current);

  const onClickCategory = (item: ItemProps) => {
    setCurrent(item.id);
  };
  const onClickOpen = (e: MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const findInterview = newData?.find(item => selectInterview?.interviewId === item.interviewId);
    findInterview && setSelectInterview(findInterview);
  }, [newData]);

  useEffect(() => {
    console.log(categorySelect);
  }, [categorySelect]);

  return (
    <section className="pt-8 flex flex-col bg-gray-light w-full items-center border-b-2 border-b-gray-primary ">
      <div className="max-w-[1024px] w-full px-5">
        <div className="flex justify-between w-full items-end">
          <Dropdown
            color="white"
            title="카테고리"
            size="md"
            selected={categorySelect}
            data={['fe', 'be', 'cs', 'mobile', 'etc', 'language']}
            onSelect={setCategorySelect}
          />
          <RadioButtonGroup
            defaultId={1}
            groupName="main-category"
            size="sm"
            data={[
              { id: 1, text: '최신순' },
              { id: 2, text: '좋아요' },
            ]}
            onClickFunc={onClickCategory}
          />
        </div>
        {isLoading && <SkeletonInterview />}
        <ul className="md:flex md:flex-wrap justify-between w-full">
          {newData && newData?.length ? (
            newData.slice(0, 6).map(i => (
              <li
                key={i.interviewId}
                className="mt-8 w-full  md:max-w-[320px] "
                onClick={e => {
                  setSelectInterview(i);
                  onClickOpen(e);
                }}>
                <InterviewCard props={{ ...i, categorySelect, current }} />
              </li>
            ))
          ) : (
            <div className="w-full gap-4 flex justify-center items-center py-20 flex-col">
              <Image src="/box.png" alt="emptybox" width={80} height={80} />
              <div className="gap-2 flex flex-col items-center">
                <p className="font-bold text-xl text-main-primary">
                  선택하신 {categorySelect}에 등록된 질문이 없어요!
                </p>
                <p className="font-bold text-lg">다른 카테고리를 확인해보세요.</p>
              </div>
            </div>
          )}
        </ul>
        <div className="flex justify-center my-12">
          <RadiusButton
            text="sm"
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
                <DetailInterview
                  current={current}
                  categorySelect={categorySelect}
                  item={selectInterview}
                  onClickClose={() => setIsOpen(false)}
                />
              </div>
            )}
          </ModalPortal>
        )}
      </div>
    </section>
  );
}
