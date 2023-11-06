'use client';
import React from 'react';
import Logo from '@/components/ui/Logo';
import { SocialLoginButton } from '../SocialLoginButton';

export const LoginBox = () => {
  return (
    <div className="w-[410px] h-[580px] rounded-[50px] bg-white shadow-md flex items-center justify-center">
      <div className="flex items-center flex-col">
        <Logo size={'md'} />
        <p className="text-[30px] mt-7 mb-10 font-bold text-blue-secondary">JOONBEE 하세요.</p>
        <div className="flex flex-col gap-3">
          <SocialLoginButton name="kakao" onClick={() => {}} />
          <SocialLoginButton name="naver" onClick={() => {}} />
          <SocialLoginButton name="google" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
