import * as React from "react";
import { cn } from "@/lib/utils";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function InputGroup({
  left,
  right,
  className,
  children,
  ...props
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-stretch rounded-md border border-input overflow-hidden",
        className
      )}
      {...props}
    >
      {left && (
        <div className="flex items-center px-2 text-muted-foreground bg-muted/40">
          {left}
        </div>
      )}
      <div className="flex-1 min-w-0">{children}</div>
      {right && (
        <div className="flex items-center px-2 text-muted-foreground bg-muted/40">
          {right}
        </div>
      )}
    </div>
  );
}

export default InputGroup;
