"use client";

import { motion } from "framer-motion";

interface SkeletonBoxProps {
  className?: string;
}

export function SkeletonBox({ className = "" }: SkeletonBoxProps) {
  return (
    <motion.div
      className={`bg-zinc-200 dark:bg-zinc-700 rounded-2xl ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
