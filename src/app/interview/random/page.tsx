import Button from '@/components/@common/button/button';
import { Text } from '@/components/@common/text/text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function RandomPage() {
  return (
    <section className="h-[calc(100%-60px)] relative">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
        <Image src="/rope.png" alt="랜덤면접" width={180} height={180} />
        <div>
          <Text size="lg" as="h4" weight="lg">
            질문을 AI가 준비해요
          </Text>
          <Text color="lightGray">
            무슨 문제가 나올지 몰라요! <br />
            예상하지 못한 문제를 준비해보세요!
          </Text>
        </div>
        <Link href="/interview/random/setting">
          <Button size="xl">면접 시작하기</Button>
        </Link>
      </div>
    </section>
  );
}
