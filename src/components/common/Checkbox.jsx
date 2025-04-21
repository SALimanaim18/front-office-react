import React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <div className="relative">
      <input type="checkbox" className="peer absolute h-4 w-4 opacity-0" ref={ref} checked={checked} {...props} />
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border border-primary ring-offset-background",
          checked && "bg-primary text-primary-foreground",
          className,
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
