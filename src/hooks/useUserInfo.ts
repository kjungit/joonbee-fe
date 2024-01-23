import { getUserInfo } from '@/app/apis/services/member';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import useSWR, { preload } from 'swr';
export interface UserInfoProps {
  id: string;
  interviewCount: string;
  nickName: string;
  thumbnail: string;
  questionCount: string;
  categoryInfo: CategoryInfoProps[];
}

export type CategoryInfoProps = {
  categoryCount: number;
  categoryName: string;
};
interface AxiosError<Data = any, Error = any> {
  response?: AxiosResponse;
  request?: AxiosRequestConfig;
  retryCount: number;
}
export const useUserInfo = () => {
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const { data: userInfo, mutate: userInfoMutate } = useSWR<UserInfoProps, AxiosError>(
    '/auth/member/info',
    getUserInfo,
    {
      onSuccess: () => {
        setisLogined(true);
      },
      onErrorRetry: ({ retryCount }) => {
        if (retryCount >= 3) return;
      },
    },
  );

  preload('/auth/member/info', getUserInfo);

  return { userInfo, userInfoMutate };
};
