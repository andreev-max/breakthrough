import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import Icons from "../Icons";

const buttonVariants = cva(
  "active:scale-95 flex items-center gap-2 justify-center rounded text-sm font-medium focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-base900 text-base200 hover:text-base50 hover:bg-base700",
        error:
          "text-error400 bg-error100 hover:bg-error300 hover:text-white border-error300 border",
        primary:
          "text-primary100 bg-primary700 hover:bg-primary600 hover:text-white",
        outline:
          "bg-transparent text-base200 hover:text-base50 hover:border-base50 border border-base300",
        ghost:
          "bg-transparent text-base200 hover:bg-base800 hover:text-base50 data-[state=open]:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-3",
        sm: "h-8 p-1",
        lg: "h-12 px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, isLoading, disabled, size, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
