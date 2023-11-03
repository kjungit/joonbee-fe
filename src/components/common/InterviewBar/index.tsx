'use client';
import React from 'react';

interface QuestionList {
  id: number;
  question: string;
}
type current = number;

export interface InterviewBarProps extends React.HTMLAttributes<HTMLDivElement> {
  data: QuestionList[];
  currentId: current;
}

export const InterviewBar = ({ data, currentId = 1 }: InterviewBarProps) => {
  const widthCur = Number(1100 / (data.length - 1)) + 'px';

  const cur = `width: ${widthCur}px`;
  return (
    <div className="">
      <ul className="flex justify-between w-[1100px] items-center">
        {data.map(i => (
          <>
            <li
              className={`w-4 h-4 rounded-full border-blue-normal ${
                i.id <= currentId + 1 ? 'bg-[#606DE3]' : 'bg-white'
              } border-4`}></li>
            {data.length !== i.id && (
              <li
                style={{ width: widthCur }}
                className={` h-[4px] ${i.id <= currentId ? 'bg-blue-normal' : 'bg-[#B1BDDE]'}
             
             `}></li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};
