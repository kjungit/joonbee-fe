'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { kakaoLogin } from '../apis/services/auth';
import { useRecoilState } from 'recoil';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function OauthPage() {
  const searchParams = useSearchParams();
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const { data, error } = useSWR('/auth/kakao', () => kakaoLogin(AUTHORIZATION_CODE), {
    onSuccess: () => {
      router.push('/');
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
