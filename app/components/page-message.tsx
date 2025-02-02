import { TablerIcon } from "@tabler/icons-react";
import { Typography } from "./typography";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: TablerIcon;
  header: string;
  content: string;
}

export const PageMessage: React.FC<Props> = ({
  icon: Icon,
  header,
  content,
  ...componentProps
}) => {
  return (
    <div
      className="aspect-video bg-gray-200 rounded-lg flex-col flex items-center justify-center text-gray-300"
      {...componentProps}
    >
      <Icon size={120} />
      <Typography variant="h2" className="mt-2">
        {header}
      </Typography>
      <Typography variant="p">{content}</Typography>
    </div>
  );
};
