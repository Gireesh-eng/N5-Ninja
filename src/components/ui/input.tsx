"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "filled" | "outline" | "underlined" | "animated";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    error?: boolean;
    errorMessage?: string;
    showCharCount?: boolean;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", icon, iconPosition = "left", error, errorMessage, showCharCount, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [charCount, setCharCount] = React.useState(props.value?.toString().length || 0);
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    const variantStyles = {
      default: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      filled: "flex h-10 w-full rounded-md bg-muted border-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
      outline: "flex h-10 w-full rounded-md border-2 border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      underlined: "flex h-10 w-full border-b-2 border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
      animated: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-300 ease-in-out ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(99,102,241,0.2)] focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
    };

    // Classes based on having an icon
    const getInputPaddingClasses = () => {
      if (!icon) return "";
      
      return iconPosition === "left" ? "pl-10" : "pr-10";
    };
    
    return (
      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            variantStyles[variant],
            getInputPaddingClasses(),
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}

        {variant === "animated" && (
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: focused ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {error && errorMessage && (
          <p className="mt-1.5 text-xs text-destructive">{errorMessage}</p>
        )}
        
        {showCharCount && props.maxLength && (
          <div className="absolute right-3 -bottom-5 text-xs text-muted-foreground">
            {charCount}/{props.maxLength}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
