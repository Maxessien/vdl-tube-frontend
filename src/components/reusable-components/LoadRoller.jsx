'use client';

import { motion } from 'framer-motion';

/**
 * LoadRoller - An animated loading spinner component
 * 
 * @param {Object} props
 * @param {string} props.className - Optional CSS class for styling (controls color via stroke)
 * @param {number} props.size - Optional size in pixels (default: 100% of container width)
 * @param {number} props.strokeWidth - Optional stroke width (default: 8)
 * @param {number} props.duration - Optional animation duration in seconds (default: 2)
 * 
 * @example
 * // Basic usage
 * <LoadRoller />
 * 
 * @example
 * // With custom color via className
 * <LoadRoller className="text-blue-500" />
 * 
 * @example
 * // With custom size
 * <LoadRoller size={50} />
 */
const LoadRoller = ({ 
  className = '', 
  size, 
  strokeWidth = 8,
  duration = 2 
}) => {
  const containerStyle = {
    width: size ? `${size}px` : '100%',
    height: size ? `${size}px` : '100%',
    display: 'inline-block',
  };

  // 70% of circle means 252 degrees (360 * 0.7)
  const circlePercentage = 0.7;
  const radius = 45; // SVG is 100x100, so radius of 45 gives nice padding
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - circlePercentage);

  return (
    <div style={containerStyle}>
      <motion.svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        animate={{
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: 'linear',
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
