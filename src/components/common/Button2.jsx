import React from "react";
import { cn } from "../../lib/utils"
import { Slot } from "@radix-ui/react-slot";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "button",
      loading, // ❗️On extrait loading pour éviter de le passer au DOM
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-[#5a0b06] to-[#7a1b16] hover:from-[#4a0905] hover:to-[#6a0b06] text-white":
              variant === "default",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90":
              variant === "destructive",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80":
              variant === "secondary",
            "bg-transparent hover:bg-accent hover:text-accent-foreground":
              variant === "ghost",
            "bg-transparent underline-offset-4 hover:underline text-[#5a0b06]":
              variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-14 rounded-lg px-8 py-6 text-lg font-medium": size === "xl",
          },
          className
        )}
        ref={ref}
        type={type}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? "Chargement..." : children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
