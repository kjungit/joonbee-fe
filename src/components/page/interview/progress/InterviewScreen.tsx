'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { InterviewBar } from '@/components/common/InterviewBar';
import Timer from '@/components/common/Timer';
import Webcam from '@/components/common/Webcam';
import { TimerState } from '@/types';
import useVideo from '@/hooks/useVideo';
import { interviewVideoAtom } from '@/recoil/interviewVideo/atom';
import useSpeechToText from '@/hooks/useSpeechToText';
import { QuestionCard } from '@/components/common/QuestionCard';
import { interviewAnswerSelector } from '@/recoil/interviewQuestion/withWriteAnswer';
import { interviewTimeAtom } from '@/recoil/interviewTime/atom';
import { interviewResetSelector } from '@/recoil/interviewQuestion/withReset';
import { interviewAtom } from '@/recoil/interviewQuestion/atom';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import useLeaveConfirmation from '@/hooks/useLeaveConfirmation';

const InterviewScreen = () => {
  const interview = useRecoilValue(interviewAtom);
  const questionCount = interview.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(interview.questions[0]);
  const [timerState, setTimerState] = useState<TimerState>('READY');
  const [btnText, setBtnText] = useState('시작하기');
  const [interviewAnswer, setInterviewAnswer] = useRecoilState(interviewAnswerSelector);
  const clickedTime = useRecoilValue(interviewTimeAtom);

  const isAllowedVideo = useRecoilValue(videoPermissionAtom);

  const [interviewVideo, setInterviewVideo] = useRecoilState(interviewVideoAtom);
  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onDownload, recordedMediaUrl } =
    useVideo();
  const { onStartListening, onStopListening, transcript, setTranscript } = useSpeechToText();
  const [countdown, setCountdown] = useState(5);

  const { confirmationDialog } = useLeaveConfirmation();

  const router = useRouter();

  useEffect(() => {}, [timerState, currentQuestion, questionCount]);

  useEffect(() => {
    onSetCountdown();
  }, [countdown]);

  useEffect(() => {
    console.log(timerState);

    if (timerState === 'PROGRESS') {
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
        currentQuestion.questionId === questionCount
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
    if (isAllowedVideo) {
      setInterviewVideo([...interviewVideo, recordedMediaUrl]);
    }

    if (currentQuestion.questionId < questionCount) {
      setCurrentQuestion(interview.questions[currentQuestion.questionId]);
    } else {
      router.push('/interview/check');
    }
  };

  const onClickProgressButton = () => {
    setTimerState('DONE');
    setCountdown(5);
    setInterviewAnswer({ questionId: currentQuestion.questionId, newAnswerContent: transcript });

    if (isAllowedVideo) {
      onStopRecord();
    }

    onStopListening();
    setBtnText(
      currentQuestion.questionId === questionCount
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
          onStartRecord();
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
    <section className="w-[1024px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] overflow-scroll">
      <InterviewBar questions={interview.questions} currentId={currentQuestion?.questionId} />
      <h2 className="font-bold text-[32px]">질문 {currentQuestion?.questionId}</h2>
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Webcam isPermitVideo={isAllowedVideo} videoRef={videoRef} onStartVideo={onStartVideo} />
          <div className="flex justify-center">
            <Timer timerState={timerState} setTimerState={setTimerState} time={10} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <QuestionCard size="lg">{currentQuestion?.questionContent}</QuestionCard>
          <TextArea inputValue={transcript} setInputValue={setTranscript} isVoice={onVoice()} />
          <Button size="4xl" onClick={onClickButton}>
            {btnText}
          </Button>
        </div>
      </div>
      {confirmationDialog}
    </section>
  );
};

export default InterviewScreen;
