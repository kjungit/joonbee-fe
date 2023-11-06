import Image from 'next/image';
import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  size?: AvatarSize;
  onClick?: () => void;
  thunbnail: string;
}

export const Avatar = ({ size = 'sm', thunbnail, onClick }: AvatarProps) => {
  const baseStyles = 'rounded-full bg-gray-normal relative';

  const sizeStyles = {
    sm: 'w-[26px] h-[26px]',
    md: 'w-[38px] h-[38px]',
    lg: 'w-[140px] h-[140px]',
  };

  const AvatarStyles = `${baseStyles} ${sizeStyles[size]}`;

  return (
    <div className={AvatarStyles} onClick={onClick}>
      {thunbnail && (
        <Image
          className="rounded-full"
          src={thunbnail}
          alt="thunbnail"
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>
  );
};
