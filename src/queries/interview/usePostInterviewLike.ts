'use client';

import { postInterviewLike } from '@/apis/services/memberApis';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useGetInterview } from './useGetInterview';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
const queryClient = new QueryClient();

export const usePostInterviewLike = (interviewId: number) => {
  const selectInterviewCategory = useRecoilValue(selectInterviewCategoryState);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);

  const { interviewRefetch } = useGetInterview({
    selectCategory: selectInterviewCategory.category,
    sort: selectInterviewCategory.sort,
  });
  const { mutate: interviewLikeMutate } = useMutation({
    mutationKey: ['postInterviewLike', interviewId],
    mutationFn: () => postInterviewLike(interviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      interviewRefetch();
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
