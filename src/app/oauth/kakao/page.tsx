'use client';
import React from 'react';
import { kakaoLogin } from '../../../../public/.legacy/app/apis/services/auth';
import Image from 'next/image';
import { useOauthLogin } from '../../../../public/.legacy/oauth/useOauthLogin';
import authQueries from '@/queries/authQueries';

export default function OauthPage() {
  authQueries.useGetGoogleLogin('/auth/kakao');

  return (
    <div className="flex items-center justify-center mainBg origin-h">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
