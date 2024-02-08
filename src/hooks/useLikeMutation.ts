'use client';
import { postInterviewLike } from '@/app/apis/services/member';
import { CategoryName } from '@/types/question';
import useSWRMutation from 'swr/mutation';
import useInfiniteMyInterview from './my/useInfiniteMyInterview';
import useInterviewAll from './main/useInterviewAll';
import useInfiniteInterview from './interview/useInfiniteInterview';
import { useState } from 'react';

export const useLikeMutation = (
  interviewId: number,
  categorySelect: CategoryName,
  current: number,
) => {
  // const { myInterviewMutate } = useInfiniteMyInterview(current === 1 ? 'my_interview' : 'liked');
  // const { interviewAllMutate } = useInterviewAll(categorySelect, current);
  // const { interviewMutate } = useInfiniteInterview(categorySelect, current);
  const [isLikeError, setIsLikeError] = useState(false);
  const { trigger: likeTrigger } = useSWRMutation(
    ['api/member/like', interviewId, current],
    () => postInterviewLike(interviewId),
    {
      onSuccess: () => {
        // interviewMutate();
        // myInterviewMutate();
        // interviewAllMutate();
      },
      onError: () => {
        setIsLikeError(true);
      },
    },
  );

  return { likeTrigger, isLikeError, setIsLikeError };
};
