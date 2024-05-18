'use client';
import { LoginBox } from '@/components/@common/loginBox';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="w-full h-full mainBg">
      <div className="flex items-center justify-center md:mt-24 mt-12">
        <LoginBox />
      </div>
    </div>
  );
}
