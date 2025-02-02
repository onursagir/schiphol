import { IconLoader2 } from "@tabler/icons-react";

export function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex justify-center items-center"
    >
      <IconLoader2
        aria-hidden="true"
        className="w-6 h-6 text-schiphol-blue-500 animate-spin"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
