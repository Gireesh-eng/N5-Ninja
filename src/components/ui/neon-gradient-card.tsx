"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The border colors for the card
   * @default ["rgba(123, 97, 255, 1)", "rgba(236, 73, 171, 1)"]
   */
  borderColors?: string[];
  
  /**
   * The blur amount for the glow effect
   * @default "10px"
   */
  glowBlur?: string;
  
  /**
   * The border width
   * @default "2px"
   */
  borderWidth?: string;
  
  /**
   * Children to render inside the card
   */
  children: React.ReactNode;
  
  /**
   * The background color of the card
   * @default "rgba(13, 6, 32, 0.8)"
   */
  backgroundColor?: string;
}

/**
 * A card with a neon gradient border effect
 */
export function NeonGradientCard({
  borderColors = ["rgba(123, 97, 255, 1)", "rgba(236, 73, 171, 1)"],
  glowBlur = "10px",
  borderWidth = "2px",
  backgroundColor = "rgba(255, 255, 255, 0.05)",
  className,
  children,
  ...props
}: NeonGradientCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden p-6", 
        className
      )}
      style={{
        background: backgroundColor,
        backdropFilter: "blur(16px)",
      }}
      {...props}
    >
      {/* Gradient Border */}
      <div
        className="absolute inset-0 -z-10 animate-gradient rounded-xl"
        style={{
          background: `linear-gradient(90deg, ${borderColors.join(', ')})`,
          filter: `blur(${glowBlur})`,
          padding: borderWidth,
          backgroundSize: "200% 200%",
          opacity: 0.85,
        }}
      />
      
      {/* Inner Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}