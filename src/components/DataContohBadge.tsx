import React from 'react';

interface DataContohBadgeProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const DataContohBadge: React.FC<DataContohBadgeProps> = ({ className = '', size = 'sm' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full border border-[#12383A] bg-[#FFF0C5] text-[#12383A] uppercase tracking-wider ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
      title="Data simulasi contoh prototipe"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C52]"></span>
      Data contoh
    </span>
  );
};
