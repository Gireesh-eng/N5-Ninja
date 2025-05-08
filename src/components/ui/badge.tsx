import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        gradient:
          "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
        shimmer:
          "border-transparent bg-primary text-primary-foreground relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        dot:
          "border-transparent pl-1.5", // For use with the dot variant that has a colored dot
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean;
  dotColor?: string; // For use with the dot variant
}

function Badge({ 
  className, 
  variant, 
  animated = false,
  dotColor,
  ...props 
}: BadgeProps) {
  const BadgeComponent = (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === "dot" && dotColor && (
        <span 
          className="mr-1 h-1.5 w-1.5 rounded-full" 
          style={{ backgroundColor: dotColor }} 
        />
      )}
      {props.children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {BadgeComponent}
      </motion.div>
    );
  }

  return BadgeComponent;
}

export { Badge, badgeVariants }
