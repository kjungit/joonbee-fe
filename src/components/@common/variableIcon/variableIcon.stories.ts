import React from 'react';
import { VariableIcon } from './variableIcon';
import type { Meta, StoryObj } from '@storybook/react';
import { VariableIconList } from '@/constants/icon';

const meta: Meta<typeof VariableIcon> = {
  title: 'Design System/Atoms/VariableIcon',
  component: VariableIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: VariableIconList,
    },

    size: {},
  },
};

export default meta;
type Story = StoryObj<typeof VariableIcon>;

export const Primary: Story = {
  args: {
    name: 'emptyLike',
  },
};
