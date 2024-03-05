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
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'white', 'disabled'],
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

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};
