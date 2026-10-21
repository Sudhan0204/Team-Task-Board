import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', desc: 'Open Omni-search command palette' },
    { key: 'C', desc: 'Quick create task modal' },
    { key: '1', desc: 'Switch to Board view' },
    { key: '2', desc: 'Switch to List view' },
    { key: '3', desc: 'Switch to Timeline view' },
    { key: 'Esc', desc: 'Close any active drawer or modal' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Keyboard className="size-4 text-[#4648d4]" />
            <h3 className="text-base font-bold text-slate-900">Keyboard Shortcuts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-600">
            DevFlow is engineered for keyboard navigation velocity. Use these shortcuts anywhere in your workspace:
          </p>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 overflow-hidden">
            {shortcuts.map((s) => (
              <div key={s.key} className="flex items-center justify-between p-3 bg-white">
                <span className="text-slate-700 font-medium">{s.desc}</span>
                <kbd className="px-2 py-1 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] font-semibold text-slate-700">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
