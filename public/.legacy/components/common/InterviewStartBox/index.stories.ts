import type { Meta, StoryObj } from '@storybook/react';
import { InterviewStartBox } from '.';

const meta: Meta<typeof InterviewStartBox> = {
  title: 'DESIGN SYSTEM/Atoms/InterviewStartBox',
  component: InterviewStartBox,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InterviewStartBox>;

export const Primary: Story = {
  args: {},
};
