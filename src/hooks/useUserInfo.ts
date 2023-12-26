import { getUserInfo } from '@/app/apis/services/member';
import { AxiosError, AxiosResponse } from 'axios';
import useSWR from 'swr';
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

export const useUserInfo = () => {
  const { data: userInfo } = useSWR<AxiosResponse<UserInfoProps, AxiosError>>(
    ['/auth/member/info'],
    getUserInfo,
    {
      shouldRetryOnError: false,
    },
  );
  return { userInfo };
};
