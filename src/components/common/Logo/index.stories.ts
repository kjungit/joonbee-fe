import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Logo from '.';

const meta: Meta<typeof Logo> = {
  title: 'Design System/Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {},
      option: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  args: {
    size: 30,
  },
};
