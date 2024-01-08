'use client';
import { MyInterviewCard } from '@/components/common/MyInterviewCard';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import ModalPortal from '@/components/ui/ModalPortal';
import useInfiniteMyInterview from '@/hooks/my/useInfiniteMyInterview';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function InterviewComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [categorySort, setCategorySort] = useState<'my_interview' | 'liked' | null>('my_interview');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const onClickSort = (item: ItemProps) => {
    router.push('my' + '?' + createQueryString('sort', item.id === 1 ? 'my_interview' : 'liked'));
  };
  const onClickOpen = (e: React.MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const { newData, setTarget, myInterviewMutate } = useInfiniteMyInterview(categorySort);

  useEffect(() => {
    setCategorySort(searchParams.get('sort') as 'my_interview' | 'liked' | null);
  }, [newData]);

  return (
    <>
      <RadioButtonGroup
        groupName="sub-category"
        size="sm"
        data={[
          { id: 1, text: '내 면접' },
          { id: 2, text: '좋아요' },
        ]}
        onClickFunc={onClickSort}
        defaultId={searchParams.get('sort') === 'my_interview' ? 1 : 2}
      />
      <ul className="flex flex-wrap w-full mt-4 gap-4 max-h-[450px] overflow-y-scroll py-2">
        {newData &&
          newData.map(i => (
            <MyInterviewCard
              selectInterview={searchParams.get('sort') as 'my_interview' | 'liked'}
              mutate={myInterviewMutate}
              key={i.interviewId}
              categoryName={i.categoryName}
              interviewId={i.interviewId}
              questionCount={i.questionCount}
              onClick={() => setIsOpen(true)}
            />
          ))}
        <div ref={setTarget}></div>
      </ul>
      {isOpen && (
        <ModalPortal>
          {
            <div onClick={onClickOpen}>
              <div className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
                <div
                  onClick={onClickOpen}
                  className="bg-white border-4  border-main-primary gap-4 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl"></div>
              </div>
            </div>
          }
        </ModalPortal>
      )}
    </>
  );
}
