'use client';

import { Accordion } from '@/components/@common/accordion';
import { EditQuestion } from '@/components/@common/editQuestion';
import IconButton from '@/components/@common/iconButton';
import { Text } from '@/components/@common/text';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { addQuestionListSelector } from '@/recoils/myInterview/withAdd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function CheckPage() {
  const router = useRouter();
  const questionList = useRecoilValue(addQuestionListSelector);
  //   const questionList = [
  //     { questionId: 1, questionContent: 'react 질문', answerContent: 'dfsfsdf' },
  //     { questionId: 2, questionContent: 'react 질문', answerContent: 'dfsfsdf' },
  //   ];
  const setQuestionList = useSetRecoilState(addQuestionListSelector);
  const [openStates, setOpenStates] = useState(questionList.map(() => false));
  const [editingStates, setEditingStates] = useState(questionList.map(() => false));
  const [currentAnswers, setCurrentAnswers] = useState(
    questionList.map(question => question.answerContent),
  );

  const handleToggle = (index: number) => {
    const updatedOpenStates = openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen));
    setOpenStates(updatedOpenStates);
  };

  const handleDoubleClick = (index: number) => {
    const updatedEditingStates = editingStates.map((isEditing, i) =>
      i === index ? true : isEditing,
    );
    setEditingStates(updatedEditingStates);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = currentAnswers.map((content, i) => (i === index ? value : content));
    setCurrentAnswers(updatedAnswers);
  };

  const handleInputBlur = (index: number) => {
    const updatedEditingStates = editingStates.map((isEditing, i) =>
      i === index ? false : isEditing,
    );
    setEditingStates(updatedEditingStates);
  };

  const handleMove = () => {
    const updatedQuestions = questionList.map((question, index) => ({
      ...question,
      answerContent: currentAnswers[index],
    }));

    setQuestionList(updatedQuestions);
    router.push('/interview/result');
  };

  useBeforeUnload();

  return (
    <>
      <Text as="h2" size="xl" weight="lg" className="mb-5">
        면접 확인
      </Text>
      <Text as="h2" size="md" weight="md" color="blue" className="mb-5">
        * 내가 답변한 내용을 확인하고 수정하세요.
      </Text>
      <ul>
        {questionList.map((question, index) => (
          <Accordion
            key={question.questionId}
            title={question.questionContent}
            isMain
            isOpen={openStates[index]}
            onClick={() => handleToggle(index)}>
            {editingStates[index] || currentAnswers[index] === '' ? (
              <textarea
                value={currentAnswers[index]}
                className="w-full resize-none border-none px-11 text-[14px]"
                onChange={e => handleAnswerChange(index, e.target.value)}
                onBlur={() => handleInputBlur(index)}
              />
            ) : (
              <div onClick={() => handleDoubleClick(index)}>
                <Text size="lg" weight="md" className="px-11">
                  {currentAnswers[index]}
                </Text>
              </div>
            )}
          </Accordion>
        ))}

        {/* {questionList.map(question => (
          <EditQuestion
            key={question.questionId}
            title={question.questionContent}
            question={question.answerContent}
          />
        ))} */}
      </ul>
      <IconButton
        iconName="next_arrow.png"
        edge="end"
        size="md"
        className="absolute bottom-14 right-[300px]"
        onClick={handleMove}>
        다음 단계
      </IconButton>
      <div className="absolute bottom-14 right-14">
        <Image src="/laptop.png" alt="laptop" width={220} height={180} />
      </div>
    </>
  );
}
