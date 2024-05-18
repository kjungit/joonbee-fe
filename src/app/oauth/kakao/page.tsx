'use client';
import React from 'react';
import Image from 'next/image';
import { useOauthLogin } from '@/queries/user/oauth/useOauthLogin';
import authApis from '@/apis/services/authApis';

export default function OauthPage() {
  useOauthLogin('/kakao', authApis.kakaoLogin);

  return (
    <div className="w-full mainBg questionListHeight">
      <div className="flex flex-col h-full items-center justify-center">
        <Image src={'/loginLoading.gif'} width={70} height={70} alt="loading" />
      </div>
    </div>
  );
}
