import type { Meta, StoryObj } from '@storybook/react';
import { BetweenBox } from '.';

const meta: Meta<typeof BetweenBox> = {
  title: 'DESIGN SYSTEM/Atoms/BetweenBox',
  component: BetweenBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BetweenBox>;

export const Primary: Story = {
  args: {
    first: '면접 수',
    second: '3',
  },
};
export const Secondary: Story = {
  args: {
    first: '내 질문 수',
    second: '12',
  },
};
