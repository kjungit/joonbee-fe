'use client';
import React from 'react';

type QuestionList = {
  questionId: number;
  subcategory: string;
  questionContent: string;
  answerContent: string;
};

export type InterviewBarProps = {
  questions: QuestionList[];
  currentId?: number;
};

export const InterviewBar = ({ questions, currentId = 0 }: InterviewBarProps) => {
  const widthCur = `${100 / (questions.length - 1)}%`;

  return (
    <ul className="flex justify-between w-full items-center">
      <li className={`min-w-[16px] h-4 rounded-full border-blue-normal bg-[#606DE3] border-4`}></li>
      {questions.map(question => (
        <div key={question.questionId} style={{ width: widthCur }} className="relative h-full">
          {
            <li
              className={` h-[4px] absolute w-full top-[6px] ${
                question.questionId <= currentId - 1 ? 'bg-blue-normal' : 'bg-[#B1BDDE]'
              }
             `}></li>
          }
          <li
            className={`w-4 h-4 rounded-full border-blue-normal top-0 right-0 absolute ${
              question.questionId <= currentId - 1 ? 'bg-[#606DE3]' : 'bg-white'
            } border-4`}></li>
        </div>
      ))}
    </ul>
  );
};
