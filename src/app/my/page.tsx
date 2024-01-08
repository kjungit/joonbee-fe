'use client';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import MyProfile from '@/components/page/My/MyProfile';
import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InterviewComponent from '@/components/page/My/InterviewComponent';

import QuestionComponent from '@/components/page/My/QuestionComponent';

export default function MyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string, option: boolean) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      option && params.delete('sort');
      !option && params.append('sort', 'my_interview');
      return params.toString();
    },
    [searchParams],
  );
  const onClickCategory = (item: ItemProps) => {
    router.push(
      'my' +
        '?' +
        createQueryString(
          'category',
          item.id === 1 ? 'interview' : 'question',
          searchParams.get('category') === 'interview' ? true : false,
        ),
    );
  };

  return (
    <div className="bg-main-primary w-full h-full flex justify-center items-center">
      <div className="flex gap-6 max-w-[1024px] w-full px-5">
        <MyProfile />
        <div className="flex flex-col w-full  justify-between gap-6 ">
          <div className="flex gap-6 w-full">
            <RadioButtonGroup
              groupName="main-category"
              size="md"
              color="blue"
              data={[
                { id: 1, text: '면접 관리' },
                { id: 2, text: '질문 관리' },
              ]}
              onClickFunc={onClickCategory}
              defaultId={searchParams.get('category') === 'interview' ? 1 : 2}
            />
          </div>
          <div className="bg-white w-full rounded-2xl p-6 h-full ">
            {searchParams.get('category') === 'interview' ? (
              <InterviewComponent />
            ) : (
              <QuestionComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
