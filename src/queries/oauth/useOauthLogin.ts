import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInfo } from '../useUserInfo';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/recoils/user/userInfo/atom';

export const useOauthLogin = (key: string, loginFunc: (AUTHORIZATION_CODE: string) => void) => {
  const searchParams = useSearchParams();
  const [useInfo, setUserInfo] = useRecoilState(userInfoState);
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const { userInfoData, userinfoRefetch } = useUserInfo();
  const { data, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: () => loginFunc(AUTHORIZATION_CODE),
  });

  useEffect(() => {
    if (isSuccess) {
      setUserInfo(userInfoData);
    }
  }, [isSuccess]);

  useEffect(() => {
    router.push('/');
  }, [userInfoData]);
};
