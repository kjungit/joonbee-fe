import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInfo } from '../useUserInfo';

export const useOauthLogin = (key: string, loginFunc: (AUTHORIZATION_CODE: string) => void) => {
  const searchParams = useSearchParams();

  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const { userInfoMutate } = useUserInfo();
  const { data, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: () => loginFunc(AUTHORIZATION_CODE),
  });
  useEffect(() => {
    if (isSuccess) {
      userInfoMutate();
    }
  }, [isSuccess]);
};
