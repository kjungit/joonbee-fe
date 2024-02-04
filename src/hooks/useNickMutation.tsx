import { postNickName } from '@/app/apis/services/auth';
import { isTokenedState } from '@/recoil/isTokened/atoms';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWRMutation from 'swr/mutation';
import { useUserInfo } from './useUserInfo';

type Props = {
  nickName: string;
};

export default function useNickMutation({ nickName }: Props) {
  const [isNickError, setIsNickError] = useState(false);
  const [isTokened, setIsTokened] = useRecoilState(isTokenedState);
  const { userInfoMutate } = useUserInfo();

  const { error: isDuplicate, trigger: nickTrigger } = useSWRMutation(
    '/auth/login/nick',
    () => postNickName({ id: isTokened.id, nickName }),
    {
      onSuccess: () => {
        setIsTokened({
          ...isTokened,
          isLogined: false,
        });
        userInfoMutate();
      },
      onError: () => {
        setIsNickError(true);
      },
      revalidate: false,
    },
  );
  return { isNickError, isDuplicate, nickTrigger };
}
