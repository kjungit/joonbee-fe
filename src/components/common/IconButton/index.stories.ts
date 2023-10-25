import React from 'react';
import { IconButton } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Molecule/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['kakao', 'naver', 'google'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    name: 'kakao',
  },
};
