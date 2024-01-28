'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { kakaoLogin } from '../../apis/services/auth';
import { useRecoilState } from 'recoil';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function OauthPage() {
  const searchParams = useSearchParams();
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);
  const { userInfoMutate } = useUserInfo();

  const { data, error } = useSWR('/auth/kakao', () => kakaoLogin(AUTHORIZATION_CODE), {
    onSuccess: () => {
      router.push('/');
      setisLogined(true);
      userInfoMutate();
    },
  });
  useEffect(() => {
    return () => {
      router.push('/');
      if (error) {
        setIsTokened({
          ...isTokened,
          id: error.data,
          isLogined: true,
        });
      }
    };
  }, [data, error]);
  return (
    <div className="flex items-center justify-center">
      <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
    </div>
  );
}
