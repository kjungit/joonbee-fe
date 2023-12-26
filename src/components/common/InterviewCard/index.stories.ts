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
    props: {
      interviewId: '293x',
      categoryName: '프론트엔드',
      questions: [
        { questionId: 'xd22', questionContent: 'React의 장점은 무엇입니까?' },
        { questionId: 'xd22', questionContent: 'React의 장점은 무엇입니까?' },
        { questionId: 'xd22', questionContent: 'React의 장점은 무엇입니까?' },
      ],
      likeCount: '5',
      thumbnail: '',
      memberId: '123',
    },
  },
};
