"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & { 
    variant?: "default" | "gradient" | "filled" | "outline" 
  }
>(({ className, variant = "default", ...props }, ref) => {
  // Apply different styles based on the variant
  const variantClasses = {
    default: "",
    gradient: "border border-gray-200 dark:border-gray-800 rounded-lg p-1 overflow-hidden",
    filled: "bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1",
    outline: "border border-gray-200 dark:border-gray-800 rounded-lg p-1",
  }

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn(
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Tabs.displayName = TabsPrimitive.Root.displayName

// Animated indicator that follows the active tab
const TabsIndicator = ({ activeTab, children }) => {
  const [indicatorWidth, setIndicatorWidth] = React.useState(0);
  const [indicatorLeft, setIndicatorLeft] = React.useState(0);
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position when activeTab changes
  React.useEffect(() => {
    const activeTabIndex = React.Children.toArray(children).findIndex(
      (child: any) => child.props.value === activeTab
    );
    
    if (activeTabIndex !== -1 && tabsRef.current[activeTabIndex]) {
      const tabElement = tabsRef.current[activeTabIndex];
      if (tabElement) {
        setIndicatorWidth(tabElement.offsetWidth);
        setIndicatorLeft(tabElement.offsetLeft);
      }
    }
  }, [activeTab, children]);

  // Clone children to add refs
  const tabsWithRefs = React.Children.map(children, (child: any, index) => {
    return React.cloneElement(child, {
      ref: (el: HTMLButtonElement | null) => {
        tabsRef.current[index] = el;
      },
    });
  });

  return (
    <div className="relative">
      {tabsWithRefs}
      <motion.div 
        className="absolute bottom-0 h-0.5 rounded-full bg-primary"
        initial={false}
        animate={{ 
          width: indicatorWidth,
          left: indicatorLeft,
          opacity: activeTab ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "default" | "pill" | "underline" | "gradient" | "enclosed"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
    pill: "flex space-x-1 rounded-full bg-muted p-1",
    underline: "flex border-b border-gray-200 dark:border-gray-800",
    gradient: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 rounded-lg p-1",
    enclosed: "flex border-b border-gray-200 dark:border-gray-800"
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex w-full",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "pill" | "underline" | "gradient"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    pill: "ring-offset-background data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800",
    underline: "border-b-2 border-transparent px-4 pb-2 pt-1 font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground",
    gradient: "transition-all data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-gray-100"
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    animate?: boolean;
  }
>(({ className, animate = true, ...props }, ref) => {
  if (animate) {
    return (
      <TabsPrimitive.Content
        ref={ref}
        asChild
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {props.children}
        </motion.div>
      </TabsPrimitive.Content>
    )
  }

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator }
