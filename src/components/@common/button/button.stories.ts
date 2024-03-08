import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'auto'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'blue', 'white', 'disabled'],
    },
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'filled'],
    },
  },
  args: {
    size: 'md',
    color: 'primary',
    variant: 'filled',
    children: '버튼',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
