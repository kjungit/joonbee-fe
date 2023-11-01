import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import QuestionForm from '.';

const meta: Meta<typeof QuestionForm> = {
  title: 'Design System/Molecules/QuestionForm',
  component: QuestionForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionForm>;

export const Primary: Story = {
  args: {},
};
