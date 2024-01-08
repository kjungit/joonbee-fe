import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import { CategoryName } from '@/types/question';
import { sortType } from '@/constants/apiState';
import { getInterview } from '@/app/apis/services/interview';

export interface MyInterviewProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}
export default function useInfiniteInterview(categorySelect: CategoryName, current: number) {
  const getKey = (page: number, previousPageData: InterviewItemType[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return `/api/interview/all?page=${newPage}&category=${categorySelect}&sort=${sortType[current]}`;
  };

  const {
    data,
    isLoading,
    setSize,
    mutate: interviewMutate,
  } = useSWRInfinite<InterviewItemType[]>(getKey, url => getInterview(url));

  const newData = data ? ([] as InterviewItemType[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, isLoading, setTarget, interviewMutate };
}
