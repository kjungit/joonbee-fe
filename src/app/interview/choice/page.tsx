import Button from '@/components/@common/button/button';
import { Text } from '@/components/@common/text/text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ChoicePage() {
  return (
    <section className="h-[calc(100%-60px)] relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
        <Image src="/fluid.png" alt="랜덤면접" width={180} height={180} />
        <div>
          <Text size="lg" as="h4" weight="lg">
            질문을 직접 선택해요
          </Text>
          <Text color="lightGray">
            면접 질문들을 선택해서 준비할 수 있어요
            <br />
            체계적으로 준비해봐요!
          </Text>
        </div>
        <Link href="/interview/choice/setting">
          <Button size="xl">면접 시작하기</Button>
        </Link>
      </div>
    </section>
  );
}
