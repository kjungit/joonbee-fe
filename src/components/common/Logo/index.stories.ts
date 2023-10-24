import React from 'react';
import { Logo } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  title: 'Design System/Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  args: {
    size: 'sm',
  },
};
