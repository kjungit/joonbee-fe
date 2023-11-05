import React from 'react';
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
    data: [
      { category: '프론트엔드', subcategory: ['React', 'Vue', 'Nextjs'] },
      { category: '백엔드', subcategory: ['DB', 'Express', 'MSA'] },
      { category: 'CS', subcategory: ['Docker', '운영체제', '컴퓨터구조'] },
      { category: '모바일', subcategory: ['IOS', '플러터'] },
      { category: '기타', subcategory: ['Git'] },
    ],
  },
};

// 백엔드: ['DB', 'Express', 'MSA'],
// 언어: ['JAVA', 'C / C++', 'C#'],
// CS: ['Docker', '운영체제', '컴퓨터구조'],
// 모바일: ['IOS', '플러터'],
// 기타: ['Git'],
