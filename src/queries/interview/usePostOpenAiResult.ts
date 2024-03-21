import { postOpenAi } from '@/apis/services/openAiApis';
import { myInterviewAtom } from '@/recoils/myInterview/atom';
import { OpenAiInterviewData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export const usePostOpenAiResult = () => {
  const [isMutate, setInMutate] = useState(false);
  const myInterviewData = useRecoilValue(myInterviewAtom);
  const {
    mutate: openAiTrigger,
    data: openAiResultData,
    isSuccess,
  } = useMutation<OpenAiInterviewData>({
    mutationKey: ['postOpenAiInterview', myInterviewData],
    mutationFn: () => postOpenAi(myInterviewData),
    onSuccess: () => {
      setInMutate(true);
    },
  });

  return { openAiTrigger, isMutate, openAiResultData, isSuccess };
};
