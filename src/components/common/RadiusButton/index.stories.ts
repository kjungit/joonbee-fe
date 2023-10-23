import React from 'react';
import { RadiusButton } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadiusButton> = {
  title: 'Design System/Atoms/RadiusButton',
  component: RadiusButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'radio',
      options: ['dark', 'light', 'blue'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    text: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },

    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadiusButton>;

export const Default: Story = {
  args: {
    size: 'sm',
    text: 'md',
    color: 'dark',
    children: '버튼',
  },
};
