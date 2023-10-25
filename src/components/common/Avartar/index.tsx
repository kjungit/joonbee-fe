import Image from 'next/image';
import React from 'react';
import naver from '/public/icons/naver.png';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  size: AvatarSize;
  children: React.ReactNode;
  onClick: () => void;
  isAlarm: boolean;
  profile: string;
}

export const Avatar = ({ size, isAlarm = false, profile, onClick }: AvatarProps) => {
  const baseStyles = 'rounded-full bg-gray-normal relative';

  const sizeStyles = {
    sm: 'w-[26px] h-[26px]',
    md: 'w-[38px] h-[38px]',
    lg: 'w-[140px] h-[140px]',
  };

  const alarmStyles = `absolute w-[10px] h-[10px] bg-status-alert rounded-full right-0 top-[1px]`;
  const AvatarStyles = `${baseStyles} ${sizeStyles[size]}`;

  return (
    <div className={AvatarStyles} onClick={onClick}>
      {profile && (
        <Image className="rounded-full" src={naver} alt="naver" layout="fill" objectFit="cover" />
      )}
      {isAlarm && <div className={alarmStyles} />}
    </div>
  );
};
