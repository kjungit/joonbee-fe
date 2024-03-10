import { getInterviewDetail } from '@/apis/services/memberApis';
import { DetailData, InterviewItem } from '@/types/interview';
import { useQuery } from '@tanstack/react-query';

export const useGetDetailInterview = (id: number) => {
  const { data: detailInterview } = useQuery<DetailData>({
    queryKey: ['getDetailInterview', id],
    queryFn: () => getInterviewDetail(id),
  });

  return { detailInterview };
};
