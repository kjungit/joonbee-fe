'use client';
import { getRefresh } from '@/app/apis/services/auth';
import { isRefreshStatus } from '@/recoil/isRefresh/atoms';
import React from 'react';
import { useRecoilState } from 'recoil';
import { SWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  const [isRefresh, setIsRefresh] = useRecoilState(isRefreshStatus);

  const { trigger } = useSWRMutation('/auth/login/refresh', getRefresh, {
    onSuccess: () => {},
    onError: error => {
      setIsRefresh(true);
    },
  });

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError: (error: any) => {
          console.log(error);
          if (error.response.status === 401) trigger();
        },
      }}>
      {children}
    </SWRConfig>
  );
}
