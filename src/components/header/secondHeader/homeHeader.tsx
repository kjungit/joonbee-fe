import IconButton from '@/components/@common/iconButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const HomeHeader = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <nav className="flex gap-2">
      <Link href="/?category=interview&Ifield=fe">
        <IconButton
          iconName="document"
          color={categoryParams === 'interview' ? 'blue' : 'white'}
          className={`${categoryParams === 'interview' && 'font-bold'}`}
          size="sm">
          면접 보기
        </IconButton>
      </Link>
      <Link href="/?category=question&Qfield=fe&subField=react">
        <IconButton
          iconName="questionBox"
          color={categoryParams === 'question' ? 'blue' : 'white'}
          className={`${categoryParams === 'question' && 'font-bold'}`}
          size="sm">
          질문 보기
        </IconButton>
      </Link>
    </nav>
  );
};
