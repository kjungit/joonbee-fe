const ModalTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-[16px] font-bold p-2">{children}</h4>
);

type ModalTitleComponentType = typeof ModalTitle extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalTitleComponentType: ModalTitleComponentType = ModalTitle as any;

export default ModalTitle;
