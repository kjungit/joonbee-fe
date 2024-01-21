'use client';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import { CategoryName } from '@/types/question';
import React, { MouseEvent, useEffect, useState } from 'react';
import SkeletonInterview from '@/components/page/Main/SkeletonInterview';
import Dropdown from '@/components/ui/Dropdown';
import InterviewCard from '@/components/common/InterviewCard';
import Image from 'next/image';
import ModalPortal from '@/components/ui/ModalPortal';
import DetailInterview from '@/components/page/Main/DetailInterview';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import useInfiniteInterview from '@/hooks/interview/useInfiniteInterview';

export default function QuestionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<number>(1);
  const [selectInterview, setSelectInterview] = useState<null | InterviewItemType>(null);
  const [categorySelect, setCategorySelect] = useState<CategoryName>('');
  const onClickCategory = (item: ItemProps) => {
    setCurrent(item.id);
  };

  const { newData, isLoading, setTarget, interviewMutate } = useInfiniteInterview(
    categorySelect,
    current,
  );

  const onClickOpen = (e: MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const findInterview = newData?.find(item => selectInterview?.interviewId === item.interviewId);
    findInterview && setSelectInterview(findInterview);
  }, [newData]);

  return (
    <div className="bg-gray-light min-h-full w-full flex justify-center py-10">
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
            groupName="question-category"
            size="sm"
            data={[
              { id: 1, text: '최신순' },
              { id: 2, text: '좋아요' },
            ]}
            onClickFunc={onClickCategory}
          />
        </div>
        {isLoading && <SkeletonInterview />}
        <ul className="flex flex-wrap justify-between ">
          {newData?.length ? (
            newData.map(i => (
              <li
                key={i.interviewId}
                className="mt-8 w-full max-w-[320px]"
                onClick={e => {
                  setSelectInterview(i);
                  onClickOpen(e);
                }}>
                <InterviewCard props={{ ...i, interviewMutate }} />
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
        <div ref={setTarget}></div>

        {isOpen && (
          <ModalPortal>
            {selectInterview && (
              <div onClick={onClickOpen}>
                <DetailInterview
                  interviewMutate={interviewMutate}
                  item={selectInterview}
                  onClickClose={() => setIsOpen(false)}
                />
              </div>
            )}
          </ModalPortal>
        )}
      </div>
    </div>
  );
}
