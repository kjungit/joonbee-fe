import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { getMyCategoryInterview } from '@/app/apis/services/member';

export interface MyInterviewProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}
export default function useInfiniteMyInterview(category: 'my_interview' | 'liked' | null) {
  if (category === null) category = 'my_interview';
  const getKey = (page: number, previousPageData: MyInterviewProps[]) => {
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
  } = useSWRInfinite<MyInterviewProps[]>(getKey, url => getMyCategoryInterview(url), {
    revalidateAll: true,
  });

  const newData = data ? ([] as MyInterviewProps[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, isValidating, setTarget, setSize, myInterviewMutate };
}
