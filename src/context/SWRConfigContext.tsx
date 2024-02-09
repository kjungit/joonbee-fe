'use client';
import { getLogout, getRefresh } from '@/app/apis/services/auth';
import useRefreshToken from '@/hooks/useRefreshToken';
import { isRefreshStatus } from '@/recoil/isRefresh/atoms';
import React from 'react';
import { useRecoilState } from 'recoil';
import { SWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Props = {
  children: React.ReactNode;
};
/**
 *
 * 401 토큰 없음
 * 402 토큰 만료
 * 403 토큰 이상
 */
export default function SWRConfigContext({ children }: Props) {
  const { refreshTrigger } = useRefreshToken();
  const { trigger: logoutTrigger } = useSWRMutation('/logout', getLogout);

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError: error => {
          if (error.response.status === 403) logoutTrigger();
          if (error.response.status === 402) refreshTrigger();
        },
      }}>
      {children}
    </SWRConfig>
  );
}
