'use client';
import InterviewLoading from '@/components/@common/interviewLoading';
import { Text } from '@/components/@common/text';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { usePostOpenAiResult } from '@/queries/interview/usePostOpenAiResult';
import { myInterviewAtom } from '@/recoils/myInterview/atom';
import { InterviewSaveData, QuestionContentsProps, ViewInterfaceProps } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useRecoilValue } from 'recoil';
import { Accordion } from '@/components/@common/accordion';
import { sequence } from '@/constants/sequence';
import { questionTitle } from '@/constants/question';
import { usePostSaveInterview } from '@/queries/interview/usePostSaveInterview';
import IconButton from '@/components/@common/iconButton';
import Button from '@/components/@common/button';
import ModalPortal from '@/components/@common/modalPortal';
import { VariableIcon } from '@/components/@common/variableIcon';
import useVideo from '@/hooks/interview/useVideo';
import { interviewVideoUrlAtom } from '@/recoils/interview/atom';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { onDownload } = useVideo();
  const videoUrl = useRecoilValue(interviewVideoUrlAtom);

  console.log('url', videoUrl);
  const router = useRouter();

  const myInterviewData = useRecoilValue(myInterviewAtom);
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

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
    <div className="w-full overflow-auto questionListHeight ">
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
        <div className="flex flex-col questionListHeight overflow-auto w-[800px]">
          <div className="pt-14">
            {viewMutateData.gptOpinion && (
              <Accordion title="전체적인 면접에 대한 느낌이에요." isBorder isMain>
                <Text size="lg" weight="sm" className="px-11">
                  {viewMutateData.gptOpinion}
                </Text>
              </Accordion>
            )}
            <ul className="pb-32">
              {viewMutateData.questionContents &&
                viewMutateData.questionContents.map(question => (
                  <li key={question.questionId}>
                    <Accordion
                      title={question.questionContent}
                      onClick={() => handleClickQuestion(question)}
                      isOpen={question.isOpen}
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
                                }
                                isOpen={item.isOpen}>
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
                  </li>
                ))}
            </ul>

            <div className="fixed bottom-14 flex justify-between w-[800px]">
              <div>
                {videoUrl && (
                  <div className="flex gap-2 items-end">
                    <Button size="md" className="" onClick={handleClickModal}>
                      영상 확인하기
                    </Button>
                    <Text size="sm">이 페이지를 벗어나면 영상은 삭제됩니다.</Text>
                  </div>
                )}
              </div>
              <IconButton
                iconName="next_arrow.png"
                edge="end"
                size="md"
                className=" "
                onClick={() => router.push('/my?category=interview&Ifield=fe')}>
                마이페이지
              </IconButton>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalPortal>
          <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen shadow-md flex items-center justify-center">
            <div className="w-[400px]  rounded-xl bg-white shadow-md relative p-5">
              <div className="flex justify-between mb-5">
                <Text size="lg" weight="md">
                  INTERVIEW 영상
                </Text>
                <VariableIcon
                  onClick={handleClickModal}
                  name="close"
                  className="absolute right-5 top-5"
                />
              </div>

              <video height="360" controls ref={videoRef} className="mb-3 w-[360px] rounded-xl">
                <source src={videoUrl} type="video/webm" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
              <div className="flex w-full justify-end">
                <Button size="sm" className="px-2" onClick={() => onDownload(videoUrl)}>
                  영상 다운로드
                </Button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
