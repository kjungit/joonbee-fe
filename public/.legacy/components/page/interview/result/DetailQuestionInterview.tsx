import { Button } from '../../../ui/Button';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { QuestionProps, ResQuestionsProps } from './InterviewResultContainer';
import Image from 'next/image';

interface SelectQuestionProps extends ResQuestionsProps {
  index: number;
}

export default function DetailQuestionInterview({
  selectQuestion,
  setIsOpenSelect,
}: {
  selectQuestion: SelectQuestionProps;
  setIsOpenSelect: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed z-40 -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className="bg-white border-4 z-45 border-main-primary gap-8 flex flex-col max-w-[800px] p-6 w-full  rounded-2xl">
        <div className="flex justify-between items-center gap-4">
          <div className="w-full flex items-center font-bold border-gray-primary border-b-2 pb-2 gap-4">
            <h2 className="text-3xl w-24">질문 {selectQuestion.index}</h2>
            <p>{selectQuestion.questionContent}</p>
          </div>
          <Button size="xs" color="darkGray" text="sm" onClick={() => setIsOpenSelect(false)}>
            닫기
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Image width={30} height={30} src="/icons/emoji/pencil.png" alt="pencil" />
            <h4 className="font-bold text-lg">내가 한 답변이에요.</h4>
          </div>
          <div className="text-sm break-keep overflow-auto max-h-[140px] border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
            {selectQuestion.answerContent}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <div className="flex gap-2">
              <Image width={30} height={30} src="/icons/emoji/zoom.png" alt="zoom" />
              <h4 className="font-bold text-lg">참고하면 좋을것 같아요.</h4>
            </div>
            <div className="text-sm break-keep overflow-auto border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
              {selectQuestion.commentary}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <div className="flex gap-2">
              <Image width={30} height={30} src="/icons/emoji/bubble.png" alt="bubble" />
              <h4 className="font-bold text-lg">답변에 대한 느낌이에요.</h4>
            </div>
            <div className="text-sm break-keep overflow-auto border-l-main-primary border-l-[12px] h-[140px] w-full  shadow-md rounded-xl flex flex-col justify-between px-5 py-4">
              {selectQuestion.evaluation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
