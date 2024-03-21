import type { Meta, StoryObj } from '@storybook/react';
import StepIcon from '.';

const meta: Meta<typeof StepIcon> = {
  title: 'Design System/Molecules/StepIcon',
  component: StepIcon,
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: 'inline-radio',
      options: ['READY', 'PROGRESS', 'DONE'],
    },
    count: {
      control: 'number',
    },
  },
  args: {
    progress: 'DONE',
    text: '면접 시작',
    count: 1,
  },
};

export default meta;
type Story = StoryObj<typeof StepIcon>;

export const Default: Story = {};
