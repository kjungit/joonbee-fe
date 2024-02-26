import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'DESIGN SYSTEM/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    isDisabled: false,
  },
};

export const Secondary: Story = {
  args: {
    isDisabled: true,
  },
};
