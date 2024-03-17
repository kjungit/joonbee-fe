'use client';
import InterviewLoading from '@/components/@common/interviewLoading';
import { Text } from '@/components/@common/text';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { usePostOpenAiResult } from '@/queries/interview/usePostOpenAiResult';
import { myInterviewState } from '@/recoils/myInterview/atom';
import { InterviewSaveData, QuestionContentsProps, ViewInterfaceProps } from '@/types';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useRecoilValue } from 'recoil';
import { Accordion } from '@/components/@common/accordion';
import { sequence } from '@/constants/sequence';
import { questionTitle } from '@/constants/question';
import { usePostSaveInterview } from '@/queries/interview/usePostSaveInterview';

export default function ResultPage() {
  const myInterviewData = useRecoilValue(myInterviewState);
  const [viewMutateData, setViewMutateData] = useState<ViewInterfaceProps>({
    gptOpinion: '',
    questionContents: [],
  });
  const [postMutateData, setPostViewMutateData] = useState<InterviewSaveData>({
    gptOpinion: '',
    categoryName: myInterviewData.categoryName,
    questions: [],
  });

  const { openAiTrigger, isMutate, openAiResultData, isSuccess } = usePostOpenAiResult();
  const { saveTrigger, isSaveSuccess } = usePostSaveInterview(postMutateData);
  const percent = useLoadingProgress(isMutate);

  useEffect(() => {
    openAiTrigger();
  }, []);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess && postMutateData.gptOpinion) {
      saveTrigger();
    }
  }, [postMutateData, isSuccess]);

  useEffect(() => {
    if (openAiResultData?.questions) {
      setPostViewMutateData({
        ...postMutateData,
        gptOpinion: openAiResultData?.gptOpinion || '',
        questions: openAiResultData.questions.map(item => ({
          questionId: item.questionId,
          questionContent:
            myInterviewData.questions.find(
              question => question.questionId === Number(item.questionId),
            )?.questionContent || '',
          answerContent:
            myInterviewData.questions.find(
              question => question.questionId === Number(item.questionId),
            )?.answerContent || '',
          evaluation: item.evaluation,
          commentary: item.commentary,
        })),
      });
      setViewMutateData({
        ...viewMutateData,
        gptOpinion: openAiResultData?.gptOpinion || '',
        questionContents: openAiResultData?.questions.map(item => ({
          ...item,
          questionId: item.questionId,
          questionContent:
            myInterviewData.questions.find(
              question => question.questionId === Number(item.questionId),
            )?.questionContent || '',
          isOpen: false,
          infoList: {
            answerContent: {
              id: 'answerContent',
              value:
                myInterviewData.questions.find(
                  question => question.questionId === Number(item.questionId),
                )?.answerContent || '',
              isOpen: false,
            },
            evaluation: {
              id: 'evaluation',
              value: item.evaluation,
              isOpen: false,
            },
            commentary: {
              id: 'commentary',
              value: item.commentary,
              isOpen: false,
            },
          },
        })),
      });
    }
  }, [openAiResultData]);

  useEffect(() => {
    console.log(viewMutateData);
  }, [viewMutateData]);

  const handleClickQuestion = (question: QuestionContentsProps) => {
    const updateInterview = viewMutateData.questionContents.map(item => {
      if (item.questionId === question.questionId) {
        return { ...question, isOpen: !item.isOpen };
      }
      return item;
    });
    setViewMutateData({
      ...viewMutateData,
      questionContents: updateInterview,
    });
  };

  const handleClickSubQuestion = ({
    questionId,
    valueName,
  }: {
    questionId: number;
    valueName: 'answerContent' | 'evaluation' | 'commentary';
  }) => {
    setViewMutateData({
      ...viewMutateData,
      questionContents: viewMutateData.questionContents.map(content =>
        content.questionId === questionId
          ? {
              ...content,
              infoList: {
                ...content.infoList,
                [valueName]: {
                  ...content.infoList[valueName],
                  isOpen: !content.infoList[valueName].isOpen,
                },
              },
            }
          : content,
      ),
    });
  };

  return (
    <div className="w-full overflow-auto questionListHeight">
      {!isSuccess ? (
        <div className="flex flex-col gap-4 items-center justify-center questionListHeight">
          <div className="flex flex-col items-center gap-2">
            <InterviewLoading interviewType="choice" />
            <Text size="xl" weight="lg" className="ml-2">
              {percent}%
            </Text>
          </div>
          <Text size="xl">면접 결과를 JOONBEE 중이에요.</Text>
          <TypeAnimation
            sequence={sequence}
            speed={20}
            className=" font-bold text-md"
            repeat={Infinity}
          />
        </div>
      ) : (
        <>
          {viewMutateData.gptOpinion && (
            <Accordion title="전체적인 면접에 대한 느낌이에요." isBorder isMain>
              <Text size="lg" weight="sm" className="px-11">
                {viewMutateData.gptOpinion}
              </Text>
            </Accordion>
          )}

          {viewMutateData.questionContents &&
            viewMutateData.questionContents.map(question => (
              <div key={question.questionId}>
                <Accordion
                  title={question.questionContent}
                  onClick={() => handleClickQuestion(question)}
                  isMain>
                  {question.isOpen && (
                    <>
                      {Object.values(question.infoList).map(item => (
                        <>
                          <Accordion
                            title={questionTitle[item.id]}
                            onClick={() =>
                              handleClickSubQuestion({
                                questionId: question.questionId,
                                valueName: item.id,
                              })
                            }>
                            {item.isOpen && (
                              <div className="pl-4 flex items-center">
                                <Text size="lg" weight="sm" className="px-11 font-normal">
                                  {item.value}
                                </Text>
                              </div>
                            )}
                          </Accordion>
                        </>
                      ))}
                    </>
                  )}
                </Accordion>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
