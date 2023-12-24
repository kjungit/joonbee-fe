import type { Meta, StoryObj } from '@storybook/react';
import { CategorizedQuestionCard } from '.';

const meta: Meta<typeof CategorizedQuestionCard> = {
  title: 'DESIGN SYSTEM/Atoms/CategorizedQuestionCard',
  component: CategorizedQuestionCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategorizedQuestionCard>;

export const Primary: Story = {
  args: {
    size: `md`,
    category: 'fe',
    subcategory: 'react',
    questionContent: 'Express에 대해 설명하시오',
  },
};

export const Secondary: Story = {
  args: {
    size: `lg`,
    category: 'fe',
    subcategory: 'react',
    questionContent: 'Express에 대해 설명하시오',
  },
};
