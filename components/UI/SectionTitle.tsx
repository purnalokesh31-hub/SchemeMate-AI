import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignmentClass = align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl';

  return (
    <div className={`space-y-4 ${alignmentClass} ${className}`}>
      {badge && (
        <span className="inline-flex items-center bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
