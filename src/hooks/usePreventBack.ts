import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function usePreventBack() {
  const router = useRouter();

  useEffect(() => {
    history.pushState(null, document.title, location.href);
    const handleBeforePopState = (e: PopStateEvent) => {
      e.preventDefault();
      const isConfirmed = confirm('뒤로가시겠습니까?');
      if (isConfirmed) {
        router.back();
      }
    };

    window.addEventListener('popstate', handleBeforePopState);

    return () => {
      window.removeEventListener('popstate', handleBeforePopState);
    };
  }, [router]);
}
