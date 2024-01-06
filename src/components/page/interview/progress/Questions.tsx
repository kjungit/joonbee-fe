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

const TimerStateText = {
  READY: {
    btn: '시작하기',
    help: '질문에 대답할 준비가 되시면 시작버튼을 눌러주세요. 타이머가 끝나면 질문이 시작됩니다.',
  },
  PROGRESS: {
    btn: '음성 인식 중',
    help: '질문에 답변해주세요. 답변을 마치면 버튼을 눌러주세요.',
  },
  DONE: {
    btn: '다음 질문으로 넘어가기',
    help: '다음 질문을 준비해주세요.',
  },
};

export default function Questions({ questions }: QuestionsProps) {
  const [currentCount, setCurrentCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const questionsCount = questions.length;
  const [timerState, setTimerState] = useState<TimerState>('READY');
  const [btnText, setBtnText] = useState(TimerStateText.READY.btn);
  const [helpText, setHelpText] = useState(TimerStateText.READY.help);
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
          : `${TimerStateText.DONE.btn} ${countdown}`,
      );
      setHelpText(TimerStateText.DONE.help);
    }

    if (timerState === 'READY') {
      setBtnText(`시작하기 ${countdown}`);
      setHelpText(TimerStateText.READY.help);
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
    setHelpText(TimerStateText.DONE.help);
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
        : `${TimerStateText.DONE.btn} ${countdown}`,
    );
  };

  const onClickButton = () => {
    switch (timerState) {
      case 'READY':
        setBtnText(TimerStateText.PROGRESS.btn);
        setHelpText(TimerStateText.PROGRESS.help);
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
          <QuestionCard size="lg" text={currentQuestion?.questionContent} />
          <TextArea
            inputValue={transcript}
            setInputValue={setTranscript}
            isVoice={onVoice()}
            size="auto"
          />
          <div className="flex gap-5 justify-between">
            <p className="text-[12px] font-bold text-blue-normal max-w-[260px]">{helpText}</p>
            <Button size="lg" text="sm" onClick={onClickButton}>
              {btnText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
