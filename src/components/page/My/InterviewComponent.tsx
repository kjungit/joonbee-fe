'use client';
import { getInterviewDetail, getInterviewQuestionDetail } from '@/app/apis/services/member';
import { DetailQuestionCard } from '@/components/common/DetailQuestionCard';
import { MyInterviewCard } from '@/components/common/MyInterviewCard';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import { Button } from '@/components/ui/Button';
import ModalPortal from '@/components/ui/ModalPortal';
import useInfiniteMyInterview from '@/hooks/my/useInfiniteMyInterview';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import DetailQuestionInterview from '../interview/result/DetailQuestionInterview';
import InterviewResultCom from './InterviewResultCom';

type QuestionContent = {
  questionContent: string;
  questionId: number;
};
export interface DetailData {
  gptOpinion: string;
  questionContents: QuestionContent[];
}

export interface QuestionData {
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
  questionId: string;
  interviewId: string;
}

export default function InterviewComponent() {
  const [isMount, setIsMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [selectInterviewId, setSelectInterviewId] = useState(0);
  const [selectQuestionId, setSelectQuestionId] = useState(0);
  const [selectQuestion, setSelectQuestion] = useState({
    index: 0,
    questionId: '',
    questionContent: '',
    answerContent: '',
    commentary: '',
    evaluation: '',
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categorySort, setCategorySort] = useState<'my_interview' | 'liked' | null>('my_interview');
  const { newData, setTarget, myInterviewMutate } = useInfiniteMyInterview(categorySort);

  const { trigger: interviewTrigger, data: detailData } = useSWRMutation<DetailData, AxiosError>(
    ['api/member/interview/detail', selectInterviewId],
    () => getInterviewDetail(selectInterviewId),
    {
      onSuccess: () => {},
    },
  );

  const { trigger: detailQuestionTrigger } = useSWRMutation<QuestionData, AxiosError>(
    ['api/member/interview/question/detail', selectInterviewId, selectQuestionId],
    () => getInterviewQuestionDetail(selectInterviewId, selectQuestionId),
    {
      onSuccess: data => {
        setIsQuestionOpen(true);
        setSelectQuestion({
          index: selectQuestion.index,
          ...data,
        });
      },
    },
  );

  useEffect(() => {
    setIsMount(true);
  }, []);

  // 면접 클릭 시 해당 면접 요청
  useEffect(() => {
    if (isMount) {
      interviewTrigger();
    }
  }, [selectInterviewId]);

  // 질문 클릭 시 해당 질문 요청
  useEffect(() => {
    if (isMount) {
      detailQuestionTrigger();
    }
  }, [selectQuestionId]);

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
  const onClickDetailOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  const onClickDetailQuestionOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuestionOpen(false);
  };

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
              onHover={() => {
                setSelectInterviewId(i.interviewId);
              }}
              onClick={() => {
                setIsOpen(true);
                setSelectInterviewId(i.interviewId);
              }}
            />
          ))}
        <div ref={setTarget}></div>
      </ul>
      {isOpen && (
        <div
          onClick={onClickDetailOpen}
          className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className="bg-white border-4  border-main-primary gap-2 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl">
            <div className="flex w-full justify-between items-center min-h-[50px]">
              <h2 className="text-[20px] font-bold">면접 결과</h2>
              <Button text="sm" size="xs" color="darkGray" onClick={onClickDetailOpen}>
                닫기
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <InterviewResultCom gptOpinion={detailData?.gptOpinion}>
                <ul className="pb-4 flex flex-col gap-4 h-[240px] overflow-auto">
                  {detailData &&
                    detailData.questionContents?.map((item, idx) => (
                      <DetailQuestionCard
                        key={item.questionId}
                        question={item.questionContent}
                        questionCount={idx + 1}
                        onClick={() => {
                          setSelectQuestionId(item.questionId);
                          setSelectQuestion({
                            ...selectQuestion,
                            index: idx + 1,
                          });
                          setIsQuestionOpen(true);
                        }}
                      />
                    ))}
                </ul>
              </InterviewResultCom>
            </div>
          </div>
        </div>
      )}
      {isQuestionOpen && (
        <div onClick={onClickDetailQuestionOpen}>
          <DetailQuestionInterview
            selectQuestion={selectQuestion}
            setIsOpenSelect={setIsQuestionOpen}
          />
        </div>
      )}
    </>
  );
}
