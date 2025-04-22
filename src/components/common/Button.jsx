const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#460904] disabled:opacity-50 disabled:pointer-events-none"
  
    const variantClasses = {
      primary: "bg-[#460904] text-white hover:bg-[#5a0b06] shadow-md",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    }
  
    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-4 py-2 rounded-md",
      lg: "text-base px-6 py-3 rounded-lg",
    }
  
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
    return (
      <button className={combinedClasses} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button
  
  