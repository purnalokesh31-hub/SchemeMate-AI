'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverLift?: boolean;
  glass?: boolean;
  border?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  onClick,
  hoverLift = true,
  glass = false,
  border = true,
  padding = 'md',
}: CardProps) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  const baseStyles = 'rounded-[2rem] overflow-hidden bg-white shadow-sm';
  const borderStyle = border ? 'border border-slate-200/80' : '';
  const glassStyle = glass ? 'glass' : '';
  
  const classes = `${baseStyles} ${borderStyle} ${glassStyle} ${paddings[padding]} ${className}`;

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverLift ? { y: -6, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)' } : {}}
        onClick={onClick}
        className={`${classes} cursor-pointer`}
      >
        {children}
      </motion.div>
    );
  }

  if (hoverLift) {
    return (
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={classes}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
