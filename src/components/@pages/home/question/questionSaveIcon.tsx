import { SavaQuestionProps } from '@/apis/services/questionApis';
import { VariableIcon } from '@/components/@common/variableIcon';
import { usePostQuestionSave } from '@/queries/question/usePostQuestionSave';
import { MouseEvent, useState } from 'react';

export const QuestionSaveIcon = ({ subcategoryName, questionContent }: SavaQuestionProps) => {
  const [isSaveCooldown, setIsSaveCooldown] = useState(false);
  const { questionSaveMutate } = usePostQuestionSave({ subcategoryName, questionContent });

  const handleClickInterviewId = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isSaveCooldown) {
      setIsSaveCooldown(true);
      questionSaveMutate();
      setTimeout(() => {
        setIsSaveCooldown(false);
      }, 1200);
    }
  };

  return (
    <button onClick={handleClickInterviewId}>
      <VariableIcon name="copy" size={22} />
    </button>
  );
};
