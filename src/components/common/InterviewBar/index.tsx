'use client';
import { Question } from '@/recoil/interviewQuestion/atom';
import { MyInterview } from '@/recoil/myInterview/atom';
import React from 'react';

export type InterviewBarProps = {
  questions: MyInterview[];
  currentCount: number;
};

export const InterviewBar = ({ questions, currentCount }: InterviewBarProps) => {
  const widthCur = `${100 / (questions.length - 1)}%`;

  return (
    <ul className="flex justify-between w-full items-center">
      <li className={`min-w-[16px] h-4 rounded-full border-blue-normal bg-[#606DE3] border-4`}></li>
      {questions.map(question => (
        <div
          key={question.questionId}
          style={{ width: widthCur }}
          className="relative w-full h-full">
          {
            <li
              className={` h-[4px] absolute w-full top-[6px] ${
                currentCount <= questions.length - 1 ? 'bg-blue-normal' : 'bg-[#B1BDDE]'
              }
             `}></li>
          }
          <li
            className={`w-4 h-4 rounded-full border-blue-normal top-0 right-0 absolute ${
              currentCount <= questions.length - 1? 'bg-[#606DE3]' : 'bg-white'
            } border-4`}></li>
        </div>
      ))}
    </ul>
  );
};
