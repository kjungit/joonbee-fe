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
import { interviewAtom } from '@/recoil/interviewQuestion/atom';

const InterviewScreen = () => {
  const interview = useRecoilValue(interviewAtom);
  const questionCount = interview.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(interview.questions[0]);
  const [timerState, setTimerState] = useState<TimerState>('READY');
  const [btnText, setBtnText] = useState('시작하기');
  const [interviewAnswer, setInterviewAnswer] = useRecoilState(interviewAnswerSelector);
  const clickedTime = useRecoilValue(interviewTimeAtom);

  const [interviewVideo, setInterviewVideo] = useRecoilState(interviewVideoAtom);
  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onDownload, recordedMediaUrl } =
    useVideo();
  const { onStartListening, onStopListening, transcript, setTranscript } = useSpeechToText();

  const router = useRouter();

  useEffect(() => {
    if (timerState === 'DONE') {
      setInterviewAnswer({ questionId: currentQuestion.questionId, newAnswerContent: transcript });
      onStopRecord();
      onStopListening();
      setBtnText(
        currentQuestion.questionId === questionCount
          ? '면접결과 확인하기'
          : '다음 질문으로 넘어가기',
      );
    }
  }, [timerState, currentQuestion, questionCount]);

  const onDoneButtonClick = () => {
    setTimerState('READY');
    setTranscript('');
    setInterviewVideo([...interviewVideo, recordedMediaUrl]);

    if (currentQuestion.questionId < questionCount) {
      setBtnText('시작하기');
      setCurrentQuestion(interview.questions[currentQuestion.questionId]);
    } else {
      router.push('/interview/check');
    }
  };

  const onClickBtn = () => {
    switch (timerState) {
      case 'READY':
        setBtnText('음성 인식 중');
        setTimerState('PROGRESS');
        onStartRecord();
        onStartListening();
        break;

      case 'DONE':
        onDoneButtonClick();

        break;
      default:
        break;
    }
  };

  const onDisableBtn = () => {
    return timerState === 'PROGRESS';
  };

  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] overflow-scroll">
      <InterviewBar questions={interview.questions} currentId={currentQuestion.questionId} />
      <h2 className="font-bold text-[32px]">질문 {currentQuestion.questionId}</h2>
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Webcam isPermitVideo={true} videoRef={videoRef} onStartVideo={onStartVideo} />
          <div className="flex justify-center">
            <Timer timerState={timerState} setTimerState={setTimerState} time={clickedTime} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <QuestionCard size="lg">{currentQuestion.questionContent}</QuestionCard>
          <TextArea inputValue={transcript} setInputValue={setTranscript} />
          <Button size="4xl" onClick={onClickBtn} disabled={onDisableBtn()}>
            {btnText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InterviewScreen;
