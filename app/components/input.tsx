interface Props extends React.ButtonHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => {
  return <input {...props} />;
};
