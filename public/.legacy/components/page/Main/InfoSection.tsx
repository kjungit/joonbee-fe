import { ToggleInfo } from '../../common/ToggleInfo';
import React from 'react';

const data = [
  {
    id: 1,
    title: '랜덤면접은 뭔가요?',
    explanation:
      '랜덤면접은 관련 카테고리의 질문을 랜덤으로 면접을 진행할 수 있어요! \n 질문이 어떻게 나올지 모르는 면접을 대비해보세요!',
  },
  {
    id: 2,
    title: '질문을 추가하고 싶으면 어떻게 해야하나요?',
    explanation: `질문을 추가하는 방법은 2가지가 있어요. 직접 질문을 등록하거나 JOONBEE에서 준비되어있는 질문을 추가해보세요.`,
  },
  {
    id: 3,
    title: '면접시 꼭 카메라를 켜야하나요?',
    explanation: `꼭 카메라를 켜야하지는 않아요! 면접시 나의 모습이 보고싶다면 확인해볼 수 있어요! 그러나 마이크는 꼭 켜주세요! JOONBEE에서는 면접자의 음성을 통해서 답변을 작성해요. (잘못 입력된 텍스트는 수정할 수 있으니 참고해주세요!)`,
  },
  {
    id: 4,
    title: '면접영상도 저장이 되나요?',
    explanation: `현재 면접영상은 저장되지 않아요! 1회성으로 사용자만 확인할 수 있고 면접결과 확인 후에는 자동으로 폐기되오니 걱정하지마세요!`,
  },
  {
    id: 5,
    title: '',
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
  {
    id: 6,
    title: 'react에 대해서 설명해주세요. 6',
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
];

export default function InfoSection() {
  return (
    <section className="bg-background-bluegray w-full pb-20 flex flex-col items-center ">
      <h2 className="mt-14 mb-4 text-main-primary text-center text-3xl font-bold">
        JOONBEE에 대해서 궁금해요!
      </h2>
      <ul className="flex flex-wrap justify-between w-full max-w-[1024px] gap-6 mt-12 p-5">
        {data.map(item => (
          <ToggleInfo key={item.id} title={item.title} explanation={item.explanation} />
        ))}
      </ul>
    </section>
  );
}
