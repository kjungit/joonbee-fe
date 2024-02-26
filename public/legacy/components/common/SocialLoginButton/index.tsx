import React from 'react';
import { capitalizeFirstLetter } from '@/utils/format';
import { Icon } from '../../ui/Icon';

export type IconName = 'kakao' | 'naver' | 'google';

export type SocialLoginButtonProps = {
  name: IconName;
  onClick: () => void;
};

export const SocialLoginButton = ({ name = 'kakao', onClick }: SocialLoginButtonProps) => {
  const socialStyles = {
    kakao: {
      boxStyle: 'bg-yellow-kakao hover:border-main-primary border-4 border-yellow-kakao',
      text: 'text-black',
    },
    naver: {
      boxStyle: 'bg-green-naver hover:border-main-primary border-4 border-green-naver',
      text: 'text-white',
    },
    google: {
      boxStyle:
        'bg-white hover:border-main-primary hover:border-4 p-[2px] hover:p-0 border-2 border-main-primary',
      text: 'text-black',
    },
  };

  const { boxStyle, text } = socialStyles[name];
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <button className={`${boxStyle} w-[340px] h-[70px] rounded-lg `} onClick={onClick}>
      <div className="h-full px-[30px] py-[10px] flex justify-start items-center  ">
        <Icon name={name} />
        <h2 className={`${text} font-bold text-[16px] pl-8`}>{capitalizedName}로 시작하기</h2>
      </div>
    </button>
  );
};
