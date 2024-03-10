import { postInterviewLike } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { useGetInterview } from './useGetInterview';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';

export const usePostInterviewLike = (interviewId: number) => {
  const selectInterviewCategory = useRecoilValue(selectInterviewCategoryState);
  const { interviewRefetch } = useGetInterview({
    selectCategory: selectInterviewCategory.category,
    sort: selectInterviewCategory.sort,
  });
  const { mutate: interviewLikeMutate } = useMutation({
    mutationKey: ['postInterviewLike', interviewId],
    mutationFn: () => postInterviewLike(interviewId),
    onSuccess: () => {
      interviewRefetch();
    },
    onError: (error: number) => {
      if (error === 401) alert('로그인 후 이용해주세요.');
    },
  });

  return { interviewLikeMutate };
};
