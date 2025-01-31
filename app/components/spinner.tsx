import { IconLoader2 } from "@tabler/icons-react";

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <IconLoader2 className="w-6 h-6 text-schiphol-blue-500 animate-spin" />
    </div>
  );
}
