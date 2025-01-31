import { twMerge } from "tailwind-merge";
import { CustomizableComponentFC } from "~/helpers/customizable-component-fc";

interface Props extends React.PropsWithChildren {
  variant?: keyof typeof variants;
  className?: string;
}

const variants = {
  h1: "text-4xl font-bold text-schiphol-blue-900",
  h2: "text-3xl font-semibold text-gray-800",
  h3: "text-2xl font-medium text-gray-700",
  h4: "text-xl font-semibold text-gray-800",
  p: "text-base text-gray-600",
  small: "text-sm text-gray-500",
};

export const Typography: CustomizableComponentFC<"p", Props> = ({
  variant,
  className,
  component: Component = "p",
  ...componentProps
}) => {
  const computeVariant = () => {
    if (variant) return variant;

    const keys = Object.keys(variants);

    if ((Component as string) in keys) return Component as keyof typeof variant;

    return "p";
  };

  return (
    <Component
      className={twMerge(variants[computeVariant()], className)}
      {...componentProps}
    />
  );
};
