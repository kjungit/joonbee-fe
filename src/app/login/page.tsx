'use client';
import { LoginBox } from '@/components/@common/loginBox';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function LoginPage() {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const resetUserInfo = useResetRecoilState(userInfoAtom);

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('redirect');

  useEffect(() => {
    if (categoryParams === 't') {
      setIsLogined(false);
      resetUserInfo();
    }
  }, []);

  return (
    <div className="w-full h-full mainBg">
      <div className="flex items-center justify-center md:mt-24 mt-12">
        <LoginBox />
      </div>
    </div>
  );
}
