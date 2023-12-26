import type { Meta, StoryObj } from '@storybook/react';
import { PolarChart } from '.';

const meta: Meta<typeof PolarChart> = {
  title: 'DESIGN SYSTEM/Atoms/PolarChart',
  component: PolarChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PolarChart>;

export const Primary: Story = {
  args: {
    data: [],
  },
};
