import { VariableIcon } from '@/components/@common/variableIcon';
import { usePostInterviewLike } from '@/queries/interview/usePostInterviewLike';
import { MouseEvent, useState } from 'react';

export const InterviewLikeIcon = ({
  interviewId,
  liked,
}: {
  interviewId: number;
  liked: boolean;
}) => {
  const [isLikeCoolDown, setIsLikeCoolDown] = useState(false);
  const { interviewLikeMutate } = usePostInterviewLike(interviewId);

  const handleClickInterviewId = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isLikeCoolDown) {
      setIsLikeCoolDown(true);
      interviewLikeMutate();

      setTimeout(() => {
        setIsLikeCoolDown(false);
      }, 1200);
    }
  };

  return (
    <button onClick={handleClickInterviewId}>
      <VariableIcon name={liked ? 'filledLike' : 'emptyLike'} size={22} />
    </button>
  );
};
