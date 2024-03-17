import { OpenAiContent } from '@/apis/services/openAiApis';
import { atom } from 'recoil';

export const myInterviewState = atom<OpenAiContent>({
  key: 'myInterviewState',
  default: {
    userName: '테스트',
    categoryName: 'fe',
    questions: [
      {
        questionId: 3780,
        questionContent: 'React의 주요 특징은 무엇인가요?',
        answerContent:
          '리액트는 컴포넌트단위로 ui를 최적화할 수 있는 특징을 가지고 있는 라이브러리입니다.',
      },
      {
        questionId: 3777,
        questionContent: 'React 생명주기 메서드의 종류와 각각의 역할은 무엇인가요?',
        answerContent: 'mount, update, unmount 3가지의 생명주기를 가지고 있습니다. ',
      },
      {
        questionId: 3775,
        questionContent: 'React에서 상태(state)와 속성(props)의 차이는 무엇인가요?',
        answerContent:
          'state는 변수의 값을 가지고 있으며 setState를 통해서 불변을 지키며 상태의 변경에 따라 리액트는 리렌더링이 발생합니다. props는 하위컴포넌트로 전달하는 읽기전용의 데이터를 이야기합니다.',
      },
    ],
  },
});
