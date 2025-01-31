export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto max-w-[900px] px-4">{children}</div>;
};
