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
    data: {
      index: 0,
      questionId: '질문 1',
      questionContent: 'react에 대해서 설명해주세요.',
    },
  },
};

export const Secondary: Story = {
  args: {
    data: {
      index: 0,
      questionId: '질문 1',
      questionContent: 'react에 대해서 설명해주세요.',
    },
  },
};

export const Tertiary: Story = {
  args: {
    data: {
      index: 0,
      questionId: '질문 1',
      questionContent: 'react에 대해서 설명해주세요.',
    },
  },
};

export const Quaternary: Story = {
  args: {
    data: {
      index: 0,
      questionId: '질문 1',
      questionContent: 'react에 대해서 설명해주세요.',
    },
  },
};
