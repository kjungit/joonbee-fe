'use client';
import { getRefresh } from '@/app/apis/services/auth';
import useRefreshToken from '@/hooks/useRefreshToken';
import { isRefreshStatus } from '@/recoil/isRefresh/atoms';
import React from 'react';
import { useRecoilState } from 'recoil';
import { SWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  const { refreshTrigger } = useRefreshToken();
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError: error => {
          if (error.response.status === 403) refreshTrigger();
          if (error.response.status === 402) refreshTrigger();
        },
      }}>
      {children}
    </SWRConfig>
  );
}
