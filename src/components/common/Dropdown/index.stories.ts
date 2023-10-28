import React from 'react';
import Dropdown from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecule/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    size: 'sm',
  },
};
