'use client';

import React, { useEffect } from 'react';
import { LinkBox } from '@/components/common/LinkBox';
import { IconName } from '@/components/ui/Icon';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import Image from 'next/image';
import { interviewTypeAtom } from '@/recoil/interviewType/atom';
import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import { selectedChoiceCategoryAtom } from '@/recoil/selectedCategory/atom';

const LINK_INFO = [
  {
    id: 1,
    type: 'choice',
    title: '질문을 직접 선택해요.',
    subTitle: {
      first: '면접 질문들을 선택해서',
      second: '준비할 수 있어요.',
      third: '체계적으로 준비해봐요.',
    },
    propsLink: '/interview/choice',
    iconSrc: 'checklist' as IconName,
  },
  {
    id: 2,
    type: 'random',
    title: '질문을 AI가 준비해요.',
    subTitle: {
      first: '무슨 문제가 나올지 몰라요!',
      second: '예상하지 못한 문제를',
      third: '준비해보세요!',
    },
    propsLink: '/interview/random',
    iconSrc: 'random' as IconName,
  },
];

export default function QuestionTypeBox() {
  const setInterviewType = useSetRecoilState(interviewTypeAtom);
  const resetInterviewVideoUrl = useResetRecoilState(interviewVideoUrlAtom);
  const resetMyInterview = useResetRecoilState(myInterviewAtom);
  const resetMyQuestion = useResetRecoilState(myQuestionAtom);
  const resetChoiceCategory = useResetRecoilState(selectedChoiceCategoryAtom);

  const handleClickBox = (type: string) => {
    setInterviewType(type);
  };

  useEffect(() => {
    resetInterviewVideoUrl();
    resetMyInterview();
    resetMyQuestion();
    resetChoiceCategory();
  }, []);

  return (
    <>
      {LINK_INFO.map(item => (
        <div key={item.id} onClick={() => handleClickBox(item.type)} className="w-full">
          <LinkBox
            key={item.id}
            size="lg"
            color="gray"
            title={item.title}
            subTitle={item.subTitle}
            propsLink={item.propsLink}>
            <Image
              src={`/icons/${item.iconSrc}.png`}
              alt="ai_white"
              width={100}
              height={100}
              className="w-14 lg:w-20"
            />
          </LinkBox>
        </div>
      ))}
    </>
  );
}
