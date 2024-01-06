import { getUserInfo } from '@/app/apis/services/member';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const { data: userInfo, mutate: userInfoMutate } = useSWR<
    AxiosResponse<UserInfoProps, AxiosError>
  >(['/auth/member/info'], getUserInfo, {
    revalidateOnMount: true,
    onSuccess: () => {
      setisLogined(true);
    },
  });

  return { userInfo, userInfoMutate };
};
