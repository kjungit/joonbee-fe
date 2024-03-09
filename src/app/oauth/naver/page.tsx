'use client';
import React from 'react';
import Image from 'next/image';
import { naverLogin } from '../../../../public/.legacy/app/apis/services/auth';
import { useOauthLogin } from '../../../../public/.legacy/hooks/oauth/useOauthLogin';

export default function OauthPage() {
  useOauthLogin('/auth/naver', naverLogin);

  return (
    <div className="flex items-center justify-center mainBg origin-h">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
