import { postNickName } from '@/app/apis/services/auth';
import useSWRMutation from 'swr/mutation';
import { useUserInfo } from './useUserInfo';
import { isNickNameStatus } from '@/recoil/isTokened/atoms';
import { useRecoilState } from 'recoil';

type Props = {
  userId: string;
  nickName: string;
};

export default function useNickMutation({ userId, nickName }: Props) {
  const [nickNameStatus, setNickNameStatus] = useRecoilState(isNickNameStatus);

  const { userInfoMutate } = useUserInfo();

  const { error: isDuplicate, trigger: nickTrigger } = useSWRMutation(
    '/auth/login/nick',
    () => postNickName({ id: userId, nickName }),
    {
      onSuccess: () => {
        userInfoMutate();
        setNickNameStatus({
          ...nickNameStatus,
          isNickStatus: false,
        });
      },
    },
  );
  return { isDuplicate, nickTrigger };
}
