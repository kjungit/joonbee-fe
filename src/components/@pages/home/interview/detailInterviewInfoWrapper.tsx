import IconButton from '@/components/@common/iconButton';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { MainCategory } from '@/constants/category';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export default function DetailInterviewInfoWrapper() {
  const selectInterview = useRecoilValue(selectInterviewState);
  const resetSelectInterview = useResetRecoilState(selectInterviewState);

  const handleClose = () => {
    resetSelectInterview();
  };
  const handleMove = () => {
    console.log('이동');
  };
  return (
    <div
      className={`md:w-full max-w-[800px] flex flex-col bg-white questionListHeight effect-white ${
        selectInterview.categoryName === '' && 'hidden'
      }`}>
      <div className="gap-4 p-6 flex justify-between">
        <div className="flex flex-col">
          <Text size="lg" weight="lg">
            {MainCategory[selectInterview.categoryName]}
          </Text>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={28}
              height={28}
              src={selectInterview.thumbnail}
              alt={selectInterview.nickname + ' imgae'}
            />
            <Text size="lg" weight="lg" className="p-1">
              {selectInterview.nickname}
            </Text>
          </div>
        </div>
        <VariableIcon
          name="close"
          size={16}
          className="leading-5 cursor-pointer"
          onClick={handleClose}
        />
      </div>
      <ul className="flex flex-col p-6 gap-4 justify-between ">
        {selectInterview.questions.map(item => (
          <div key={item.questionId} className="flex gap-2 leading-5 items-center">
            <div className="min-w-4">
              <VariableIcon name="questionBox" size={16} className="leading-5 min-w-5 min-h-4" />
            </div>
            <Text size="lg" weight="md">
              {item.questionContent}
            </Text>
          </div>
        ))}
      </ul>
      <div className="mt-auto p-6 hidden justify-end lg:flex">
        <IconButton
          iconName="next_arrow.png"
          edge="end"
          size="md"
          className=""
          onClick={handleMove}>
          다음 단계
        </IconButton>
      </div>
    </div>
  );
}
