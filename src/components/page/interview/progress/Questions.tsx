'use client';

import { InterviewBar } from '@/components/common/InterviewBar';
import { QuestionCard } from '@/components/common/QuestionCard';
import Timer from '@/components/common/Timer';
import Webcam from '@/components/common/Webcam';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import useSpeechToText from '@/hooks/useSpeechToText';
import useVideo from '@/hooks/useVideo';

import { interviewTimeAtom } from '@/recoil/interviewSetting/atoms';
import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { MyInterview } from '@/recoil/myInterview/atom';
import { myInterviewAddSelector } from '@/recoil/myInterview/withAdd';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import { TimerState } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type QuestionsProps = {
  questions: MyInterview[];
};

export default function Questions({ questions }: QuestionsProps) {
  const [currentCount, setCurrentCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const questionsCount = questions.length;
  const [timerState, setTimerState] = useState<TimerState>('READY');
  const [btnText, setBtnText] = useState('시작하기');
  const setMyInterview = useSetRecoilState(myInterviewAddSelector);
  const time = useRecoilValue(interviewTimeAtom);

  const isAllowedVideo = useRecoilValue(videoPermissionAtom);

  // const [setVideoUrl, videoUrl] = useRecoilState(interviewVideoUrlAtom);
  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onToggleRecord, recordedMediaUrl } =
    useVideo();
  const { onStartListening, onStopListening, transcript, setTranscript } = useSpeechToText();
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();

  useEffect(() => {
    onSetCountdown();
  }, [countdown]);

  useEffect(() => {
    if (timerState === 'PROGRESS') {
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
  }, [timerState, countdown]);

  const onSetCountdown = () => {
    if (timerState === 'DONE') {
      setBtnText(
        currentCount === questionsCount
          ? `면접결과 확인하기 ${countdown}`
          : `다음 질문으로 넘어가기 ${countdown}`,
      );
    }

    if (timerState === 'READY') {
      setBtnText(`시작하기 ${countdown}`);
    }
  };

  const onClickDoneButton = () => {
    setTimerState('READY');
    setCountdown(5);

    setTranscript('');

    if (currentCount < questionsCount) {
      setCurrentQuestion(questions[currentCount]);
      setCurrentCount(prev => prev + 1);
    } else {
      onStopRecord();
      router.push('/interview/check');
    }
  };

  const onClickProgressButton = () => {
    setTimerState('DONE');
    setCountdown(5);
    setMyInterview([
      {
        questionId: currentQuestion.questionId,
        questionContent: currentQuestion.questionContent,
        answerContent: transcript,
      },
    ]);

    if (isAllowedVideo) {
      onToggleRecord();
    }

    onStopListening();
    setBtnText(
      currentCount === questionsCount
        ? `면접결과 확인하기 ${countdown}`
        : `다음 질문으로 넘어가기 ${countdown}`,
    );
  };

  const onClickButton = () => {
    switch (timerState) {
      case 'READY':
        setBtnText('음성 인식 중');
        setTimerState('PROGRESS');
        if (isAllowedVideo) {
          onToggleRecord();
        }
        onStartListening();
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

  const onVoice = () => {
    return timerState === 'PROGRESS' ? true : false;
  };

  return (
    <>
      <InterviewBar questions={questions} currentCount={currentCount} />
      <h2 className="font-bold text-[20px]">질문 {currentCount}</h2>
      <div className="flex justify-between min-w-[860px]">
        <div className="flex flex-col gap-5 ">
          <Webcam isPermitVideo={isAllowedVideo} videoRef={videoRef} onStartVideo={onStartVideo} />
          <div className="flex justify-center">
            <Timer timerState={timerState} setTimerState={setTimerState} time={time} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <QuestionCard size="lg">{currentQuestion?.questionContent}</QuestionCard>
          <TextArea inputValue={transcript} setInputValue={setTranscript} isVoice={onVoice()} />
          <Button size="4xl" text="sm" onClick={onClickButton}>
            {btnText}
          </Button>
        </div>
      </div>
    </>
  );
}
