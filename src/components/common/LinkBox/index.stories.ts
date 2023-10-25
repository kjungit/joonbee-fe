import type { Meta, StoryObj } from '@storybook/react';
import { LinkBox } from '.';

const meta: Meta<typeof LinkBox> = {
  title: 'DESIGN SYSTEM/Atoms/LinkBox',
  component: LinkBox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['gray', 'navy'],
    },
    size: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkBox>;

export const Primary: Story = {
  args: {
    size: `md`,
    color: 'navy',
    title: 'AI면접 시작하기',
    propsLink: '/',
    iconSrc: 'ai_white',
  },
};

export const Secondary: Story = {
  args: {
    size: `sm`,
    color: 'gray',
    title: '나의 질문 관리하기',
    propsLink: '/',
    iconSrc: 'meeting',
  },
};

export const Tertiary: Story = {
  args: {
    size: `lg`,
    color: 'gray',
    title: '질문을 직접 선택해요.',
    propsLink: '/',
    subTitle: {
      first: '면접 질문들을 선택해서',
      second: '준비할 수 있어요.',
      third: '체계적으로 준비해봐요!',
    },
    iconSrc: 'checklist',
  },
};

export const Quaternary: Story = {
  args: {
    size: `lg`,
    color: 'gray',
    title: '질문을 AI가 준비해요.',
    propsLink: '/',
    subTitle: {
      first: '무슨 문제가 나올지 몰라요!',
      second: '예상하지 못한 문제를',
      third: '준비해보세요!',
    },
    iconSrc: 'random',
  },
};
