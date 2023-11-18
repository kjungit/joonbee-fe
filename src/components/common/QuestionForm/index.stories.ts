import type { Meta, StoryObj } from '@storybook/react';
import QuestionForm from '.';

const meta: Meta<typeof QuestionForm> = {
  title: 'Design System/Molecules/QuestionForm',
  component: QuestionForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionForm>;

export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
};

// 백엔드: ['DB', 'Express', 'MSA'],
// 언어: ['JAVA', 'C / C++', 'C#'],
// CS: ['Docker', '운영체제', '컴퓨터구조'],
// 모바일: ['IOS', '플러터'],
// 기타: ['Git'],
