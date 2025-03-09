"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const HeroHighlight = ({ 
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-4 relative z-10 bg-transparent w-full overflow-hidden flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-y-0 w-full -z-10 opacity-30 blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-secondary/40 transform" />
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      }}
      className={cn(
        "px-1 py-0.5 rounded-md bg-gradient-to-r from-primary to-primary-400 text-primary-foreground font-semibold inline-block transform transition-all duration-200",
        className
      )}
    >
      {children}
    </motion.span>
  );
}; 