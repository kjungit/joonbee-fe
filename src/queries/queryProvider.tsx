'use client';

import { CommonModal } from '@/components/@common/commonModal';
import ModalPortal from '@/components/@common/modalPortal';
import { Text } from '@/components/@common/text';
import { isLoginState } from '@/recoils/user/isLoginState/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { removeCookie } from '@/utils/cookies';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isLoginState);

  const [client] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          refetchOnWindowFocus: false,
          retry: 0,
          networkMode: 'offlineFirst',
          refetchOnMount: true,
        },
        mutations: {
          networkMode: 'offlineFirst',
          retry: 0,
        },
      },
      queryCache: new QueryCache({
        onError: (error: any) => {
          //Todo: 토큰이 만료되는 로직처리 작성
          if (error === 403) {
            removeCookie('joonbee-token');
            removeCookie('joonbee-token-refresh');
            setIsOpen(true);
            resetUserInfo();
            setIsLogined(false);
          }
        },
      }),
    });
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      {isOpen && (
        <ModalPortal>
          <CommonModal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
            <Text size="xl" className="text-blue-secondary w-full" weight="lg">
              재로그인 해주세요.
            </Text>
          </CommonModal>
        </ModalPortal>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
