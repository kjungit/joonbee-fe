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

  const widthCur = Number(1100 / (questions.length - 1)) + 'px';

  const cur = `width: ${widthCur}px`;
  return (
    <div className="">
      <ul className="flex justify-between w-[1100px] items-center">
        {questions.map(question => (
          <div key={question.questionId}>
            <li
              className={`w-4 h-4 rounded-full border-blue-normal ${
                question.questionId <= currentId + 1 ? 'bg-[#606DE3]' : 'bg-white'
              } border-4`}></li>
            {questions.length !== question.questionId && (
              <li
                style={{ width: widthCur }}
                className={` h-[4px] ${
                  question.questionId <= currentId ? 'bg-blue-normal' : 'bg-[#B1BDDE]'
                }
             `}></li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
