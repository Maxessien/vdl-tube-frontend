"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface LoadRollerProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  duration?: number;
}

const LoadRoller = ({ className = "", size, strokeWidth = 8, duration = 1 }: LoadRollerProps) => {
  const containerStyle: CSSProperties = {
    width: size ? `${size}px` : "100%",
    height: size ? `${size}px` : "100%",
    display: "inline-block",
  };

  const circlePercentage = 0.7;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - circlePercentage);

  return (
    <div style={containerStyle}>
      <motion.svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={className}
        />
      </motion.svg>
    </div>
  );
};

export default LoadRoller;
