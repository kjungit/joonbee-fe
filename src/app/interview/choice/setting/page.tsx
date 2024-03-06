'use client';

import Dropdown from '@/components/@common/dropdown/dropdown';
import { Text } from '@/components/@common/text/text';
import { CategoryName } from '@/types';
import React, { useState } from 'react';

export default function ChoiceSettingPage() {
  const [selected, setSelected] = useState<CategoryName>('');

  return (
    <section className="p-14">
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          전체 질문 카테고리를 선택해주세요
        </Text>
        <Dropdown data={['fe', 'be']} selected={selected} onSelect={setSelected} />
      </div>
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          질문 개수를 설정해주세요
        </Text>
        <div className="w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
          질문 수
        </div>
      </div>
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          개별 질문 시간을 설정해주세요
        </Text>
        <div className="w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
          질문 시간
        </div>
      </div>
    </section>
  );
}
