import { Typography } from "./typography";

interface Props extends React.PropsWithChildren {
  variant?: keyof typeof variants;
}

const variants = {
  danger: "bg-dark-red-100 text-dark-red-500",
  primary: "bg-schiphol-blue-100 text-schiphol-blue-500",
};

export const Chip: React.FC<Props> = ({ children, variant = "primary" }) => {
  return (
    <Typography
      variant="small"
      component="span"
      className={`inline-flex items-center px-3 py-1 text-sm font-medium  rounded-full ${variants[variant]}`.trimEnd()}
    >
      {children}
    </Typography>
  );
};
