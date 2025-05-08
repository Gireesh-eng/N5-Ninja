"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps extends
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "gradient" | "striped" | "animated";
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = "default", showValue = false, size = "md", color, ...props }, ref) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Size-based styling
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  // Animation variants
  const animationVariants = {
    hidden: { width: 0 },
    visible: { width: `${value}%` },
  };

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-primary/20",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator asChild>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ 
              duration: 0.7, 
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.1 
            }}
            className={cn(
              "h-full w-full flex-1 rounded-full",
              {
                "bg-primary": variant === "default" && !color,
                "bg-gradient-to-r from-indigo-500 to-purple-600": variant === "gradient" && !color,
                "bg-primary bg-stripes": variant === "striped" && !color,
                "bg-primary animate-move-bg bg-[length:20px_20px] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)]": variant === "animated" && !color,
              },
              color && "custom-progress-color"
            )}
            style={color ? { backgroundColor: color } : undefined}
          />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
      
      {showValue && isClient && (
        <motion.span 
          className="absolute right-0 top-0 -mt-6 text-xs font-medium text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}%
        </motion.span>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
