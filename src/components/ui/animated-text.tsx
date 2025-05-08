import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  animation?: "fade-up" | "slide-in" | "shimmer";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const AnimatedText = ({
  children,
  className,
  element: Element = "h2",
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedTextProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case "fade-up":
        return "animate-fade-up";
      case "slide-in":
        return "animate-slide-in";
      case "shimmer":
        return "animated-shimmer-text";
      default:
        return "animate-fade-up";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: animation === "fade-up" ? 20 : 0, x: animation === "slide-in" ? -20 : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once }}
      transition={{ duration, delay }}
    >
      <Element className={cn(className, getAnimationClass())}>
        {children}
      </Element>
    </motion.div>
  );
};

// Simple wrapper components for common uses
export const AnimatedH1 = (props: Omit<AnimatedTextProps, "element">) => (
  <AnimatedText {...props} element="h1" />
);

export const AnimatedH2 = (props: Omit<AnimatedTextProps, "element">) => (
  <AnimatedText {...props} element="h2" />
);

export const AnimatedH3 = (props: Omit<AnimatedTextProps, "element">) => (
  <AnimatedText {...props} element="h3" />
);

export const AnimatedCardTitle = (props: Omit<AnimatedTextProps, "element" | "animation">) => (
  <AnimatedText {...props} element="h3" animation="slide-in" />
);

export const ShimmerText = (props: Omit<AnimatedTextProps, "element" | "animation">) => (
  <AnimatedText {...props} element="span" animation="shimmer" />
);