import { isLoginedStatus } from '../../recoil/isLogined/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { isNickNameStatus } from '../../recoil/isNickName/atom';

export const useOauthLogin = (key: string, loginFunc: (AUTHORIZATION_CODE: string) => void) => {
  const searchParams = useSearchParams();
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const router = useRouter();
  const [nickNameStatus, setNickNameStatus] = useRecoilState(isNickNameStatus);
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const { data } = useSWR(key, () => loginFunc(AUTHORIZATION_CODE), {
    onSuccess: () => {
      router.push('/');
      setisLogined(true);
      sessionStorage.setItem('isLogined', 'true');
    },
    onError: error => {
      if (error.response.status === 410) {
        setNickNameStatus({
          ...nickNameStatus,
          id: error.response.data.data,
          isNickStatus: true,
        });
      }
    },
  });
};
