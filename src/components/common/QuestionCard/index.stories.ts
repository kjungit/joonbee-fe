import type { Meta, StoryObj } from '@storybook/react';
import { QuestionCard } from '.';

const meta: Meta<typeof QuestionCard> = {
  title: 'DESIGN SYSTEM/Atoms/QuestrionCard',
  component: QuestionCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['white', 'gray', 'navy'],
    },
    size: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

export const Primary: Story = {
  args: {
    size: `sm`,
    color: 'white',
    text: 'react에 대해서 설명해주세요.',
  },
};

export const Secondary: Story = {
  args: {
    size: `md`,
    color: 'gray',
    text: 'react에 대해서 설명해주세요.',
  },
};

export const Normal: Story = {
  args: {
    size: `lg`,
    color: 'white',
    text: 'react에 대해서 설명해주세요.',
  },
};
