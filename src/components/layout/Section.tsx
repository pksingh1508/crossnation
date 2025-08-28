import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  width?: React.ComponentProps<typeof Container>["width"];
  padded?: boolean;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const spacingToClass: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "py-0",
  sm: "py-6 sm:py-8",
  md: "py-10 sm:py-12 lg:py-16",
  lg: "py-14 sm:py-16 lg:py-24",
  xl: "py-16 sm:py-24 lg:py-32",
};

export function Section({
  className,
  children,
  width = "xl",
  padded = true,
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingToClass[spacing])} {...props}>
      <Container width={width} padded={padded} className={cn(className)}>
        {children}
      </Container>
    </section>
  );
}

export default Section;
