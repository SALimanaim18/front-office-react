import * as React from "react";

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

export function Tooltip({ children }) {
  return <div className="relative group">{children}</div>;
}

export function TooltipTrigger({ children }) {
  return <>{children}</>;
}

export function TooltipContent({ children }) {
  return (
    <div className="absolute z-10 p-2 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {children}
    </div>
  );
}
