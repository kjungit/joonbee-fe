import { useEffect } from 'react';
import reactDom from 'react-dom';
type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }
  const el = document.getElementById('potal') as Element;
  return reactDom.createPortal(children, el);
}
