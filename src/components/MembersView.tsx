import React from 'react';
import { Mail, CheckCircle2, UserPlus, Shield, Sparkles } from 'lucide-react';
import { Task } from '../types';
import { teamMembers } from '../data/initialData';

interface MembersViewProps {
  tasks: Task[];
  onInviteMember: () => void;
}

export const MembersView: React.FC<MembersViewProps> = ({ tasks, onInviteMember }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8fafc] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Workspace Team Members</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage engineers, roles, sprint allocations, and task velocity.
          </p>
        </div>
        <button
          type="button"
          onClick={onInviteMember}
          className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <UserPlus className="size-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => {
          const assignedTasks = tasks.filter((t) => t.assignee.id === member.id || t.assignee.initials === member.initials);
          const completedCount = assignedTasks.filter((t) => t.status === 'done').length;

          return (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="size-10 rounded-full object-cover ring-2 ring-slate-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className={`size-10 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-xs ${member.bg}`}
                    >
                      {member.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Online
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 block font-medium">Assigned Issues</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{assignedTasks.length}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 block font-medium">Completed</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">{completedCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
