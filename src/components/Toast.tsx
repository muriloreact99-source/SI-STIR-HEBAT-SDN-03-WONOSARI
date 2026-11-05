import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#12383A] text-[#FFF0C5] border-2 border-[#12383A] shadow-[4px_4px_0px_#FF8C52] animate-bounce-short">
      <span className="w-2.5 h-2.5 rounded-full bg-[#8AD6D1] animate-ping" />
      <span className="text-sm font-bold tracking-wide">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-xs font-extrabold text-[#FF8C52] hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
};
