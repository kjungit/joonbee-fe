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
    questions: [],
    currentCount: 3,
  },
};
