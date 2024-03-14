'use client';

import { Text } from '@/components/@common/text/text';
import { VariableIcon } from '@/components/@common/variableIcon/variableIcon';
import { MainCategory } from '@/constants/category';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { InterviewItem } from '@/types/interview';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { InterviewLikeIcon } from './interviewLikeIcon';

export const InterviewMenuItem = ({ item }: { item: InterviewItem }) => {
  const [selectInterview, setSelectInterview] = useRecoilState(selectInterviewState);

  const handleClickInterview = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectInterview(item);
  };

  return (
    <div
      onClick={handleClickInterview}
      key={item.interviewId}
      className={`flex w-full border-b-[1px] cursor-pointer border-gray-normal h-[50px] items-center justify-between p-4 hover:bg-blue-normal/5 ${
        selectInterview.interviewId === item.interviewId && 'bg-blue-normal/5'
      }`}>
      <div>
        <Image
          className="rounded-full"
          width={28}
          height={28}
          src={item.thumbnail}
          alt={item.nickname + ' imgae'}
        />
      </div>
      <div className="w-10">
        <Text size="lg" weight="lg">
          {MainCategory[item.categoryName]}
        </Text>
      </div>
      <div className="flex items-center justify-start w-[90px]">
        <VariableIcon name="document" size={18} />
        <Text size="lg" weight="md" className="p-1">
          질문 {item.questions.length}개
        </Text>
      </div>

      <div className="flex gap-1 items-center justify-center">
        <InterviewLikeIcon interviewId={item.interviewId} liked={item.liked} />
        <Text size="lg" weight="lg" className="p-1">
          {item.likeCount}
        </Text>
      </div>
    </div>
  );
};
