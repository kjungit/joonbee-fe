import type { Meta, StoryObj } from '@storybook/react';
import { ToggleInfo } from '.';

const meta: Meta<typeof ToggleInfo> = {
  title: 'DESIGN SYSTEM/Atoms/ToggleInfo',
  component: ToggleInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleInfo>;

export const Primary: Story = {
  args: {
    title: '질문 1',
    explanation: `면접 영상은 1회성으로 확인이 가능해요.
    면접 후 확인 및 다운로드가 가능하고 그 후에는 저장되지 않아요.
    면접 영상을 따로 저장하고 싶으면 신중하게 다음 단계로 넘어가주세요!
    
    면접 영상은 1회성으로 확인이 가능해요.
    면접 후 확인 및 다운로드가 가능하고 그 후에는 저장되지 않아요.
    면접 영상을 따로 저장하고 싶으면 신중하게 다음 단계로 넘어가주세요!
    면접 영상은 1회성으로 확인이 가능해요.
    면접 후 확인 및 다운로드가 가능하고 그 후에는 저장되지 않아요.
    면접 영상을 따로 저장하고 싶으면 신중하게 다음 단계로 넘어가주세요!
    면접 영상은 1회성으로 확인이 가능해요.
    면접 후 확인 및 다운로드가 가능하고 그 후에는 저장되지 않아요.
    면접 영상을 따로 저장하고 싶으면 신중하게 다음 단계로 넘어가주세요!`,
  },
};
