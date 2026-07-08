import React from 'react';

interface BadgeProps {
  category: 'business' | 'education' | 'agriculture' | 'women' | 'minority' | 'msme';
}

export default function Badge({ category }: BadgeProps) {
  const styles = {
    business: 'bg-blue-50 text-blue-700 border-blue-200',
    education: 'bg-amber-50 text-amber-700 border-amber-200',
    agriculture: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    women: 'bg-purple-50 text-purple-700 border-purple-200',
    minority: 'bg-rose-50 text-rose-700 border-rose-200',
    msme: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const label = {
    business: 'Business & Loans',
    education: 'Education',
    agriculture: 'Agriculture',
    women: 'Women schemes',
    minority: 'Minority & SC/ST',
    msme: 'MSME Support',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${
        styles[category] || 'bg-slate-100 text-slate-800 border-slate-200'
      }`}
    >
      {label[category] || category}
    </span>
  );
}
