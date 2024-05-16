import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import React, { useState } from 'react';

interface QuestionCheckProps {
  question: {
    questionId: number;
    questionContent: string;
  };
  isChecked?: boolean;
  onCheckChange?: () => void;
}

export default function QuestionCheck({
  question,
  isChecked = false,
  onCheckChange,
}: QuestionCheckProps) {
  const { questionId, questionContent } = question;

  return (
    <li key={questionId} className="flex gap-4 items-center mb-2" onClick={onCheckChange}>
      {isChecked ? (
        <VariableIcon name="fillCheckRec" size={18} />
      ) : (
        <VariableIcon name="emptyCheckBox" size={18} />
      )}
      <Text size="lg">{questionContent}</Text>
    </li>
  );
}
