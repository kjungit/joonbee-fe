import React from 'react';
import { Button, ButtonProps } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    variant: {},
    color: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['primary', 'secondary', 'normal'],
    },
    size: {},
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: `filled`,
    color: 'primary',
    children: '버튼',
  },
};
