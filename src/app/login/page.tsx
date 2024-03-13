import { LoginBox } from '@/components/@common/loginBox/loginBox';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="w-full h-full mainBg">
      <div className="flex items-center justify-center mt-24">
        <LoginBox />
      </div>
    </div>
  );
}
