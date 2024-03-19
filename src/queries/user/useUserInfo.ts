import { getUserInfo } from '@/apis/services/memberApis';
import { isLoginedStatus } from '@/recoils/user/isLogined/atom';
import { userInfoState } from '@/recoils/user/userInfo/atom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedStatus);
  const router = useRouter();

  const { mutate: userInfoMutate } = useMutation({
    mutationKey: ['userInfo'],
    mutationFn: getUserInfo,
    onSuccess: data => {
      setUserInfo(data);
      setIsLogined(true);
      router.push('/');
    },
  });

  return { userInfoMutate };
};
