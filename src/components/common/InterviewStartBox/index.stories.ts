import type { Meta, StoryObj } from '@storybook/react';
import { InterviewStartBox } from '.';

const meta: Meta<typeof InterviewStartBox> = {
  title: 'DESIGN SYSTEM/Atoms/InterviewStartBox',
  component: InterviewStartBox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['gray', 'navy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InterviewStartBox>;

export const Primary: Story = {
  args: {
    color: 'navy',
    title: 'AI면접 시작하기',
  },
};
