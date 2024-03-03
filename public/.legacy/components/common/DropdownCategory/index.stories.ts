import type { Meta, StoryObj } from '@storybook/react';
import DropdownCategory from '.';

const meta: Meta<typeof DropdownCategory> = {
  title: 'Design System/Molecules/DropdownCategory',
  component: DropdownCategory,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['white', 'darkNavy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownCategory>;

export const Primary: Story = {
  args: {
    color: 'white',
    setSelectedSubcategory: () => {},
  },
};

export const Secondary: Story = {
  args: {
    color: 'darkNavy',
    setSelectedSubcategory: () => {},
  },
};

// 백엔드: ['DB', 'Express', 'MSA'],
// 언어: ['JAVA', 'C / C++', 'C#'],
// CS: ['Docker', '운영체제', '컴퓨터구조'],
// 모바일: ['IOS', '플러터'],
// 기타: ['Git'],
