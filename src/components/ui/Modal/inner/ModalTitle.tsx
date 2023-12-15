const ModalTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-[18px] font-bold pt-5 pb-2 px-2">{children}</h4>
);

type ModalTitleComponentType = typeof ModalTitle extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalTitleComponentType: ModalTitleComponentType = ModalTitle as any;

export default ModalTitle;
