import React from 'react';

import Image from 'next/image';

export type IconName =
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
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const icon = require(`/public/icons/${name}.png`);

  return <Image src={icon} alt={icon} className={className} />;
};
