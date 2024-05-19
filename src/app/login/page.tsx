'use client';
import { LoginBox } from '@/components/@common/loginBox';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function LoginPage() {
  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();

  useEffect(() => {
    if (userInfo.thumbnail) router.push('/');
  }, []);

  return (
    <div className="w-full h-full mainBg">
      <div className="flex items-center justify-center md:mt-24 mt-12">
        <LoginBox />
      </div>
    </div>
  );
}
