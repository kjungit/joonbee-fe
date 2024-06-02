import authApis from '@/apis/services/authApis';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserInfo } from './useUserInfo';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';
import { useRouter } from 'next/navigation';
import { isFirstLoginAtom } from '@/recoils/user/isFirstLogin/atom';

export const useUpdateNick = () => {
  const nickState = useRecoilValue(NickNameAtom);
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(isFirstLoginAtom);

  const { userInfoRefetch } = useUserInfo();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);
  const router = useRouter();
  const {
    mutateAsync: nickMutate,
    error: nickError,
    isSuccess: isNickSuccess,
  } = useMutation<any, number, any>({
    mutationKey: ['useUpdateNick'],
    mutationFn: () => authApis.postNickName({ id: nickState.id, nickName: nickState.nickName }),
    onSuccess: () => {
      setIsNickOpen(!isNickOpen);
      userInfoRefetch();
      setUserInfo({ ...userInfo, nickName: nickState.nickName });
      if (isFirstLogin) {
        router.push('/');
        setIsFirstLogin(!isFirstLogin);
      }
    },
  });

  return { nickMutate, nickError, isNickSuccess };
};
