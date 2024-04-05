'use client';

import { Accordion } from '@/components/@common/accordion';
import { EditQuestion } from '@/components/@common/editQuestion';
import IconButton from '@/components/@common/iconButton';
import PreventBackModal from '@/components/@common/preventBackModal';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { addQuestionListSelector } from '@/recoils/myInterview/withAdd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
interface EditStateProps {
  index: number | null;
  isEdit: boolean;
}
export default function CheckPage() {
  const router = useRouter();
  const questionList = useRecoilValue(addQuestionListSelector);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);
  const setQuestionList = useSetRecoilState(addQuestionListSelector);
  const [openStates, setOpenStates] = useState(questionList.map(() => true));
  const [editingStates, setEditingStates] = useState(questionList.map(() => false));
  const [currentAnswers, setCurrentAnswers] = useState(
    questionList.map(question => question.answerContent),
  );
  const [isEditState, setIsEditState] = useState<EditStateProps>({ index: null, isEdit: false });

  const handleToggle = (index: number) => {
    const updatedOpenStates = openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen));
    setOpenStates(updatedOpenStates);
  };

  const handleClick = (index: number) => {
    const updatedEditingStates = editingStates.map((isEditing, i) =>
      i === index ? true : isEditing,
    );
    setEditingStates(updatedEditingStates);
  };

  const handleAnswerChange = (index: number, value: string) => {
    if (value.length <= 200) {
      const updatedAnswers = currentAnswers.map((content, i) => (i === index ? value : content));
      setCurrentAnswers(updatedAnswers);
    } else {
      alert('글자수 제한을 초과했습니다.');
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLTextAreaElement>, index: number) => {
    const content = event.target.value.replace(/\s+/g, ' ');
    const newAnswers = [...currentAnswers];
    newAnswers[index] = content;
    setCurrentAnswers(newAnswers);

    const updatedEditingStates = editingStates.map((isEditing, i) =>
      i === index ? false : isEditing,
    );
    setIsEditState({ index, isEdit: true });
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
  const hasEmptyAnswer = currentAnswers.some(answer => answer === '');

  useEffect(() => {
    editingStates.forEach((isEditing, index) => {
      if (isEditing && textareaRefs.current[index]) {
        const textarea = textareaRefs.current[index];
        textarea.style.height = 'auto';
        const newHeight = Math.max(21, textarea.scrollHeight);
        textarea.style.height = `${newHeight}px`;
      }
    });
  }, [editingStates, currentAnswers]);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isEditState.isEdit) {
      timer = setTimeout(() => {
        setIsEditState({ index: null, isEdit: false });
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isEditState]);
  useBeforeUnload();

  return (
    <div className="pt-14">
      <Text as="h2" size="xl" weight="lg" className="mb-5">
        면접 확인
      </Text>
      <Text as="h2" size="md" weight="md" color="blue" className="mb-5">
        * 내가 답변한 내용을 확인하고 수정하세요.
      </Text>
      <div className="h-[480px] w-full">
        {questionList.map((question, index) => (
          <div key={question.questionId} className={`mb-2 border-gray-normal`}>
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
              <div className="h-10">
                {editingStates[index] ? (
                  <textarea
                    ref={el => {
                      if (el) {
                        textareaRefs.current[index] = el;
                      }
                    }}
                    id={`textarea-${index}`}
                    rows={1}
                    style={{ height: textareaHeight }}
                    placeholder="답변을 입력하세요."
                    value={currentAnswers[index]}
                    className="w-full resize-none border-none px-8 text-[14px] font-medium break-keep align-top block placeholder:text-gray-light"
                    onChange={e => handleAnswerChange(index, e.target.value)}
                    onBlur={e => handleInputBlur(e, index)}
                  />
                ) : currentAnswers[index] === '' ? (
                  <Text
                    size="lg"
                    weight="md"
                    color="lightGray"
                    className="w-full px-8 text-[14px]"
                    onClick={() => handleClick(index)}>
                    답변을 입력하세요.
                  </Text>
                ) : (
                  <p
                    className="w-full px-8 text-[14px] font-medium"
                    style={{ overflowWrap: 'break-word' }}
                    onClick={() => handleClick(index)}>
                    {currentAnswers[index]}
                  </p>
                )}
                {isEditState.index === index && (
                  <Text size="sm" weight="md" color="blue" className="w-full px-8 ">
                    작성하신 답변이 수정되었습니다.
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
        disabled={hasEmptyAnswer}
        onClick={handleMove}>
        다음 단계
      </IconButton>
      <div className="absolute bottom-14 right-14">
        <Image src="/laptop.png" alt="laptop" width={220} height={180} />
      </div>
      <PreventBackModal />
    </div>
  );
}
