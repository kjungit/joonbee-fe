import { getUserInfo } from '@/app/apis/services/member';
import { isLoginedStatus } from '@/recoil/isLogined/atom';
import { AxiosError, AxiosResponse } from 'axios';
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

export const useUserInfo = () => {
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  const { data: userInfo, mutate: userInfoMutate } = useSWR<UserInfoProps, AxiosError>(
    '/auth/member/info',
    getUserInfo,
    {
      revalidateOnMount: true,
      onSuccess: () => {
        setisLogined(true);
      },
    },
  );

  preload('/auth/member/info', getUserInfo);

  return { userInfo, userInfoMutate };
};
