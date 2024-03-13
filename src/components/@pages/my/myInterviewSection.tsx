import { Accordion } from '@/components/@common/accordion/accordion';
import { Text } from '@/components/@common/text/text';
import { VariableIcon } from '@/components/@common/variableIcon/variableIcon';
import { useGetDetailInterview } from '@/queries/interview/useGetDetailInterview';
import { selectMyInterviewState } from '@/recoils/user/seletMyInterview/atom';
import { MyClickInterview } from '@/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const MyInterviewSection = () => {
  const [selectDetail, setSelectDetail] = useState({
    gptOpinion: '',
    questionContents: [
      {
        questionId: 0,
        questionContent: {
          id: 'questionContent',
          value: '',
          isOpen: false,
        },
        evaluation: {
          id: 'evaluation',
          value: '',
          isOpen: false,
        },
        commentary: {
          id: 'commentary',
          value: '',
          isOpen: false,
        },
        isOpen: false,
      },
    ],
  });
  const selectMyInteview = useRecoilValue(selectMyInterviewState);
  const searchParams = useSearchParams();
  const detailIdParams = searchParams.get('detailId');

  const { detailInterview, isSuccess } = useGetDetailInterview(
    Number(detailIdParams) || selectMyInteview.interviewId,
  );

  useEffect(() => {
    if (detailInterview) {
      setSelectDetail({
        ...detailInterview,
        questionContents: detailInterview.questionContents.map(item => ({
          questionId: item.questionId,
          questionContent: {
            id: 'questionContent',
            value: item.questionContent,
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
          isOpen: item.isOpen,
        })),
      });
      console.log(selectDetail);
    }
  }, [isSuccess, selectMyInteview]);

  const handleClickQuestion = (question: MyClickInterview) => {
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
    valueName: 'questionContent' | 'evaluation' | 'commentary';
  }) => {
    setSelectDetail({
      ...selectDetail,
      questionContents: selectDetail.questionContents.map(content =>
        content.questionId === questionId
          ? {
              ...content,
              [valueName]: {
                ...content[valueName],
                isOpen: !content[valueName].isOpen,
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
          <div className="flex  h-[54px] effect-white w-full items-center px-4">
            <div className="flex  gap-4 items-center">
              <Text size="xl" weight="md">
                프론트엔드
              </Text>
              <div className="flex items-center justify-center h-6 w-[90px] effect-white rounded-md">
                <VariableIcon name="document" size={18} />
                <Text size="lg" weight="md" className="p-1">
                  질문 {selectMyInteview.questionCount || selectDetail.questionContents.length}개
                </Text>
              </div>
            </div>
          </div>

          {selectDetail && (
            <Accordion
              title="전체적인 면접에 대한 느낌이에요."
              description={selectDetail?.gptOpinion}
            />
          )}

          {selectDetail.questionContents &&
            selectDetail.questionContents.map(question => (
              <div key={question.questionId}>
                <div
                  className="px-4 pt-2 pb-1 flex cursor-pointer items-center"
                  onClick={() => handleClickQuestion(question)}>
                  <VariableIcon
                    name="tringleRight"
                    size={16}
                    className={`${question.isOpen && 'rotate-90'}`}
                  />
                  <Text size="lg" weight="md" className="p-1">
                    {question.questionContent.value}
                  </Text>
                </div>
                {question.isOpen && (
                  <div>
                    <div
                      className="pl-10 mt-2 flex cursor-pointer items-center"
                      onClick={() =>
                        handleClickSubQuestion({
                          questionId: question.questionId,
                          valueName: 'questionContent',
                        })
                      }>
                      <VariableIcon
                        name="tringleRight"
                        size={16}
                        className={`${question.questionContent.isOpen && 'rotate-90'}`}
                      />
                      <Text size="lg" weight="md" className="p-1">
                        내가 한 답변이에요.
                      </Text>
                    </div>
                    {question.questionContent.isOpen && (
                      <div className="pl-4 flex items-center">
                        <Text size="lg" weight="sm" className="px-11 font-normal">
                          {question.questionContent.value}
                        </Text>
                      </div>
                    )}
                    <div
                      className="pl-10 mt-2 flex cursor-pointer items-center"
                      onClick={() =>
                        handleClickSubQuestion({
                          questionId: question.questionId,
                          valueName: 'commentary',
                        })
                      }>
                      <VariableIcon
                        name="tringleRight"
                        size={16}
                        className={`${question.commentary.isOpen && 'rotate-90'}`}
                      />
                      <Text size="lg" weight="md" className="p-1">
                        참고하면 좋을것 같아요.
                      </Text>
                    </div>
                    {question.commentary.isOpen && (
                      <div className="pl-4 flex items-center">
                        <Text size="lg" weight="sm" className="px-11 font-normal">
                          {question.commentary.value}
                        </Text>
                      </div>
                    )}
                    <div
                      className="pl-10 mt-2 flex cursor-pointer items-center"
                      onClick={() =>
                        handleClickSubQuestion({
                          questionId: question.questionId,
                          valueName: 'evaluation',
                        })
                      }>
                      <VariableIcon
                        name="tringleRight"
                        size={16}
                        className={`${question.evaluation.isOpen && 'rotate-90'}`}
                      />
                      <Text size="lg" weight="md" className="p-1">
                        답변에 대한 느낌이에요.
                      </Text>
                    </div>
                    {question.evaluation.isOpen && (
                      <div className="pl-4 flex items-center">
                        <Text size="lg" weight="sm" className="px-11 font-normal">
                          {question.evaluation.value}
                        </Text>
                      </div>
                    )}
                  </div>
                )}
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
