import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const smoButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "smo-gradient text-primary-foreground shadow-primary hover:opacity-90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-primary text-primary bg-background shadow-sm hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "smo-hero-gradient text-primary-foreground shadow-primary hover:shadow-xl hover:shadow-primary/25 font-semibold",
        success: "bg-success text-success-foreground shadow-sm hover:bg-success/90",
        warning: "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base font-semibold",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SmoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof smoButtonVariants> {
  asChild?: boolean;
}

const SmoButton = React.forwardRef<HTMLButtonElement, SmoButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(smoButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
SmoButton.displayName = "SmoButton";

export { SmoButton, smoButtonVariants };