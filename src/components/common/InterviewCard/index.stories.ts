import type { Meta, StoryObj } from '@storybook/react';
import InterviewCard from '.';

const meta: Meta<typeof InterviewCard> = {
  title: 'DESIGN SYSTEM/Molecules/InterviewCard',
  component: InterviewCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InterviewCard>;

export const Primary: Story = {
  args: {
    data: {
      id: '293x',
      category: '프론트엔드',
      questions: [
        { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
        { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
        { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
      ],
      likeCount: 5,
      userInfo: {
        nickName: 'kimJaeWoo98',
        thunbnail: '',
      },
    },
  },
};
