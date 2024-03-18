import type { Meta, StoryObj } from '@storybook/react';
import QuestionProgress from '.';

const meta: Meta<typeof QuestionProgress> = {
  title: 'Design System/Molecules/QuestionProgress',
  component: QuestionProgress,
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: 'inline-radio',
      options: ['READY', 'PROGRESS', 'DONE'],
    },
  },
  args: {
    progress: 'PROGRESS',
    text: '질문1',
  },
};

export default meta;
type Story = StoryObj<typeof QuestionProgress>;

export const Default: Story = {};
