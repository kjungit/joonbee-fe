import type { Meta, StoryObj } from '@storybook/react';
import { DetailAnswerCard } from '.';

const meta: Meta<typeof DetailAnswerCard> = {
  title: 'DESIGN SYSTEM/Atoms/DetailAnswerCard',
  component: DetailAnswerCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DetailAnswerCard>;

export const Primary: Story = {
  args: {
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
};
