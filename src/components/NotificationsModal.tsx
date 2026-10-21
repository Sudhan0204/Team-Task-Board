import React from 'react';
import { X, Check, Bell, MessageSquare, CheckCircle2, GitPullRequest } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'David Kim assigned you to DEV-107',
      desc: 'Implement authentication screens (Security, OAuth 2.0)',
      time: '15m ago',
      unread: true,
      icon: MessageSquare,
      color: 'text-[#4648d4] bg-indigo-50',
    },
    {
      id: 'n2',
      title: 'PR #142 Merged to main',
      desc: 'feat/crdt-sync merged by Marcus Vance with 2 approvals',
      time: '1h ago',
      unread: true,
      icon: GitPullRequest,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'n3',
      title: 'DEV-110 marked as Done',
      desc: 'Set up project repository passed all CI checks',
      time: '3h ago',
      unread: false,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-[#4648d4]" />
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
            <span className="size-5 rounded-full bg-[#4648d4] text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3.5 hover:bg-slate-50 transition cursor-pointer text-xs ${
                  n.unread ? 'bg-indigo-50/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 leading-tight">{n.title}</div>
                    <div className="text-slate-500 mt-0.5 truncate">{n.desc}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">{n.time}</div>
                  </div>
                  {n.unread && <span className="size-2 rounded-full bg-[#4648d4] shrink-0 mt-1" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#4648d4] hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
