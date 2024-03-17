import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Design System/Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    readOnly: {
      control: 'boolean',
    },
  },
  args: {
    color: 'active',
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};
