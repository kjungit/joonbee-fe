import React from 'react';
import { Icon } from '../Icon';
import { capitalizeFirstLetter } from '../../../utils/format';

export type IconName = 'kakao' | 'naver' | 'google';

export type IconButton = {
  name: IconName;
};

export const IconButton = ({ name = 'kakao' }: IconButton) => {
  const baseStyles = ``;

  const socialStyles = {
    kakao: {
      boxStyle: 'bg-yellow-kakao',
      text: 'text-black',
    },
    naver: {
      boxStyle: 'bg-green-naver',
      text: 'text-white',
    },
    google: {
      boxStyle: 'bg-white border',
      text: 'text-black',
    },
  };

  const { boxStyle, text } = socialStyles[name];

  const capitalizedName = capitalizeFirstLetter(name);

  const IconButtonStyles = `${baseStyles} ${socialStyles}`;
  console.log(IconButtonStyles);

  return (
    <div className={`${boxStyle} w-[340px] h-[70px]`}>
      <div className="h-full px-[30px] py-[10px] flex justify-start items-center">
        <Icon name={name} />
        <h2 className={`${text} font-bold text-[14px] pl-8`}>{capitalizedName}로 시작하기</h2>
      </div>
    </div>
  );
};
