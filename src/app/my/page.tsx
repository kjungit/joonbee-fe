'use client';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import MyProfile from '@/components/page/My/MyProfile';
import { Button } from '@/components/ui/Button';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { MyInterviewCard } from '@/components/common/MyInterviewCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { deleteInterview } from '../apis/services/interview';
import useInfiniteMyInterview from '@/hooks/my/useInfiniteMyInterview';

export default function MyPage() {
  const [current, setCurrent] = useState<Number>(1);
  const [category, setCategory] = useState<'interview' | 'liked' | null>('interview');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const onClickCategory = (item: ItemProps) => {
    router.push(
      pathname + '?' + createQueryString('category', item.id === 1 ? 'interview' : 'liked'),
    );
  };

  const { newData, setTarget, setSize } = useInfiniteMyInterview(category);

  useEffect(() => {
    setCategory(searchParams.get('category') as 'interview' | 'liked' | null);
  }, [newData]);

  return (
    <div className="bg-main-primary w-full h-full flex justify-center items-center">
      <div className="flex gap-6 max-w-[1024px] w-full px-5">
        <MyProfile />
        <div className="flex flex-col w-full  justify-between gap-6 ">
          <div className="flex gap-6 w-full">
            <Button size="md">면접 관리</Button>
            <Button size="md">질문 관리</Button>
          </div>
          <div className="bg-white w-full rounded-2xl p-6 h-full ">
            <RadioButtonGroup
              size="sm"
              data={[
                { id: 1, text: '내 면접' },
                { id: 2, text: '좋아요' },
              ]}
              onClickFunc={onClickCategory}
            />
            <ul className="flex flex-wrap w-full mt-4 gap-4 max-h-[400px] overflow-y-scroll py-2">
              {current === 1 &&
                newData &&
                newData.map(i => (
                  <MyInterviewCard
                    key={i.interviewId}
                    categoryName={i.categoryName}
                    interviewId={i.interviewId}
                    questionCount={i.questionCount}
                    onClick={() => {}}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
