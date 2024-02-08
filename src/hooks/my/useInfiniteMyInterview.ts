import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { getInfiniteData } from '@/app/apis/services/member';
import { preload } from 'swr';

export interface MyInterviewProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}
export default function useInfiniteMyInterview(category: 'my_interview' | 'liked' | null) {
  if (category === null) category = 'my_interview';
  const getKey = (page: number = 1, previousPageData: MyInterviewProps[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const newCategory =
      category === 'my_interview' ? 'api/member/category' : 'api/member/category/like';
    return `${newCategory}?page=${newPage}`;
  };

  const {
    data,
    setSize,
    isValidating,
    mutate: myInterviewMutate,
    isLoading: myInterviewLoading,
  } = useSWRInfinite<MyInterviewProps[]>(getKey, url => getInfiniteData(url), {
    revalidateAll: true,
  });

  const newData = data ? ([] as MyInterviewProps[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, isValidating, setTarget, setSize, myInterviewMutate, myInterviewLoading };
}
