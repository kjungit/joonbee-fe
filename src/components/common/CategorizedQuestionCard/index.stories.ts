import type { Meta, StoryObj } from '@storybook/react';
import { CategorizedQuestionCard } from '.';

const meta: Meta<typeof CategorizedQuestionCard> = {
  title: 'atoms/CategorizedQuestionCard',
  component: CategorizedQuestionCard,
  argTypes: {
    size: {
      description: 'The size of the button',
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
    color: {
      description: 'The color of the button',
      control: 'inline-radio',
      options: ['white', 'gray'],
    },

    isFocus: {
      description: 'The borderPosition of the button',
      control: 'inline-radio',
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategorizedQuestionCard>;

export const Primary: Story = {
  args: {
    size: `md`,
    isFocus: false,
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Secondary: Story = {
  args: {
    size: `md`,
    isFocus: true,
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Tertiary: Story = {
  args: {
    size: `lg`,
    isFocus: false,
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Quaternary: Story = {
  args: {
    size: `lg`,
    isFocus: true,
    children: 'react에 대해서 설명해주세요.',
  },
};
