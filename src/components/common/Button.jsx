import React from "react";
import { cn } from '../../lib/utils';

const Button = ({
variant = "primary",
size = "md",
children,
className,
fullWidth = false,
...props
}) => {
const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
    primary:
        "bg-sangred-DEFAULT text-white hover:bg-sangred-light focus:ring-sangred-light",
    secondary:
        "bg-sangblue-DEFAULT text-white hover:bg-sangblue-dark focus:ring-sangblue-dark",
    outline:
        "border-2 border-sangred-DEFAULT text-sangred-DEFAULT hover:bg-sangred-DEFAULT hover:text-white",
    ghost: "text-sangred-DEFAULT hover:bg-sangred-DEFAULT/10",
};

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-2.5 text-lg",
};

const widthStyles = fullWidth ? "w-full" : "";

return (
    <button
    className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        className
    )}
    {...props}
    >
    {children}
    </button>
);
};

export default Button;
