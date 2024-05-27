'use client';

import { postInterviewLike } from '@/apis/services/memberApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { useGetLikedInterview } from '@/queries/interview/useGetLikedInterview';
import { useGetLatestInterview } from './useGetLatestInterview';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import { useSearchParams } from 'next/navigation';

export const usePostInterviewLike = (interviewId: number) => {
  const searchParams = useSearchParams();
  const sortParams = searchParams.get('sort') as string;
  const queryClient = useQueryClient();
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);

  const { interviewRefetch: latestRefetch } = useGetLatestInterview();
  const { interviewRefetch: likedRefetch } = useGetLikedInterview();
  const { mutate: interviewLikeMutate } = useMutation({
    mutationKey: ['postInterviewLike', interviewId],
    mutationFn: () => postInterviewLike(interviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      if (sortParams === 'latest') {
        latestRefetch();
      }
      if (sortParams === 'like') {
        likedRefetch();
      }
    },
    onError: (error: number) => {
      if (error === 401) {
        setIsOpen(true);
        setIsLogined(false);
      }
    },
  });

  return { interviewLikeMutate };
};
