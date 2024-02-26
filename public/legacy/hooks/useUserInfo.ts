import { getUserInfo } from '../app/apis/services/member';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR from 'swr';
export interface UserInfoProps {
  id: string;
  interviewCount: string;
  email: string | undefined;
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
  const { data: userInfo, mutate: userInfoMutate } = useSWR<UserInfoProps, AxiosError>(
    '/auth/member/info',
    getUserInfo,
  );

  return { userInfo, userInfoMutate };
};
