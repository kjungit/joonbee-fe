import React from 'react';
import { capitalizeFirstLetter } from '@/utils/format';
import { Icon } from '../icon/icon';

export type IconName = 'kakao.png' | 'naver.png' | 'google.png';

export type SocialLoginButtonProps = {
  name: IconName;
  onClick: () => void;
};

export const SocialLoginButton = ({ name, onClick }: SocialLoginButtonProps) => {
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
    <button className={`${boxStyle} w-[300px] h-[60px] rounded-lg `} onClick={onClick}>
      <div className="h-full px-[30px] py-[10px] flex justify-start items-center  ">
        <div className="w-12 h-12 flex items-center justify-center">
          <Icon name={name} />
        </div>
        <h2 className={`${text} font-bold text-[14px] pl-8`}>
          {capitalizedName.slice(0, -4)}로 시작하기
        </h2>
      </div>
    </button>
  );
};
