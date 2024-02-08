import InfoSection from '@/components/page/Main/InfoSection';
import InterviewSection from '@/components/page/Main/InterviewSection';
import QuestionSection from '@/components/page/Main/QuestionSection';
import TopSection from '@/components/page/Main/TopSection';

export default function Home() {
  return (
    <div className=" w-full flex items-center flex-col">
      <TopSection />
      {/* <InterviewSection />
      <QuestionSection /> */}
      <InfoSection />
    </div>
  );
}
