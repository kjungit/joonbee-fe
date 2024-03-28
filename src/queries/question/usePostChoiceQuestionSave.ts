import { SavaQuestionProps, postSaveQuestion } from '@/apis/services/questionApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostChoiceQuestionSave = ({
  subcategoryName,
  questionContent,
}: SavaQuestionProps) => {
  const queryClient = useQueryClient();
  const { mutate: questionSaveMutate } = useMutation({
    mutationFn: () => postSaveQuestion({ subcategoryName, questionContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyQuestion'] });
    },
  });

  return { questionSaveMutate };
};
