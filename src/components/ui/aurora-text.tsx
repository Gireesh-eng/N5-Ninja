"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  duration?: number;
}

/**
 * Aurora Text
 * 
 * A component that applies a flowing aurora effect to text.
 */
export function AuroraText({
  children,
  className,
  gradient = "from-indigo-500 via-purple-500 to-pink-500",
  duration = 8,
  ...props
}: AuroraTextProps & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent animate-aurora-flow",
        gradient,
        className
      )}
      style={{
        backgroundSize: "300% 100%",
        animationDuration: `${duration}s`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}