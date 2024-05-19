import authApis from '@/apis/services/authApis';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserInfo } from './useUserInfo';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';

export const useUpdateNick = () => {
  const nickState = useRecoilValue(NickNameAtom);
  const { userInfoRefetch } = useUserInfo();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);

  const { mutate: nickMutate, error: nickError } = useMutation<any, number, any>({
    mutationKey: ['useUpdateNick'],
    mutationFn: () => authApis.postNickName({ id: nickState.id, nickName: nickState.nickName }),
    onSuccess: () => {
      setIsNickOpen(!isNickOpen);
      userInfoRefetch();
      setUserInfo({ ...userInfo, nickName: nickState.nickName });
    },
  });

  return { nickMutate, nickError };
};
