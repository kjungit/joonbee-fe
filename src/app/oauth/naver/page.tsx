'use client';
import React from 'react';
import Image from 'next/image';
import authApis from '@/apis/services/authApis';

export default function OauthPage() {
  return (
    <div className="flex items-center justify-center mainBg origin-h">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
