import React from 'react';
import Dropdown from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    dropdownType: {
      contro: 'inline-radio',
      options: ['single', 'double'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    size: 'sm',
    dropdownType: 'double',
  },
};
