import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import { CategoryName } from '@/types/question';
import { sortType } from '@/constants/apiState';
import { getInfiniteData } from '@/app/apis/services/member';
import useSWRMutation from 'swr/mutation';
import { getLogout } from '@/app/apis/services/auth';

export interface MyInterviewProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}
export default function useInfiniteInterview(categorySelect: CategoryName, current: number) {
  const { trigger: logoutTrigger } = useSWRMutation('/logout', getLogout);

  const getKey = (page: number, previousPageData: InterviewItemType[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    // return `/api/interview/all?page=${newPage}&category=${categorySelect}&sort=${sortType[current]}`;
    return `/api/interview/all?page=${newPage}&category=${'fe'}&sort=${sortType[current]}`;
  };

  const {
    data,
    isLoading,
    setSize,
    mutate: interviewMutate,
  } = useSWRInfinite<InterviewItemType[]>(getKey, url => getInfiniteData(url), {
    onError: error => {
      console.log(error);
    },
  });

  const newData = data ? ([] as InterviewItemType[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, isLoading, setTarget, interviewMutate };
}
