import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  title: 'DESIGN SYSTEM/Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

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
