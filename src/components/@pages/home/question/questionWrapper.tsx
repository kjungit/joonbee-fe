'use client';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { QuestionSaveIcon } from './questionSaveIcon';
import { useGetQuestion } from '@/queries/question/useGetQuestion';

export const QuestionWrapper = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const { questionData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetQuestion();
  useEffect(() => {
    console.log(questionData);
  }, [status, isFetching]);
  return (
    <section className="min-w-[800px] h-full effect-white p-5 flex flex-col gap-8 ">
      <div className="questionListHeight ">
        {categoryParams === 'question' &&
          (status === 'pending' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <p>Error: {error?.message}</p>
          ) : (
            <ul className=" flex flex-col gap-4 interviewListHeight overflow-auto">
              {questionData &&
                questionData.map((item, i) => (
                  <li key={item.questionId} className="flex gap-4">
                    <div className="flex gap-2">
                      <VariableIcon name="questionBox" size={18} />
                      <Text size="lg">{item.questionContent}</Text>
                    </div>
                    <QuestionSaveIcon
                      subcategoryName={item.subcategoryName}
                      questionContent={item.questionContent}
                    />
                  </li>
                ))}
              <div ref={setTarget}></div>
            </ul>
          ))}

        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    </section>
  );
};
