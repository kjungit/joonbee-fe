import { VariableIcon } from '@/components/@common/variableIcon/variableIcon';
import { useDeleteQuestion } from '@/queries/question/useDeleteQuestion';
import { MouseEvent, useState } from 'react';

export const QuestionDeleteIcon = ({ id }: { id: number }) => {
  const [isDeleteCooldown, setIsDeleteCooldown] = useState(false);
  const { questionDeleteMutate } = useDeleteQuestion(id);
  const handleClickInterviewId = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isDeleteCooldown) {
      setIsDeleteCooldown(true);
      questionDeleteMutate();
      setTimeout(() => {
        setIsDeleteCooldown(false);
      }, 1200);
    }
  };

  return (
    <button onClick={handleClickInterviewId}>
      <VariableIcon name="delete" size={22} />
    </button>
  );
};
