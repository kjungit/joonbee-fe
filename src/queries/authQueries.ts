import authApis from '@/app/apis/services/authApis';
import { useMutation, useQuery } from '@tanstack/react-query';

const useGetToken = () => {
  return useQuery({
    queryKey: ['getToken'],
    queryFn: () => authApis.getToken(),
  });
};

const useGetRefresh = () => {
  return useQuery({
    queryKey: ['getRefresh'],
    queryFn: () => authApis.getRefresh(),
  });
};

const useGetKakaoLogin = (code: string) => {
  return useQuery({
    queryKey: ['getKakaoLogin'],
    queryFn: () => authApis.kakaoLogin(code),
  });
};

const useGetNaverLogin = (code: string) => {
  return useQuery({
    queryKey: ['getNaverLogin'],
    queryFn: () => authApis.naverLogin(code),
  });
};

type PostNickNameProps = {
  id: string;
  nickName: string;
};

const useGetGoogleLogin = (code: string) => {
  return useQuery({
    queryKey: ['getGoogleLogin'],
    queryFn: () => authApis.googleLogin(code),
  });
};

const useGetLogout = () => {
  return useQuery({
    queryKey: ['getLogout'],
    queryFn: () => authApis.getLogout,
  });
};

const usePostNickName = () => {
  return useMutation({
    mutationFn: ({ id, nickName }: PostNickNameProps) => {
      return authApis.postNickName({ id, nickName });
    },
  });
};

const authQueries = {
  useGetToken,
  useGetRefresh,
  useGetKakaoLogin,
  useGetNaverLogin,
  useGetGoogleLogin,
  useGetLogout,
  usePostNickName,
};

export default authQueries;
