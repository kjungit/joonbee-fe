import { BetweenBox } from '@/components/common/BetweenBox';
import { PolarChart } from '@/components/common/PolarChart';
import React from 'react';

export default function Profile() {
  return (
    <div className="lg:h-[600px] 2xl:h-[700px] bg-white w-[300px] p-6  rounded-2xl flex flex-col items-center">
      <h3 className="text-xl font-bold w-full">프로필</h3>
      <div className="w-32 h-32 rounded-full bg-main-primary"></div>
      <p className="mt-4 text-xl font-bold">리액트척척박사</p>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>

      <div className="flex flex-col gap-4">
        <BetweenBox first="면접 수" second="3" />
        <BetweenBox first="질문 수" second="3" />
      </div>
      <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
      <p className="text-xl font-bold px-6 pb-2 w-full">내 면접 질문 통계</p>
      <PolarChart data={[23, 12, 35, 10, 23, 12, 22]} />
    </div>
  );
}
