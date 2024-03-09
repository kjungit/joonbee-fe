import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './iconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Molecules/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'auto'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'white', 'disabled'],
    },
    iconName: {
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
        'kakao.png',
        'naver.png',
        'google.png',
        'meeting.png',
        'service.png',
        'check.png',
        'circle.png',
        'random.png',
        'blank.png',
        'ai_white.png',
        'checklist.png',
        'questions.svg',
      ],
    },
    edge: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  args: {
    iconName: 'leftArrow',
    size: 'auto',
    color: 'primary',
    children: '버튼',
    edge: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
