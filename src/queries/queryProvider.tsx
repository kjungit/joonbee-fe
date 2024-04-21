'use client';

import authApis from '@/apis/services/authApis';
import { getUserInfo } from '@/apis/services/memberApis';
import { CommonModal } from '@/components/@common/commonModal';
import ModalPortal from '@/components/@common/modalPortal';
import { Text } from '@/components/@common/text';
import { isLoginState } from '@/recoils/user/isLoginState/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isLoginErrorAtom } from '@/recoils/user/isRefresh/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { removeCookie } from '@/utils/cookies';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isLoginState);
  const [isLoginError, setIsLoginError] = useRecoilState(isLoginErrorAtom);
  const router = useRouter();

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
          console.log('error', error);
          if (error === 403) {
            router.push('/login');

            removeCookie('joonbee-token');
            removeCookie('joonbee-token-refresh');
            setIsLogined(false);
          }
          if (error === 401 || error === 402) {
            authApis.getRefresh().then(data => {
              if (data.status !== 200) {
                router.push('/login');
                removeCookie('joonbee-token');
                removeCookie('joonbee-token-refresh');
                setIsOpen(true);
                resetUserInfo();
                setIsLogined(false);
              } else {
                getUserInfo().then(data => {
                  setUserInfo(data);
                });
              }
            });
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
      {isLoginError && (
        <ModalPortal>
          <CommonModal
            isModalOpen={isLoginError}
            setIsModalOpen={setIsLoginError}
            onFunc={() => {
              router.push('/login');
            }}>
            <Text size="xl" className="text-blue-secondary w-full" weight="lg">
              로그인에 문제가 있어요. 재시도 해주세요.
            </Text>
          </CommonModal>
        </ModalPortal>
      )}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
