'use client';
import React, { MouseEvent } from 'react';
import Logo from '@/components/ui/Logo';
import { SocialLoginButton } from '../SocialLoginButton';
import { useUserInfo } from '@/hooks/useUserInfo';

export const REDIRECT_URI = 'http://localhost:3000/oauth';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const LoginBox = () => {
  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URI; // url 주소 변경
  };

  return (
    <div
      onClick={onClickOpen}
      className="fixed z-40  -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[390px] h-[550px] rounded-[50px] bg-white shadow-md flex items-center justify-center">
      <div className="flex items-center flex-col">
        <Logo size={'lg'} />
        <p className="text-[30px] mt-7 mb-10 font-bold text-blue-secondary">JOONBEE 하세요.</p>
        <div className="flex flex-col gap-3">
          <SocialLoginButton name="kakao" onClick={loginHandler} />
          <SocialLoginButton name="naver" onClick={() => {}} />
          <SocialLoginButton name="google" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
