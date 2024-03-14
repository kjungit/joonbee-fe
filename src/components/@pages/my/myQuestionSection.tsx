'use client';
import { Text } from '@/components/@common/text/text';
import { VariableIcon } from '@/components/@common/variableIcon/variableIcon';
import { useGetMyQuestion } from '@/queries/question/useGetMyQuestion';
import { QuestionDeleteIcon } from '../home/question/questionDeleteIcon';

export const MyQuestionSection = () => {
  const { questionData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetMyQuestion();

  return (
    <div>
      <div className="questionListHeight p-5">
        {status === 'pending' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>Error: {error?.message}</p>
        ) : (
          <ul className=" flex flex-col gap-4 interviewListHeight overflow-auto">
            {questionData &&
              questionData?.map(item => (
                <li key={item.questionId} className="flex gap-4">
                  <div className="flex gap-2">
                    <VariableIcon name="questionBox" size={18} />
                    <Text size="lg">{item.questionContent}</Text>
                  </div>
                  <QuestionDeleteIcon id={item.questionId} />
                </li>
              ))}
            <div ref={setTarget}></div>
          </ul>
        )}

        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    </div>
  );
};
