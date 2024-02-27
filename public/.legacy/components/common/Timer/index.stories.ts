import type { Meta, StoryObj } from '@storybook/react';
import Timer from '.';

const meta: Meta<typeof Timer> = {
  title: 'Design System/Atoms/Timer',
  component: Timer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Primary: Story = {
  args: {},
};
