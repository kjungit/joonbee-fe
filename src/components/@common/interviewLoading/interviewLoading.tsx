import Image from 'next/image';
import { Text } from '../text/';

export default function InterviewLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center absolute 
    -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <div className="rounded-full overflow-hidden mb-5">
        <Image src={'/ai_load.gif'} width={240} height={240} objectFit="cover" alt="loading" />
      </div>
      <Text className="text-[24px]">면접을 준비중입니다</Text>
    </div>
  );
}
