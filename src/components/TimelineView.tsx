import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';

interface TimelineViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const dates = [
  'Oct 12', 'Oct 14', 'Oct 16', 'Oct 18 (Today)', 'Oct 20', 'Oct 22', 'Oct 24', 'Oct 26', 'Oct 28', 'Nov 02', 'Nov 10', 'Nov 18', 'Nov 28'
];

export const TimelineView: React.FC<TimelineViewProps> = ({ tasks, onSelectTask }) => {
  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#f8fafc]">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {/* Timeline header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-[#4648d4]" />
            <h3 className="text-sm font-bold text-slate-900">Sprint 24 Roadmap Timeline</h3>
            <span className="text-xs text-slate-500 font-mono">Oct 12 – Nov 28</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="size-2 rounded-full bg-emerald-500" /> Done
            </span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-[#4648d4] font-medium">
              <span className="size-2 rounded-full bg-[#4648d4]" /> In Progress
            </span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
              <span className="size-2 rounded-full bg-amber-500" /> To Do
            </span>
          </div>
        </div>

        {/* Timeline grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Date columns header */}
            <div className="grid grid-cols-13 border-b border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-500 py-2.5 px-4">
              {dates.map((d) => (
                <div
                  key={d}
                  className={`text-center font-medium ${
                    d.includes('Today') ? 'text-rose-600 font-bold bg-rose-50/80 rounded py-0.5' : ''
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Task rows */}
            <div className="divide-y divide-slate-100 p-2">
              {tasks.map((task, idx) => {
                // Approximate span based on task status
                let startCol = 1;
                let spanCols = 3;
                let barColor = 'bg-slate-400';

                if (task.status === 'done') {
                  startCol = 1 + (idx % 3);
                  spanCols = 2;
                  barColor = 'bg-emerald-500';
                } else if (task.status === 'in_progress') {
                  startCol = 3 + (idx % 2);
                  spanCols = 4;
                  barColor = 'bg-[#4648d4]';
                } else if (task.status === 'todo') {
                  startCol = 5 + (idx % 2);
                  spanCols = 3;
                  barColor = 'bg-amber-500';
                } else {
                  startCol = 7 + (idx % 3);
                  spanCols = 4;
                  barColor = 'bg-indigo-400';
                }

                return (
                  <div
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="grid grid-cols-13 py-2.5 px-4 items-center hover:bg-slate-50 transition rounded-lg cursor-pointer group"
                  >
                    <div className="col-span-3 pr-4 flex items-center gap-2 truncate">
                      <span className="font-mono text-xs font-semibold text-slate-500">{task.id}</span>
                      <span className="text-xs font-medium text-slate-900 group-hover:text-[#4648d4] transition truncate">
                        {task.title}
                      </span>
                    </div>

                    <div className="col-span-10 relative h-6 flex items-center">
                      {/* Gantt Bar */}
                      <div
                        className={`absolute h-5 rounded-md ${barColor} text-white text-[10px] font-medium px-2 flex items-center justify-between shadow-2xs group-hover:opacity-90 transition`}
                        style={{
                          left: `${((startCol - 1) / 10) * 100}%`,
                          width: `${(spanCols / 10) * 85}%`,
                        }}
                      >
                        <span className="truncate">{task.dueDate}</span>
                        {task.completed && <CheckCircle2 className="size-3 shrink-0 ml-1" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
