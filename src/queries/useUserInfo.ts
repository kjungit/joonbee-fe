import { getUserInfo } from '@/apis/services/memberApis';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const {
    data: userInfoData,
    isSuccess,
    refetch: userinfoRefetch,
  } = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });

  useEffect(() => {
    if (isSuccess) return;

    console.log(userInfoData);
  }, [userInfoData]);
  return { userInfoData, userinfoRefetch };
};
