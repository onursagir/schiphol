import { CustomizableComponentFC } from "~/helpers/customizable-component-fc";

interface Props extends React.PropsWithChildren {}

export const Card: CustomizableComponentFC<"div", Props> = ({
  children,
  component: Component = "div",
  ...componentProps
}) => {
  return (
    <Component
      className="rounded-lg shadow-lg border border-gray-200 bg-white p-6"
      {...componentProps}
    >
      {children}
    </Component>
  );
};
