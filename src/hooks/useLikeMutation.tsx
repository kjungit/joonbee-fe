'use client';
import { postInterviewLike } from '@/app/apis/services/member';
import { CategoryName } from '@/types/question';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import useInfiniteMyInterview from './my/useInfiniteMyInterview';
import useInterviewAll from './main/useInterviewAll';
import useInfiniteInterview from './interview/useInfiniteInterview';
import { useEffect } from 'react';

export const useLikeMutation = (
  interviewId: number,
  categorySelect: CategoryName,
  current: number,
) => {
  const { myInterviewMutate } = useInfiniteMyInterview(current === 1 ? 'my_interview' : 'liked');
  const { interviewAllMutate } = useInterviewAll(categorySelect, current);
  const { interviewMutate } = useInfiniteInterview(categorySelect, current);
  const { trigger: likeTrigger } = useSWRMutation(
    ['api/member/like', interviewId, current],
    () => postInterviewLike(interviewId),
    {
      onSuccess: () => {
        interviewMutate();
        myInterviewMutate();
        interviewAllMutate();
        console.log(interviewId);
      },
    },
  );

  return { likeTrigger };
};
