'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  form?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  type = 'button',
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  loading = false,
  children,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/10',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-500/10',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100',
    ghost: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  const spinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const buttonElement = (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      disabled={loading || disabled}
    >
      {loading && spinner}
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className={fullWidth ? 'w-full block' : 'inline-block'}>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}
export type { ButtonProps };
export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];
