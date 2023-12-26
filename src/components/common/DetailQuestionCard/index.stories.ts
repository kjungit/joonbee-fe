import type { Meta, StoryObj } from '@storybook/react';
import { DetailQuestionCard } from '.';

const meta: Meta<typeof DetailQuestionCard> = {
  title: 'DESIGN SYSTEM/Atoms/DetailQuestionCard',
  component: DetailQuestionCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DetailQuestionCard>;
export const Primary: Story = {
  args: {
    question: {
      questionId: '1554',
      questionContent: 'react에 대해서 설명해주세요.',
      answerContent: 'react는 자바스크립트 라이브러리입니다',
    },
    questionCount: 2,
  },
};
