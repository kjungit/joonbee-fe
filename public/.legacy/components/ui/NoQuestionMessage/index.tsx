import React from 'react';
import { Icon } from '../Icon';
import Link from 'next/link';

export default function NoQuestionMessage() {
  return (
    <div className="w-[200px] flex flex-col justify-center items-center gap-2">
      <Icon name="blank" />
      <p className="text-[#444] font-bold text-[16px] text-center">등록된 질문이 없습니다</p>
      <Link href="/#question" className="shadow-md w-[180px] rounded-[8px] bg-white p-[18px]">
        <p className="text-[#444] font-bold text-[14px] text-center">질문 추가 하기</p>
        <p className="text-[12px] text-center">질문들을 등록할 수 있어요</p>
      </Link>
    </div>
  );
}
