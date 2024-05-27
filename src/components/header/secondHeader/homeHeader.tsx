import IconButtonLink from '@/components/@common/iconButtonLink';
import { useSearchParams } from 'next/navigation';

export const HomeHeader = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <nav className="flex">
      <IconButtonLink
        color={categoryParams === 'interview' ? 'blue' : 'white'}
        className={`${categoryParams === 'interview' && 'font-bold'}`}
        path="/?category=interview&Ifield=fe&sort=latest"
        iconName="checklist.png"
        edge="start"
        size="sm">
        면접 보기
      </IconButtonLink>
      <IconButtonLink
        color={categoryParams === 'question' ? 'blue' : 'white'}
        className={`${categoryParams === 'question' && 'font-bold'}`}
        path="/?category=question&Qfield=fe&subField=react"
        iconName="questions.svg"
        edge="start"
        size="sm">
        질문 보기
      </IconButtonLink>
    </nav>
  );
};
