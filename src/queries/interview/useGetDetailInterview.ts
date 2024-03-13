import { getInterviewDetail } from '@/apis/services/memberApis';
import { DetailData } from '@/types/interview';
import { useQuery } from '@tanstack/react-query';

export const useGetDetailInterview = (id: number) => {
  const { data: detailInterview, isSuccess } = useQuery<DetailData>({
    queryKey: ['getDetailInterview', id],
    queryFn: () => getInterviewDetail(id),
    select(data) {
      const editData = {
        gptOpinion: data.gptOpinion,
        questionContents: data.questionContents.map(item => {
          return { ...item, isOpen: false };
        }),
      };
      return editData;
    },
  });

  return { detailInterview, isSuccess };
};
