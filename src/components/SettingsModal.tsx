import React, { useState } from 'react';
import { X, Check, Shield, Bell, Moon, Sun, Smartphone } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [saved, setSaved] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackSync, setSlackSync] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-base font-bold text-slate-900">Workspace Settings</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Workspace Profile</h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Organization:</span>
                <span className="font-semibold text-slate-900">Acme Tech</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Plan:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-indigo-50 text-[#4648d4] font-bold">
                  DevFlow Enterprise
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Active Members:</span>
                <span className="font-mono font-semibold text-slate-800">8 seats used</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">Integrations &amp; Sync</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">Linear &amp; GitHub Sync</div>
                  <div className="text-[11px] text-slate-500">Auto-link commits and PR updates to task IDs</div>
                </div>
                <input
                  type="checkbox"
                  checked={slackSync}
                  onChange={(e) => setSlackSync(e.target.checked)}
                  className="size-4 rounded accent-[#4648d4]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">Sprint Digest Notifications</div>
                  <div className="text-[11px] text-slate-500">Daily velocity summary sent to work email</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="size-4 rounded accent-[#4648d4]"
                />
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-semibold shadow-xs"
            >
              {saved && <Check className="size-3.5" />}
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
