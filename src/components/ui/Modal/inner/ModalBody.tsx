const ModalBody = ({ children }: { children: React.ReactNode }) => (
  <div className="py-4 px-2 text-[14px]">{children}</div>
);

type ModalBodyComponentType = typeof ModalBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalBodyComponentType: ModalBodyComponentType = ModalBody as any;

export default ModalBody;
