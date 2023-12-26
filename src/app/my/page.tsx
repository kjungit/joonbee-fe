'use client';
import { BetweenBox } from '@/components/common/BetweenBox';
import { DetailAnswerCard } from '@/components/common/DetailAnswerCard';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import MyProfile from '@/components/page/My/MyProfile';
import { Button } from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getCategoryInterview, getLikeCategoryInterview } from '../apis/services/member';
import { MyInterviewCard } from '@/components/common/MyInterviewCard';

interface DataProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}

export default function MyPage() {
  const [current, setCurrent] = useState<Number>(1);
  const [currentData, setCurrentData] = useState<DataProps[]>();
  const onClickCategory = (item: ItemProps) => {
    console.log(item);
    setCurrent(item.id);
  };
  const { data: myData } = useSWR<DataProps[]>('api/member/category', () =>
    getCategoryInterview(1),
  );
  const { data: likeData } = useSWR<DataProps[]>('api/member/category/like', () =>
    getLikeCategoryInterview(1),
  );

  useEffect(() => {
    setCurrentData(myData);
    console.log(myData);
  }, []);

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
                myData &&
                myData.map(i => (
                  <MyInterviewCard
                    key={i.interviewId}
                    categoryName={i.categoryName}
                    interviewId={i.interviewId}
                    questionCount={i.questionCount}
                    onDelete={() => {}}
                    onClick={() => {}}
                  />
                ))}{' '}
              {current === 2 &&
                likeData &&
                likeData.map(i => (
                  <MyInterviewCard
                    key={i.interviewId}
                    categoryName={i.categoryName}
                    interviewId={i.interviewId}
                    questionCount={i.questionCount}
                    onDelete={() => {}}
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
