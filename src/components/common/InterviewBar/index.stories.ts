import type { Meta, StoryObj } from '@storybook/react';
import { InterviewBar } from '.';

const meta: Meta<typeof InterviewBar> = {
  title: 'DESIGN SYSTEM/Atoms/InterviewBar',
  component: InterviewBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InterviewBar>;

export const Primary: Story = {
  args: {
    questions: [
      {
        questionId: 1,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
      {
        questionId: 2,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
      {
        questionId: 3,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
    ],
    currentId: 3,
  },
};

export const Secondary: Story = {
  args: {
    questions: [
      {
        questionId: 1,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
      {
        questionId: 2,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
    ],
  },
};
