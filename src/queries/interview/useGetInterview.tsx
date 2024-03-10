import { InterviewProps, getInterview } from '@/apis/services/interviewApis';
import { InterviewItem } from '@/types/interview';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetInterview = ({ selectCategory, sort }: InterviewProps) => {
  const { data: interviewData, refetch: interviewRefetch } = useQuery<InterviewItem[]>({
    queryKey: ['getInterview', selectCategory, sort],
    queryFn: () => getInterview({ selectCategory, sort }),
  });

  useEffect(() => {
    interviewRefetch();
  }, [selectCategory, sort]);

  return { interviewData, interviewRefetch };
};
