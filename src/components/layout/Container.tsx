import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padded?: boolean;
}

export function Container({
  className,
  children,
  width = "xl",
  padded = true,
  ...props
}: ContainerProps) {
  const widthClass =
    width === "full"
      ? "w-full"
      : width === "sm"
        ? "max-w-screen-sm"
        : width === "md"
          ? "max-w-screen-md"
          : width === "lg"
            ? "max-w-screen-lg"
            : width === "xl"
              ? "max-w-screen-xl"
              : "max-w-screen-2xl";

  return (
    <div
      className={cn(
        "mx-auto",
        widthClass,
        padded && "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
