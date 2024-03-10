'use client';
import React from 'react';
import Image from 'next/image';
import authQueries from '@/queries/authQueries';

export default function OauthPage() {
  authQueries.useGetGoogleLogin('/auth/kakao');

  return (
    <div className="flex items-center justify-center mainBg origin-h">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
