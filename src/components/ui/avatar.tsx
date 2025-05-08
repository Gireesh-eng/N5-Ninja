"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  glow?: boolean;
  pulse?: boolean;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, glow, pulse, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      glow && "ring-2 ring-offset-2 ring-primary shadow-lg shadow-primary/20",
      pulse && "animate-pulse-slow",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { animateEntrance?: boolean }
>(({ className, animateEntrance, ...props }, ref) => (
  <motion.div
    initial={animateEntrance ? { opacity: 0, scale: 0.8 } : false}
    animate={animateEntrance ? { opacity: 1, scale: 1 } : false}
    transition={{ duration: 0.3 }}
    style={{ height: '100%', width: '100%' }}
  >
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  </motion.div>
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { gradient?: boolean }
>(({ className, gradient, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      gradient && "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { limit?: number }
>(({ className, limit, ...props }, ref) => {
  const children = React.Children.toArray(props.children);
  const maxAvatars = limit || children.length;
  const displayAvatars = children.slice(0, maxAvatars);
  const overflow = Math.max(0, children.length - maxAvatars);

  return (
    <div 
      ref={ref}
      className={cn("flex -space-x-4", className)}
      {...props}
    >
      {displayAvatars}
      
      {overflow > 0 && (
        <Avatar className="bg-primary/10 border-2 border-background flex items-center justify-center">
          <AvatarFallback>
            <span className="text-xs font-medium">+{overflow}</span>
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
})
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
