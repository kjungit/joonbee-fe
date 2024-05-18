import React from 'react';
import { capitalizeFirstLetter } from '@/utils/format';
import { Icon } from '../icon';
import Link from 'next/link';

export type IconName = 'kakao.png' | 'naver.png' | 'google.png';

export type SocialLoginButtonProps = {
  name: IconName;
  path: string;
};

export const SocialLoginButton = ({ name, path }: SocialLoginButtonProps) => {
  const socialStyles = {
    'kakao.png': {
      boxStyle: 'bg-yellow-kakao hover:border-main-primary border-4 border-yellow-kakao',
      text: 'text-black',
    },
    'naver.png': {
      boxStyle: 'bg-green-naver hover:border-main-primary border-4 border-green-naver',
      text: 'text-white',
    },
    'google.png': {
      boxStyle:
        'bg-white hover:border-main-primary hover:border-4 p-[2px] hover:p-0 border-2 border-main-primary',
      text: 'text-black',
    },
  };

  const { boxStyle, text } = socialStyles[name];
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <Link
      href={path}
      className={`${boxStyle} md:w-[300px] md:h-[60px] md:rounded-lg w-[240px] h-[50px] rounded-md `}>
      <div className="h-full px-[30px] py-[10px] flex justify-start items-center  ">
        <div className="md:w-12 md:h-12 w-6 h-6 flex items-center justify-center">
          <Icon name={name} />
        </div>
        <h2 className={`${text} font-bold text-xs md:text-[14px] md:pl-8 pl-6`}>
          {capitalizedName.slice(0, -4)}로 시작하기
        </h2>
      </div>
    </Link>
  );
};
