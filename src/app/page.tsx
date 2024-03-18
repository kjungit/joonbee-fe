import DetailInterviewSection from '@/components/@pages/home/interview/detailInterviewSection';
import SecondSection from '@/components/@pages/home/secondSection';

export default function Home() {
  return (
    <div className=" w-full flex flex-col ">
      <div className="flex h-full">
        <SecondSection />
        <DetailInterviewSection />
      </div>
    </div>
  );
}
