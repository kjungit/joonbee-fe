'use client';
import React, { useEffect, useState } from 'react';
import InterviewLoading from '@/components/ui/InterviewLoading';
import { TypeAnimation } from 'react-type-animation';
import useLoadingProgress from '@/hooks/interview/useLoadingProgress';
import { useUserInfo } from '@/hooks/useUserInfo';
import useSWRMutation from 'swr/mutation';
import { OpenAiContent, postOpenAi } from '@/app/apis/services/openAi';
import { useRecoilValue } from 'recoil';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import {
  selectedChocieCategoryAtom,
  selectedRandomCategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import { useModal } from '@/hooks/useModal';
import { Button } from '@/components/ui/Button';
import InterviewVideoModal from './InterviewVideoModal';
import PreventBackModal from '@/components/common/PreventBackModal';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { DetailQuestionCard } from '@/components/common/DetailQuestionCard';
import ModalPortal from '@/components/ui/ModalPortal';
import DetailInterview from './DetailInterview';
import { saveInterview } from '@/app/apis/services/interview';
import { useRouter } from 'next/navigation';
import PreventTabletModal from '@/components/common/PreventTabletModal';

const sequence = [
  'JOONBEE에서 면접을 볼 수 있는 언어는 Typescript',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Java',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Svelte',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 C',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 C++',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Delphi',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Swift',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 C#',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Golang',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Objective_c',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Kotlin',
  1000,
  'JOONBEE에서 면접을 볼 수 있는 언어는 Javascript',
  1000,
];

export interface ResQuestionsProps {
  questionId: string;
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
}

export interface QuestionProps {
  questionId: string;
  commentary: string;
  evaluation: string;
}

export interface OpenAiResponseData {
  gptOpinion: string;
  categoryName: string;
  questions: QuestionProps[];
}

export interface InteviewSaveData {
  gptOpinion: string;
  categoryName: string;
  questions: ResQuestionsProps[] | undefined;
}

export default function InterviewResultContainer() {
  const resetMyInterview = useRecoilValue(myInterviewAtom);
  const chocieCategory = useRecoilValue(selectedChocieCategoryAtom);
  const randomCategory = useRecoilValue(selectedRandomCategoryAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = useRecoilValue(videoPermissionAtom);
  const [requestData, setRequestData] = useState<OpenAiContent>({
    userName: '',
    categoryName: '',
    questions: [],
  });
  const [mutateData, setMutateData] = useState<InteviewSaveData | undefined>();
  const [selectQuestion, setSelectQuestion] = useState({
    index: 0,
    questionId: '',
    questionContent: '',
    answerContent: '',
    commentary: '',
    evaluation: '',
  });
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const router = useRouter();

  const { isOpened, onClose, onOpen } = useModal();

  const percent = useLoadingProgress(isLoaded);
  const { userInfo } = useUserInfo();
  const {
    trigger: openAiTrigger,
    data,
    isMutating,
  } = useSWRMutation<OpenAiResponseData, AxiosError, string>(
    'openAi',
    () => postOpenAi(requestData),
    {
      onSuccess: data => {
        setIsLoaded(true);
      },
    },
  );

  const { trigger: saveTrigger } = useSWRMutation(
    '/api/save/interview',
    () => saveInterview(mutateData),
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );

  const onClickOpen = (e: React.MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpenSelect(!isOpenSelect);
  };

  useEffect(() => {
    const reqData = {
      userName: userInfo?.data.nickName || '',
      categoryName: chocieCategory || randomCategory,
      questions: resetMyInterview,
    };
    setRequestData(reqData);
  }, [userInfo]);

  useEffect(() => {
    openAiTrigger();
  }, [requestData]);

  useEffect(() => {
    saveTrigger();
  }, [mutateData]);

  useEffect(() => {
    const res = {
      gptOpinion: data?.gptOpinion || '',
      categoryName: chocieCategory || randomCategory,
      questions: data?.questions.map(itemA => {
        const findIdData = resetMyInterview.find(itemB => itemB.questionId === itemA.questionId);
        return {
          questionId: itemA.questionId,
          questionContent: findIdData?.questionContent || '',
          answerContent: findIdData?.answerContent || '',
          commentary: itemA.commentary,
          evaluation: itemA.evaluation,
        };
      }),
    };

    if (res !== undefined) setMutateData(res);
  }, [isMutating]);

  return (
    <>
      {isMutating ? (
        <div className="flex flex-col items-center gap-5 justify-center h-full">
          <InterviewLoading interviewType="chocie" />
          <h2 className="text-white font-bold text-xl">{percent}%</h2>
          <p className="text-white text-[20px] font-bold">면접 결과를 JOONBEE 중이에요!</p>
          <TypeAnimation
            sequence={sequence}
            speed={20}
            className="text-white font-bold text-3xl"
            repeat={Infinity}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full h-full bg-background-lightgray p-8 rounded-2xl relative">
          <div className="flex w-full justify-between items-center min-h-[50px]">
            <h2 className="text-[20px] font-bold">면접 결과</h2>
            {true && (
              <Button
                color="blueSecondary"
                size="lg"
                text="sm"
                disabled={!isVideo}
                onClick={onOpen}>
                면접 영상 확인하기
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Image width={30} height={30} src="/icons/emoji/smile.png" alt="smile" />
              <h3 className="font-bold">전체적인 면접에 대한 느낌이에요.</h3>
            </div>
            <div className="p-4 text-md h-[150px] overflow-auto bg-white rounded-2xl font-bold shadow-md break-words">
              {data?.gptOpinion}
            </div>
            <div className="flex gap-2 items-center">
              <Image width={30} height={30} src="/icons/emoji/laugh.png" alt="laugh" />
              <h3 className="font-bold">개별 질문 정리</h3>
            </div>
            <ul className="pb-4 flex flex-col gap-4 h-[240px] overflow-auto">
              {mutateData &&
                mutateData.questions?.map((item, index) => (
                  <DetailQuestionCard
                    key={item.questionId}
                    question={item.questionContent}
                    questionCount={index + 1}
                    onClick={() => {
                      setSelectQuestion({ ...item, index: index + 1 });
                      setIsOpenSelect(true);
                      console.log('ddd');
                    }}
                  />
                ))}
            </ul>
            <div className="flex gap-4 justify-end">
              <Button
                text="sm"
                onClick={() => {
                  router.push('/interview');
                }}>
                다른 면접 보러가기
              </Button>
              <Button
                text="sm"
                onClick={() => {
                  router.push('/my?category=interview&sort=my_interview');
                }}>
                나의 면접 보러가기
              </Button>
            </div>
          </div>
          {isOpenSelect && (
            <div onClick={onClickOpen}>
              <DetailInterview selectQuestion={selectQuestion} setIsOpenSelect={setIsOpenSelect} />
            </div>
          )}

          {isOpened && <InterviewVideoModal onClose={onClose} />}
          <PreventBackModal />
          <PreventTabletModal />
        </div>
      )}
    </>
  );
}

const resA = {
  gptOpinion: 'asdasdasd',
  questions: [
    { id: 1, commentrary: '11213' },
    { id: 2, commentrary: '11213' },
    { id: 3, commentrary: '11213' },
    { id: 4, commentrary: '11213' },
  ],
};

const resB = {
  questions: [
    { id: 1, questionContent: '2323' },
    { id: 2, questionContent: '2323' },
    { id: 3, questionContent: '2323' },
    { id: 4, questionContent: '2323' },
  ],
};
