'use client';

import { removeCookie } from '@/utils/cookies';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
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
            alert('재로그인 해주세요.');
          }
        },
      }),
    });
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
