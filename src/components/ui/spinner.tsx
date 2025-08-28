import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  thickness?: number;
}

export function Spinner({
  size = 20,
  thickness = 2,
  className,
  ...props
}: SpinnerProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: thickness,
  };
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent align-[-0.125em] text-current",
        className
      )}
      style={style}
      {...props}
    />
  );
}

export default Spinner;
