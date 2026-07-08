import React from 'react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-shimmer rounded-xl ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-slate-200 rounded-3xl p-6 bg-white space-y-4 shadow-sm">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-16 w-full" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex gap-3 pt-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
