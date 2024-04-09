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

  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);
  const setQuestionList = useSetRecoilState(addQuestionListSelector);
  const [openStates, setOpenStates] = useState(questionList.map(() => true));
  const [editingStates, setEditingStates] = useState(questionList.map(() => false));
  const [currentAnswers, setCurrentAnswers] = useState(
    questionList.map((question, index) => question.answerContent),
  );
  const [isEditState, setIsEditState] = useState<EditStateProps>({ index: null, isEdit: false });

  const handleClick = (index: number) => {
    const updatedEditingStates = editingStates.map((isEditing, i) =>
      i === index ? !isEditing : isEditing,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      handleClick(index);
      e.currentTarget.blur();
      setIsEditState({ index, isEdit: true });
    }

    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    editingStates.forEach((isEditing, index) => {
      if (isEditing && textareaRefs.current[index]) {
        const textarea = textareaRefs.current[index];
        const newHeight = Math.max(21, textarea.scrollHeight);
        const rows = Math.ceil(newHeight / 14);
        textarea.style.height = `${newHeight}px`;
        textarea.rows = rows;
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

  useEffect(() => {
    setEditingStates(editingStates.map((state, index) => (index === 0 ? true : state)));

    if (textareaRefs.current[0]) {
      const element = textareaRefs.current[0];
      element.focus();
      const valueLength = element.value.length;
      element.setSelectionRange(valueLength, valueLength);
    }
  }, []);

  useEffect(() => {
    textareaRefs.current[0].focus();
  }, []);

  useBeforeUnload();

  return (
    <div className="pt-14 overflow-auto">
      <Text as="h2" size="xl" weight="lg" className="mb-5">
        면접 확인
      </Text>
      <Text as="h2" size="md" weight="md" color="blue" className="mb-5">
        * 내가 답변한 내용을 확인하고 수정하세요. <br />
        내가 이야기한 답변에 마우스 커서를 클릭하면 수정할 수 있어요!
      </Text>
      <div className="h-[480px] w-full">
        {questionList.map((question, index) => (
          <div key={question.questionId} className={`mb-2 border-gray-normal`}>
            <div className={`flex  items-center`}>
              <VariableIcon name="triangleRight" size={16} />
              <Text size="lg" weight="md" className="p-1">
                {question.questionContent}
              </Text>
            </div>

            <div className="">
              <textarea
                ref={el => {
                  if (el) {
                    textareaRefs.current[index] = el;
                  }
                }}
                id={`textarea-${index}`}
                placeholder="답변을 입력하세요."
                value={currentAnswers[index]}
                className="w-full resize-none border-none px-8 text-[14px] font-medium break-keep align-top block placeholder:text-gray-light"
                onChange={e => handleAnswerChange(index, e.target.value)}
                onClick={() => handleClick(index)}
                onBlur={e => handleInputBlur(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                readOnly={!editingStates[index]}
                tabIndex={0}
                autoFocus
              />
              <div className="h-4">
                {!currentAnswers[index] && (
                  <Text size="sm" weight="md" color="red" className="w-full px-8 ">
                    답변을 작성하지 않으면 면접 결과를 볼 수 없어요!
                  </Text>
                )}
              </div>
              <div className="h-4">
                {isEditState.index === index && currentAnswers[index].trim().length > 0 && (
                  <Text size="sm" weight="md" color="blue" className="w-full px-8 ">
                    작성하신 답변이 수정되었습니다.
                  </Text>
                )}
              </div>
            </div>
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
