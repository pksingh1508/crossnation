"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="breadcrumb" className={cn("w-full", className)} {...props} />
);

const BreadcrumbList = ({
  className,
  ...props
}: React.ComponentProps<"ol">) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
);

const BreadcrumbItem = ({
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li className={cn("inline-flex items-center gap-1", className)} {...props} />
);

const BreadcrumbSeparator = ({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("inline-flex items-center text-muted-foreground", className)}
    {...props}
  >
    {children ?? <ChevronRight className="h-4 w-4" />}
  </span>
);

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = ({
  className,
  asChild,
  ...props
}: BreadcrumbLinkProps) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className={cn(
        "hover:text-foreground underline-offset-4 hover:underline",
        className
      )}
      {...props}
    />
  );
};

const BreadcrumbPage = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span className={cn("font-medium text-foreground", className)} {...props} />
);

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
