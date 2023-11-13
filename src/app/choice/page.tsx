import { LinkBox } from '@/components/common/LinkBox';
import { IconName } from '@/components/ui/Icon';
import React from 'react';

const LINK_INFO = [
  {
    id: 1,
    title: '질문을 직접 선택해요.',
    subTitle: {
      first: '면접 질문들을 선택해서',
      second: '준비할 수 있어요.',
      third: '체계적으로 준비해봐요.',
    },
    propsLink: '/',
    iconSrc: 'checklist' as IconName,
  },
  {
    id: 2,
    title: '질문을 AI가 준비해요.',
    subTitle: {
      first: '무슨 문제가 나올지 몰라요!',
      second: '예상하지 못한 문제를',
      third: '준비해보세요!',
    },
    propsLink: '/',
    iconSrc: 'random' as IconName,
  },
];

export default function page() {
  return (
    <div className="bg-main-primary w-full h-full flex justify-center items-center gap-14">
      {LINK_INFO.map(item => (
        <LinkBox
          key={item.id}
          size="lg"
          color="gray"
          title={item.title}
          subTitle={item.subTitle}
          propsLink={item.propsLink}
          iconSrc={item.iconSrc}
        />
      ))}
    </div>
  );
}
