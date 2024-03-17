import { saveInterview } from '@/apis/services/interviewApis';
import { InterviewSaveData } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const usePostSaveInterview = (resultInterview: InterviewSaveData) => {
  const { mutate: saveTrigger, isSuccess: isSaveSuccess } = useMutation({
    mutationKey: ['postSaveInterview'],
    mutationFn: () => saveInterview(resultInterview),
  });

  return { saveTrigger, isSaveSuccess };
};
