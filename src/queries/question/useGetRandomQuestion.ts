import { getRandomQuestionList } from '@/apis/services/questionApis';
import { InterviewType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomQuestionList(data: {
  category: string;
  subcategory: string;
  questionCount: number;
  interviewType: InterviewType | '';
}) {
  const { interviewType, ...params } = data;
  return useQuery({
    queryKey: ['randomQuestionList', params],
    queryFn: () => getRandomQuestionList(params),
    enabled: interviewType === 'random',
  });
}
