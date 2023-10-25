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
    data: [
      { id: 1, question: '질문1' },
      { id: 2, question: '질문2' },
      { id: 3, question: '질문3' },
      { id: 4, question: '질문4' },
      { id: 5, question: '질문5' },
    ],
    currentId: 3,
  },
};

export const Secondary: Story = {
  args: {
    data: [
      { id: 1, question: '질문1' },
      { id: 2, question: '질문2' },
      { id: 3, question: '질문3' },
      { id: 4, question: '질문4' },
      { id: 5, question: '질문5' },
      { id: 6, question: '질문6' },
    ],
  },
};

export const Tertiary: Story = {
  args: {
    data: [
      { id: 1, question: '질문1' },
      { id: 2, question: '질문2' },
      { id: 3, question: '질문3' },
      { id: 4, question: '질문4' },
      { id: 5, question: '질문5' },
      { id: 6, question: '질문6' },
    ],
  },
};

export const Quaternary: Story = {
  args: {
    data: [
      { id: 1, question: '질문1' },
      { id: 2, question: '질문2' },
      { id: 3, question: '질문3' },
      { id: 4, question: '질문4' },
      { id: 5, question: '질문5' },
      { id: 6, question: '질문6' },
    ],
  },
};
