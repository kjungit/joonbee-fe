import React from 'react';
import Image from 'next/image';
import { IconName } from '@/types';

export interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className = '' }: IconProps) => {
  const icon = require(`/public/icons/${name}`);

  return <Image src={icon} alt={icon} className={className} />;
};
