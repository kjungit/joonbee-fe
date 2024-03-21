import { Accordion } from '@/components/@common/accordion';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { questionTitle } from '@/constants/question';
import { useGetDetailInterview } from '@/queries/interview/useGetDetailInterview';
import { selectMyInterviewAtom } from '@/recoils/user/seletMyInterview/atom';
import { QuestionContentsProps, ViewInterfaceProps } from '@/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
export const MyInterviewSection = () => {
  const [selectDetail, setSelectDetail] = useState<ViewInterfaceProps>({
    gptOpinion: '',
    questionContents: [],
  });
  const selectMyInterview = useRecoilValue(selectMyInterviewAtom);
  const searchParams = useSearchParams();
  const detailIdParams = searchParams.get('detailId');

  const { detailInterview, isDetailSuccess, isDetailFetch } = useGetDetailInterview(
    Number(detailIdParams) || selectMyInterview.interviewId,
  );

  useEffect(() => {
    if (detailInterview) {
      setSelectDetail({
        ...detailInterview,
        gptOpinion: detailInterview.gptOpinion,
        questionContents: detailInterview.questionContents.map(item => ({
          ...item,
          questionId: item.questionId,
          questionContent: item.questionContent,
          isOpen: false,
          infoList: {
            answerContent: {
              id: 'answerContent',
              value: item.answerContent,
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
  }, [isDetailSuccess, isDetailFetch, selectMyInterview]);

  const handleClickQuestion = (question: QuestionContentsProps) => {
    const updateInterview = selectDetail.questionContents.map(item => {
      if (item.questionId === question.questionId) {
        return { ...question, isOpen: !item.isOpen };
      }
      return item;
    });
    setSelectDetail({
      ...selectDetail,
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
    setSelectDetail({
      ...selectDetail,
      questionContents: selectDetail.questionContents.map(content =>
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
    <>
      {detailInterview ? (
        <div>
          <div className="flex h-[54px] effect-white w-full items-center px-4">
            <div className="flex  gap-4 items-center">
              <Text size="xl" weight="md">
                프론트엔드
              </Text>
              <div className="flex items-center justify-center h-6 w-[90px] effect-white rounded-md">
                <VariableIcon name="document" size={18} />
                <Text size="lg" weight="md" className="p-1">
                  질문 {selectMyInterview.questionCount || selectDetail.questionContents.length}개
                </Text>
              </div>
            </div>
          </div>

          {selectDetail.gptOpinion && (
            <Accordion title="전체적인 면접에 대한 느낌이에요." isBorder isMain>
              <Text size="lg" weight="sm" className="px-11">
                {selectDetail.gptOpinion}
              </Text>
            </Accordion>
          )}

          {selectDetail.questionContents &&
            selectDetail.questionContents.map(question => (
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
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
          <Image src="/desktop.png" width={300} height={300} alt="desktop" />
          <Text size="lg" weight="md" className="p-1">
            내 면접 결과를 확인해보세요.
          </Text>
        </div>
      )}
    </>
  );
};
