import React from 'react';

import Image from 'next/image';

type IconName =
  | 'kakao'
  | 'naver'
  | 'google'
  | 'meeting'
  | 'service'
  | 'check'
  | 'random'
  | 'blank'
  | 'ai_white'
  | 'checklist';

export interface IconProps {
  name: IconName;
}

export const Icon = ({ name }: IconProps) => {
  const icon = require(`/public/icons/${name}.png`);

  return <Image src={icon} alt={icon} />;
};
