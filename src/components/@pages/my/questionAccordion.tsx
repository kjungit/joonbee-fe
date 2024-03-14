import { Text } from '@/components/@common/text/text';
import { VariableIcon } from '@/components/@common/variableIcon/variableIcon';
import { MyClickInterview } from '@/types';

interface QuestionAccordionProps {
  question: MyClickInterview;
  valueName: 'questionContent' | 'evaluation' | 'commentary';
  onClick: ({
    questionId,
    valueName,
  }: {
    questionId: number;
    valueName: 'questionContent' | 'evaluation' | 'commentary';
  }) => void;
}

export const QuestionAccordion = ({ question, valueName, onClick }: QuestionAccordionProps) => {
  return (
    <>
      <div
        className="pl-10  flex cursor-pointer items-center"
        onClick={() =>
          onClick({
            questionId: question.questionId,
            valueName,
          })
        }>
        <VariableIcon
          name="tringleRight"
          size={16}
          className={`${question[valueName].isOpen && 'rotate-90'}`}
        />
        <Text size="lg" weight="md" className="p-1">
          내가 한 답변이에요.
        </Text>
      </div>
      {question[valueName].isOpen && (
        <div className="pl-4  flex cursor-pointer items-center">
          <Text size="lg" weight="sm" className="px-11">
            {question[valueName].value}
          </Text>
        </div>
      )}
    </>
  );
};
