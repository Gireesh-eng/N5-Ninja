"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: 
          "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all",
        rainbow: 
          "relative overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg",
        shimmer: 
          "relative overflow-hidden bg-primary text-primary-foreground before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        pulsate:
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all animate-pulse-subtle",
        glow:
          "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-shadow",
        ripple:
          "bg-primary text-primary-foreground hover:bg-primary/90 overflow-hidden relative"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animated?: boolean;
  rippleEffect?: boolean;
  loading?: boolean;
  loadingText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    animated = false, 
    rippleEffect = false,
    loading = false,
    loadingText,
    iconLeft,
    iconRight,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Track ripple effect
    const [ripples, setRipples] = React.useState<{ id: number, x: number, y: number, size: number }[]>([]);
    const nextId = React.useRef(0);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !rippleEffect) return;
      
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      const id = nextId.current++;
      
      setRipples(prev => [...prev, { id, x, y, size }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 750);
    };

    // Rainbow effect for rainbow variant
    const rainbowGradient = variant === 'rainbow' ? (
      <div className="absolute inset-[-2px] rounded-[inherit] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm transition-all group-hover:opacity-100"></div>
    ) : null;

    // Animated button wrapper
    const ButtonContent = (
      <Comp
        ref={buttonRef}
        className={cn(
          buttonVariants({ variant, size }),
          rippleEffect && "relative overflow-hidden",
          variant === 'rainbow' && "group bg-clip-padding relative z-10",
          loading && "relative text-transparent",
          className
        )}
        onClick={(e) => {
          addRipple(e);
          props.onClick?.(e);
        }}
        disabled={props.disabled || loading}
        {...props}
      >
        {asChild ? (
          props.children // When asChild is true, only render the child passed to Button
        ) : (
          <> {/* When asChild is false, render all internal button content */}
            {variant === 'rainbow' && rainbowGradient}
            {iconLeft && <span className={cn("mr-2", loading && "invisible")}>{iconLeft}</span>}
            {props.children}
            {iconRight && <span className={cn("ml-2", loading && "invisible")}>{iconRight}</span>}
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                {loadingText && <span className="ml-2">{loadingText}</span>}
              </div>
            )}

            {rippleEffect && ripples.map(({ id, x, y, size }) => (
              <span
                key={id}
                className="absolute rounded-full bg-white/30 animate-ripple"
                style={{
                  top: y - size / 2,
                  left: x - size / 2,
                  width: size,
                  height: size,
                }}
              />
            ))}
          </>
        )}
      </Comp>
    );

    // Apply framer-motion animations if animated prop is true
    if (animated) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          {ButtonContent}
        </motion.div>
      );
    }

    return ButtonContent;
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
