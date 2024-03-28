'use client';
import React, { useEffect, useState } from 'react';
import useGetInterviewData from '@/hooks/interview/useGetInterviewData';
import Video from '@/components/@common/video/video';
import useVideo from '@/hooks/interview/useVideo';
import useTimer from '@/hooks/interview/useTimer';
import { ProgressStatus } from '@/types';
import { VariableIcon } from '@/components/@common/variableIcon';
import { Text } from '@/components/@common/text';
import Button from '@/components/@common/button';
import TextArea from '@/components/@common/textArea';
import useSpeechToText from '@/hooks/interview/useSpeechToText';
import { useRouter } from 'next/navigation';
import { currentCountAtom } from '@/recoils/interview/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addQuestionSelector } from '@/recoils/myInterview/withAdd';
import { MyInterviewQuestions } from '@/apis/services/openAiApis';
import { isAllowedVideoSelector } from '@/recoils/interview/withCheckVideo';

const TimerStateText = {
  READY: {
    btn: '시작하기',
    help: '질문에 대답할 준비가 되시면 시작버튼을 눌러주세요. 타이머가 끝나면 질문이 시작됩니다.',
  },
  PROGRESS: {
    btn: '다음 질문으로 넘어가기',
    help: '질문에 답변해주세요. 답변을 마치면 버튼을 눌러주세요.',
  },
  DONE: {
    btn: '다음 질문으로 넘어가기',
    help: '다음 질문을 준비해주세요.',
  },
};

export default function ProgressPage() {
  const [currentCount, setCurrentCount] = useRecoilState(currentCountAtom);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>('READY');
  const [btnText, setBtnText] = useState(TimerStateText.READY.btn);
  const [helpText, setHelpText] = useState(TimerStateText.READY.help);
  const isAllowedVideo = useRecoilValue(isAllowedVideoSelector);
  const setMyInterview = useSetRecoilState(addQuestionSelector);

  const { questionData } = useGetInterviewData();

  const [currentQuestion, setCurrentQuestion] = useState<MyInterviewQuestions>();
  const questionsCount = questionData.length;

  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onToggleRecord, onStartAudio } =
    useVideo();
  const { remainingTime } = useTimer(progressStatus, setProgressStatus);

  useEffect(() => {
    if (isAllowedVideo) {
      onStartVideo();
    } else {
      onStartAudio();
    }
    if (questionData.length) setCurrentQuestion(questionData[0]);
  }, [questionData, isAllowedVideo]);

  const {
    onStartListening,
    onStopListening,
    transcript,
    setTranscript,
    isSupportedBrowser,
    onNavigate,
  } = useSpeechToText();

  const [countdown, setCountdown] = useState(5);

  const router = useRouter();

  useEffect(() => {
    onSetButtonText();

    // 음성인식 중 버튼을 누르지 않았을 때 핸들링
    if (remainingTime === 0 && countdown === 5 && progressStatus === 'DONE')
      onClickProgressButton();

    // 첫 번째 문제 진행중일 때 부터 녹화 시작
    if (progressStatus === 'PROGRESS') {
      if (currentCount === 1) {
        onStartRecord();
      }
      setCountdown(5);
      return;
    }

    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }

      if (countdown === 0) {
        onClickButton();
        setCountdown(5);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progressStatus, countdown]);

  const onSetButtonText = () => {
    if (progressStatus === 'DONE') {
      setBtnText(
        currentCount === questionsCount
          ? `면접결과 확인하기 ${countdown}`
          : `${TimerStateText.DONE.btn} ${countdown}`,
      );
      setHelpText(
        currentCount === questionsCount
          ? '면접이 끝났습니다. 잠시만 기다려주세요.'
          : TimerStateText.DONE.help,
      );
    }

    if (progressStatus === 'READY') {
      setBtnText(`시작하기 ${countdown}`);
      setHelpText(TimerStateText.READY.help);
    }
  };

  const onClickReadyButton = () => {
    setBtnText(TimerStateText.PROGRESS.btn);
    setHelpText(TimerStateText.PROGRESS.help);
    setProgressStatus('PROGRESS');
    if (isAllowedVideo) {
      onToggleRecord();
    }
    onStartListening();
  };

  const onClickDoneButton = () => {
    if (currentCount < questionsCount) {
      setCurrentQuestion(questionData[currentCount]);
      setCurrentCount(prev => prev + 1);
    } else {
      onStopRecord();
      router.push('/interview/check');
      return;
    }

    setProgressStatus('READY');
    setCountdown(5);
    setTranscript('');
  };

  const onClickProgressButton = () => {
    setHelpText(TimerStateText.DONE.help);
    setProgressStatus('DONE');
    setCountdown(5);
    setMyInterview({
      questionId: currentQuestion?.questionId,
      questionContent: currentQuestion?.questionContent,
      answerContent: transcript,
    } as any);

    if (isAllowedVideo) {
      onToggleRecord();
    }

    onStopListening();
    setBtnText(
      currentCount === questionsCount
        ? `면접결과 확인하기 ${countdown}`
        : `${TimerStateText.DONE.btn} ${countdown}`,
    );
  };

  const onClickButton = () => {
    console.log('progressStatus', progressStatus);

    switch (progressStatus) {
      case 'READY':
        onClickReadyButton();
        break;

      case 'PROGRESS':
        onClickProgressButton();
        break;

      case 'DONE':
        onClickDoneButton();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Text as="h2" size="xl" weight="lg" className="mb-5">
        질문 {currentCount}
      </Text>
      <div className="mb-12">
        <div className="flex gap-24 mb-5 relative">
          <Video videoRef={videoRef} />
          <div className="flex flex-col justify-between">
            <div>
              <div className="bg-blue-light rounded-md w-[234px] h-[48px] flex justify-center items-center gap-5">
                <Text className="text-[16px]">남은시간</Text>
                <Text weight="lg" className="text-[18px]">
                  {remainingTime}
                </Text>
              </div>
              {progressStatus === 'PROGRESS' && (
                <div className="rounded-md text-[14px] text-blue-primary flex gap-2 items-center justify-end">
                  <Text className="sm">음성 인식 중</Text>
                  <div className="voice"></div>
                </div>
              )}
            </div>

            <div>
              <Button size="xl" onClick={onClickButton}>
                {btnText}
              </Button>
            </div>
          </div>
        </div>
        <Text>{helpText}</Text>
      </div>
      <div className="flex items-center mb-2">
        <VariableIcon name="triangleRight" />
        <Text size="xl" className="mb-1">
          {currentQuestion?.questionContent}
        </Text>
      </div>

      <TextArea inputValue={transcript} setInputValue={setTranscript} />
    </>
  );
}
