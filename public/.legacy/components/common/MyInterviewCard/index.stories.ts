import type { Meta, StoryObj } from '@storybook/react';
import { MyInterviewCard } from '.';

const meta: Meta<typeof MyInterviewCard> = {
  title: 'DESIGN SYSTEM/Atoms/MyInterviewCard',
  component: MyInterviewCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyInterviewCard>;

export const Primary: Story = {
  args: {
    categoryName: '프론트엔드',
    interviewId: 0,
    questionCount: 10,
  },
};
