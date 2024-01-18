'use client';
import { MyInterviewCard } from '@/components/common/MyInterviewCard';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import { Button } from '@/components/ui/Button';
import ModalPortal from '@/components/ui/ModalPortal';
import useInfiniteMyInterview from '@/hooks/my/useInfiniteMyInterview';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function InterviewComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectInterview, setSelectInterview] = useState();
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
          <div onClick={onClickOpen}>
            <div
              onClick={onClickOpen}
              className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
              <div
                onClick={e => {
                  e.stopPropagation();
                }}
                className="bg-white border-4  border-main-primary gap-8 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl">
                <div className="flex justify-between items-center gap-4">
                  <div className="w-full flex items-center font-bold border-gray-primary border-b-2 pb-2 gap-4">
                    <h2 className="text-3xl w-24">질문 </h2>
                    {/* <p>{selectQuestion.questionContent}</p> */}
                  </div>
                  <Button size="xs" color="darkGray" text="sm" onClick={() => setIsOpen(false)}>
                    닫기
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Image width={30} height={30} src="/icons/emoji/pencil.png" alt="pencil" />
                    <h4 className="font-bold text-lg">내가 한 답변이에요.</h4>
                  </div>
                  <div className="text-sm break-keep overflow-auto max-h-[140px] border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
                    {/* {selectQuestion.answerContent} */}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex gap-2">
                      <Image width={30} height={30} src="/icons/emoji/zoom.png" alt="zoom" />
                      <h4 className="font-bold text-lg">참고하면 좋을것 같아요.</h4>
                    </div>
                    <div className="text-sm break-keep overflow-auto border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
                      {/* {selectQuestion.commentary} */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex gap-2">
                      <Image width={30} height={30} src="/icons/emoji/bubble.png" alt="bubble" />
                      <h4 className="font-bold text-lg">답변에 대한 느낌이에요.</h4>
                    </div>
                    <div className="text-sm break-keep overflow-auto border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
                      {/* {selectQuestion.evaluation} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
