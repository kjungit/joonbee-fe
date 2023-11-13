import { useEffect } from 'react';
import reactDom from 'react-dom';
type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  const el = document.getElementById('potal') as Element;
  return reactDom.createPortal(children, el);
}
