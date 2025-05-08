"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { ShineBorder } from "@/components/ui/shine-border"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "rise" | "glow" | "shine" | "border" | "rainbow" | "3d" | "scale" | "glass" | "shining-border" | "glow-border";
  hoverEffect?: boolean;
  animated?: boolean;
  animationDelay?: number;
  backgroundBlur?: boolean;
  shineBorder?: boolean;
  shineBorderWidth?: number;
  shineBorderColor?: string | string[];
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = false, animated = false, animationDelay = 0, backgroundBlur = false, shineBorder: showShineBorder = false, shineBorderWidth = 1, shineBorderColor = "#000000", ...props }, ref) => {
    const getAnimationClass = () => {
      switch (variant) {
        case "rise":
          return "card-animate-rise";
        case "glow":
          return "card-animate-glow";
        case "shine":
          return "card-animate-shine";
        case "border":
          return "card-animate-border";
        case "rainbow":
          return "card-animate-rainbow";
        case "3d":
          return "card-hover-3d";
        case "scale":
          return "card-animate-scale";
        case "glass":
          return "glass-card hover:shadow-xl";
        case "shining-border":
          return "card-shining-border";
        case "glow-border":
          return "card-glow-border";
        default:
          return "";
      }
    };

    const CardComponent = (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
          backgroundBlur && "backdrop-blur-sm",
          getAnimationClass(),
          hoverEffect && "hover:-translate-y-1 hover:shadow-md",
          className
        )}
        {...props}
      >
        {props.children}
        {showShineBorder && (
          <ShineBorder 
            borderWidth={shineBorderWidth}
            shineColor={shineBorderColor}
            className="absolute inset-0 rounded-lg"
          />
        )}
      </div>
    );

    if (animated) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: animationDelay,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="relative"
        >
          {CardComponent}
        </motion.div>
      );
    }

    return (
      <div className="relative">
        {CardComponent}
      </div>
    );
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// Animation variants for the card title
const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { gradient?: boolean }
>(({ className, gradient = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", 
      gradient ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400" : "",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof motion.p>
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Add CSS for card animations to be injected once
const CardStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
      50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
      100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
    }

    @keyframes borderGlow {
      0% { border-color: rgba(99, 102, 241, 0.5); }
      50% { border-color: rgba(168, 85, 247, 0.8); }
      100% { border-color: rgba(99, 102, 241, 0.5); }
    }

    @keyframes shine {
      0% { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }

    /* For shine effect */
    .card-animate-shine {
      position: relative;
      overflow: hidden;
    }

    .card-animate-shine::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: shine 3s infinite;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card-animate-shine:hover::before {
      opacity: 1;
    }

    /* Rainbow border effect */
    .card-animate-rainbow {
      position: relative;
      z-index: 1;
    }

    .card-animate-rainbow::before {
      content: '';
      position: absolute;
      z-index: -2;
      inset: -2px;
      border-radius: 12px; 
      background: conic-gradient(
        from 0deg,
        #4f46e5,
        #ec4899,
        #f59e0b,
        #10b981,
        #4f46e5
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card-animate-rainbow:hover::before {
      opacity: 1;
    }

    .card-animate-rainbow::after {
      content: '';
      position: absolute;
      z-index: -1;
      inset: 0;
      background: inherit;
      border-radius: inherit;
    }

    /* 3D Hover effect */
    .card-hover-3d {
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      transform-style: preserve-3d;
    }

    .card-hover-3d:hover {
      transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
      box-shadow: 
        0 30px 30px rgba(0, 0, 0, 0.07),
        0 15px 15px rgba(0, 0, 0, 0.06),
        0 10px 8px rgba(0, 0, 0, 0.05);
    }
    
    /* Shining border effect */
    .card-shining-border {
      position: relative;
      overflow: hidden;
      z-index: 0;
    }
    
    .card-shining-border::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      z-index: -1;
      background: linear-gradient(
        45deg,
        #ff0000, #ff7300, #fffb00, #48ff00, 
        #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000
      );
      background-size: 400%;
      border-radius: inherit;
      animation: shiningBorder 20s linear infinite;
    }
    
    .card-shining-border::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: inherit;
      border-radius: inherit;
      z-index: -1;
    }
    
    @keyframes shiningBorder {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
    }
    
    /* Glowing pulse border effect */
    .card-glow-border {
      position: relative;
      isolation: isolate;
    }
    
    .card-glow-border::after {
      content: '';
      position: absolute;
      inset: -4px;
      background: linear-gradient(
        to right,
        #4f46e5, #ec4899, #10b981, #4f46e5
      );
      background-size: 300% 100%;
      animation: movingGradient 8s ease infinite;
      border-radius: calc(var(--radius) + 4px);
      z-index: -1;
      filter: blur(8px);
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }
    
    .card-glow-border:hover::after {
      opacity: 0.8;
    }
    
    @keyframes movingGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}} />
)

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardStyles
}
