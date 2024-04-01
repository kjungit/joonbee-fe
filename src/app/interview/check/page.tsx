'use client';

import { Accordion } from '@/components/@common/accordion';
import { EditQuestion } from '@/components/@common/editQuestion';
import IconButton from '@/components/@common/iconButton';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { addQuestionListSelector } from '@/recoils/myInterview/withAdd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function CheckPage() {
  const router = useRouter();
  // const questionList = useRecoilValue(addQuestionListSelector);
  const questionList = [
    { questionId: 1, questionContent: 'react 질문 react 질문', answerContent: 'dfsfsdf' },
    { questionId: 2, questionContent: 'react 질문', answerContent: 'dfsfsdf' },
    { questionId: 3, questionContent: 'react 질문', answerContent: 'dfsfsdf' },
  ];
  const [textareaHeight, setTextareaHeight] = useState('auto');

  const setQuestionList = useSetRecoilState(addQuestionListSelector);
  const [openStates, setOpenStates] = useState(questionList.map(() => true));
  const [editingStates, setEditingStates] = useState(questionList.map(() => false));
  const [currentAnswers, setCurrentAnswers] = useState(
    questionList.map(question => question.answerContent),
  );

  console.log('openStates', openStates);
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

    requestAnimationFrame(() => {
      const textarea = document.getElementById(`textarea-${index}`);
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaHeight(textarea.style.height); // 이 부분은 상태를 업데이트하는 데 필요하다면 유지
      }
    });
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLTextAreaElement>, index: number) => {
    const content = event.target.value.replace(/\s+/g, ' ');
    const newAnswers = [...currentAnswers];
    newAnswers[index] = content;
    setCurrentAnswers(newAnswers);

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

  return (
    <>
      <Text as="h2" size="xl" weight="lg" className="mb-5">
        면접 확인
      </Text>
      <Text as="h2" size="md" weight="md" color="blue" className="mb-5">
        * 내가 답변한 내용을 확인하고 수정하세요.
      </Text>
      <div>
        {questionList.map((question, index) => (
          <div key={question.questionId} className={`pb-2 border-gray-normal`}>
            <div className={`flex cursor-pointer items-center`} onClick={() => handleToggle(index)}>
              <VariableIcon
                name="triangleRight"
                size={16}
                className={`${openStates[index] && 'rotate-90'}`}
              />
              <Text size="lg" weight="md" className="p-1">
                {question.questionContent}
              </Text>
            </div>
            {openStates[index] && (
              <div>
                {editingStates[index] || currentAnswers[index] === '' ? (
                  <textarea
                    id={`textarea-${index}`}
                    style={{ height: textareaHeight }}
                    value={currentAnswers[index]}
                    className="w-full resize-none border-none px-8 text-[14px] font-medium"
                    onChange={e => handleAnswerChange(index, e.target.value)}
                    onBlur={e => handleInputBlur(e, index)}
                  />
                ) : (
                  <Text
                    size="lg"
                    weight="md"
                    className="px-8 text-[14px] "
                    onClick={() => handleDoubleClick(index)}>
                    {currentAnswers[index]}
                  </Text>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

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
