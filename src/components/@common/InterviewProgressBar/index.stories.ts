import type { Meta, StoryObj } from '@storybook/react';
import InterivewProgressBar from '.';

const meta: Meta<typeof InterivewProgressBar> = {
  title: 'Design System/Molecules/InterivewProgressBar',
  component: InterivewProgressBar,
  tags: ['autodocs'],
  argTypes: {
    interview: {
      control: 'inline-radio',
      options: ['InterviewSetting', 'DeviceSetting', 'InterviewConducting', 'InterviewResult'],
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof InterivewProgressBar>;

export const Default: Story = {};
