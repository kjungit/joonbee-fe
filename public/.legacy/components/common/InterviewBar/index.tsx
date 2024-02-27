'use client';
import { Question } from '../../../recoil/interviewQuestion/atom';
import { MyInterview } from '../../../recoil/myInterview/atom';
import React from 'react';

export type InterviewBarProps = {
  questions: MyInterview[];
  currentCount: number;
};

export const InterviewBar = ({ questions, currentCount }: InterviewBarProps) => {
  const totalCount = questions.length - 1;
  const widthCur = `${100 / totalCount}%`;

  return (
    <ul className="flex justify-between w-full items-center">
      <li className={`min-w-[16px] h-4 rounded-full border-blue-normal bg-[#606DE3] border-4`}></li>
      {questions.map((question, index) => (
        <div
          key={question.questionId}
          style={{ width: widthCur }}
          className="relative w-full h-full">
          {
            <li
              className={` h-[4px] absolute w-full top-[6px] ${
                index + 1 <= currentCount ? 'bg-blue-normal' : 'bg-[#B1BDDE]'
              }
             `}></li>
          }
          <li
            className={`w-4 h-4 rounded-full border-blue-normal top-0 right-0 absolute ${
              index + 1 <= currentCount ? 'bg-[#606DE3]' : 'bg-white'
            } border-4`}></li>
        </div>
      ))}
    </ul>
  );
};
