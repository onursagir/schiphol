interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<Props> = (props) => {
  return (
    <button
      className="px-6 py-3 text-white bg-schiphol-blue-500 rounded-lg shadow-md hover:bg-schiphol-blue-400 transition"
      {...props}
    />
  );
};
