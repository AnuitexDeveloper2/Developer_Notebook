import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

type Props<T extends ElementType> = {
  tag?: T;
} & ComponentPropsWithoutRef<T>;

function MyComponent<T extends ElementType>({
  tag,
  children,
  ...rest
}: Props<T>) {
  const Component = tag || "div";
  return <Component {...rest}>{children}</Component>;
}

export default function CustomComponent() {
    return(
        <div>
            <MyComponent tag='a' href="/"> I am link</MyComponent>
        </div>
    )
}