import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  el?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

export default function Container({
  children,
  className = '',
  el = 'div',
}: ContainerProps) {
  const Element = el;
  return (
    <Element className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Element>
  );
}
export type { ContainerProps };
