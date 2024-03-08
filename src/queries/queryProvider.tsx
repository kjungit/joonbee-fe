'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
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
        onError: err => {
          //Todo: 토큰이 만료되는 로직처리 작성
          console.log('error', err);
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
