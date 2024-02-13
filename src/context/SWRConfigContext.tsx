'use client';
import { getLogout } from '@/app/apis/services/auth';
import useRefreshToken from '@/hooks/useRefreshToken';
import React from 'react';
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
          console.log(error);
          if (error === 403) logoutTrigger();
          if (error === 402) refreshTrigger();
        },
      }}>
      {children}
    </SWRConfig>
  );
}
