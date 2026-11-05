import React from 'react';

export type StatusChipType =
  | 'Draf'
  | 'Belum dikerjakan'
  | 'Diajukan'
  | 'Sudah dikirim'
  | 'Disetujui'
  | 'Sudah diperiksa'
  | 'Perlu revisi'
  | 'Perlu diperbaiki'
  | 'Absen hari ini sudah diisi'
  | 'Absen hari ini belum diisi'
  | 'Hanya Anda'
  | 'Dibagikan ke Kepala Sekolah'
  | 'Terlihat murid dan orang tua';

interface StatusChipProps {
  status: StatusChipType | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'md', className = '' }) => {
  let bg = '#EADFB8';
  let text = '#4B4524';
  let icon = '📝';

  switch (status) {
    case 'Disetujui':
    case 'Sudah diperiksa':
    case 'Absen hari ini sudah diisi':
      bg = '#CDEFD0';
      text = '#174D1F';
      icon = '✓';
      break;

    case 'Diajukan':
    case 'Sudah dikirim':
    case 'Dibagikan ke Kepala Sekolah':
      bg = '#CFEFEC';
      text = '#12383A';
      icon = '↗';
      break;

    case 'Perlu revisi':
    case 'Perlu diperbaiki':
      bg = '#FFD9C2';
      text = '#7A2E00';
      icon = '!';
      break;

    case 'Hanya Anda':
      bg = '#FFF0C5';
      text = '#12383A';
      icon = '🔒';
      break;

    case 'Terlihat murid dan orang tua':
      bg = '#CFEFEC';
      text = '#12383A';
      icon = '👥';
      break;

    case 'Draf':
    case 'Belum dikerjakan':
    case 'Absen hari ini belum diisi':
    default:
      bg = '#EADFB8';
      text = '#4B4524';
      icon = '•';
      break;
  }

  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs md:text-sm';

  return (
    <span
      style={{ backgroundColor: bg, color: text }}
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border-[1.5px] border-[#12383A] whitespace-nowrap shadow-[1.5px_1.5px_0px_#12383A] ${padding} ${className}`}
    >
      <span className="font-extrabold text-[11px]">{icon}</span>
      <span>{status}</span>
    </span>
  );
};
