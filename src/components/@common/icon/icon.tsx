import React from 'react';

import Image from 'next/image';

export type IconName =
  | 'kakao.png'
  | 'naver.png'
  | 'google.png'
  | 'meeting.png'
  | 'service.png'
  | 'check.png'
  | 'random.png'
  | 'blank.png'
  | 'ai_white.png'
  | 'checklist.png'
  | 'questions.svg';

export interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const icon = require(`/public/icons/${name}`);

  return <Image src={icon} alt={icon} className={className} />;
};
