import React from 'react';
import { VariableIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof VariableIcon> = {
  title: 'Design System/Atoms/VariableIcon',
  component: VariableIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'leftArrow',
        'emptyLike',
        'copy',
        'filledLike',
        'alarm',
        'leftArrow',
        'delete',
        'edit',
        'group',
        'fillCheckCir',
        'fillCheckRec',
        'checkRec',
      ],
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
