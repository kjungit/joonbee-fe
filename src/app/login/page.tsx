import { LoginBox } from '@/components/@common/LoginBox';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="w-full h-full mainBg">
      <div className="flex items-center justify-center h-screen">
        <LoginBox />
      </div>
    </div>
  );
}
