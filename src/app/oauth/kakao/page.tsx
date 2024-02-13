'use client';
import React from 'react';
import { kakaoLogin } from '../../apis/services/auth';
import Image from 'next/image';
import { useOauthLogin } from '@/hooks/oauth/useOauthLogin';

export default function OauthPage() {
  useOauthLogin('/auth/kakao', kakaoLogin);

  return (
    <div className="flex items-center justify-center mainBg origin-h">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
