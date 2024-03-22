import { getRandomQuestionList } from '@/apis/services/questionApis';
import { InterviewType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomQuestionList(data: {
  category: string;
  subcategory: string;
  questionCount: number;
  interviewType: InterviewType;
}) {
  const { interviewType, ...params } = data;
  const { data: randomQuestionData, isSuccess } = useQuery({
    queryKey: ['randomQuestionList'],
    queryFn: () => getRandomQuestionList(params),
    enabled: interviewType === 'random',
  });

  return { randomQuestionData, isSuccess };
}
