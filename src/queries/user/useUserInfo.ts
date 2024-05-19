import { getUserInfo } from '@/apis/services/memberApis';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [nickState, setNickState] = useRecoilState(NickNameAtom);

  const {
    data,
    isSuccess,
    isFetching,
    refetch: userInfoRefetch,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
      setIsLogined(true);
      setNickState({
        ...nickState,
        id: data.id,
      });
    }
  }, [isSuccess, isFetching]);

  return { userInfoRefetch };
};
