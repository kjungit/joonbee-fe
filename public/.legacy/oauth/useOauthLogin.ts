import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { isLoginedStatus } from '../recoil/isLogined/atom';
import useSWR from 'swr';

export const useOauthLogin = (key: string, loginFunc: (AUTHORIZATION_CODE: string) => void) => {
  const searchParams = useSearchParams();
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const { data } = useSWR(key, () => loginFunc(AUTHORIZATION_CODE), {
    onSuccess: () => {
      router.push('/');
      setisLogined(true);
      sessionStorage.setItem('isLogined', 'true');
    },
    onError: error => {
      if (error.response.status === 410) {
      }
    },
  });
};
