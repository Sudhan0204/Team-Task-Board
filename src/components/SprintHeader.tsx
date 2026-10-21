import React from 'react';
import { Clock, TrendingUp, Calendar, Plus, Folder, Sparkles, UserPlus } from 'lucide-react';
import { Project } from '../types';

interface SprintHeaderProps {
  project: Project;
  onAddTask: () => void;
  onInviteMember: () => void;
}

export const SprintHeader: React.FC<SprintHeaderProps> = ({
  project,
  onAddTask,
  onInviteMember,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 pb-5 space-y-4">
      {/* 1. Sprint Info & Velocity Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-1 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
            {project.activeSprint}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">Q4 Product Redesign</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#4648d4] font-medium">
            Sprint Goal: Ship Auth &amp; Core Navigation
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="size-3.5 text-slate-400" />
            <span>Sprint ends in <strong className="text-slate-800">{project.daysRemaining} days</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <TrendingUp className="size-3.5 text-emerald-500" />
            <span>Velocity: <strong className="text-emerald-700 font-bold">{project.velocity}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Main Project Title & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Blue folder with star icon */}
          <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Folder className="size-6 text-white" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {project.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Active Sprint
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-500 bg-slate-100 border border-slate-200">
                {project.version}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right side: Team avatars stack, Date range, + Add Task C */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
          {/* Team Stack */}
          <div className="flex items-center -space-x-1.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Alex Morgan"
              className="size-7 rounded-full object-cover ring-2 ring-white shadow-2xs"
              referrerPolicy="no-referrer"
              title="Alex Morgan"
            />
            <div className="size-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs" title="Sarah Connor">
              SC
            </div>
            <div className="size-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs" title="David Kim">
              DK
            </div>
            <div className="size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs" title="Marcus Vance">
              MV
            </div>
            <div className="size-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-semibold ring-2 ring-white shadow-2xs">
              +4
            </div>
            <button
              type="button"
              onClick={onInviteMember}
              className="size-7 rounded-full border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center ring-2 ring-white transition cursor-pointer"
              title="Invite member"
            >
              <UserPlus className="size-3" />
            </button>
          </div>

          {/* Date range */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
            <Calendar className="size-3.5 text-slate-400" />
            <span>{project.dateRange}</span>
          </div>

          {/* + Add Task button with C shortcut */}
          <button
            type="button"
            onClick={onAddTask}
            className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition active:scale-[0.98] cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Add Task</span>
            <kbd className="hidden sm:inline-flex items-center justify-center size-4.5 rounded text-[10px] font-mono bg-white/20 text-white font-medium ml-0.5">
              C
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
