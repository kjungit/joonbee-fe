import useSWR, { preload } from 'swr';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import { CategoryName } from '@/types/question';
import { sortType } from '@/constants/apiState';
import { getInterview } from '@/app/apis/services/interview';
export default function useInterviewAll(categorySelect: CategoryName, current: number) {
  const {
    data,
    isLoading,
    mutate: interviewAllMutate,
  } = useSWR<InterviewItemType[]>(
    categorySelect ? ['/api/interview/all', categorySelect, current] : null,
    () =>
      getInterview(
        `/api/interview/all?page=1&category=${categorySelect}&sort=${sortType[current]}`,
      ),
  );

  return { data, isLoading, interviewAllMutate };
}
