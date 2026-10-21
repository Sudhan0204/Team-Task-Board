import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Flame,
  ArrowUpRight,
  GitCommit,
} from 'lucide-react';
import { Project, Task } from '../types';

interface OverviewViewProps {
  project: Project;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ project, tasks, onSelectTask }) => {
  const doneTasks = tasks.filter((t) => t.status === 'done');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const backlogTasks = tasks.filter((t) => t.status === 'backlog');

  const completionRate = Math.round((doneTasks.length / (tasks.length || 1)) * 100);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8fafc] space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Sprint Progress</span>
            <Zap className="size-4 text-[#4648d4]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{completionRate}%</div>
          <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#4648d4] rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-mono">
            {doneTasks.length} of {tasks.length} issues shipped
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Sprint Velocity</span>
            <TrendingUp className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">{project.velocity}</div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight className="size-3" />
            <span>+8% compared to Sprint 23</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Days Remaining</span>
            <Clock className="size-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{project.daysRemaining} days</div>
          <div className="mt-2 text-[11px] text-slate-500 font-mono">Sprint ends Nov 28</div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Workstream</span>
            <Flame className="size-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{inProgressTasks.length} in flight</div>
          <div className="mt-2 text-[11px] text-slate-500 font-mono">
            {todoTasks.length} queued in To Do
          </div>
        </div>
      </div>

      {/* Main Grid: Status Distribution & Recent High Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sprint Burndown / Status Overview */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Sprint 24 Work Distribution</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-500">Backlog</div>
              <div className="text-xl font-bold font-mono text-slate-700 mt-1">{backlogTasks.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="text-xs text-blue-600">To Do</div>
              <div className="text-xl font-bold font-mono text-blue-700 mt-1">{todoTasks.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <div className="text-xs text-[#4648d4]">In Progress</div>
              <div className="text-xl font-bold font-mono text-[#4648d4] mt-1">{inProgressTasks.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="text-xs text-emerald-600">Done</div>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{doneTasks.length}</div>
            </div>
          </div>

          <div className="pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              High Priority &amp; Urgent Issues
            </h4>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.priority === 'urgent' || t.priority === 'high')
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-xs font-semibold text-[#4648d4]">
                        {task.id}
                      </span>
                      <span className="text-xs font-medium text-slate-800 truncate">
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          task.priority === 'urgent'
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Feed */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Recent Engineering Activity</h3>
          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="size-7 rounded-full bg-indigo-50 text-[#4648d4] flex items-center justify-center shrink-0 mt-0.5">
                <GitCommit className="size-4" />
              </div>
              <div>
                <p className="text-slate-700">
                  <strong className="text-slate-900">David Kim</strong> pushed commit <code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">feat/crdt-sync</code>
                </p>
                <span className="text-[10px] text-slate-400 font-mono">12 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="size-4" />
              </div>
              <div>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Marcus Vance</strong> completed <strong className="text-slate-900">DEV-112</strong>
                </p>
                <span className="text-[10px] text-slate-400 font-mono">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="size-4" />
              </div>
              <div>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Sarah Connor</strong> updated design tokens on <strong className="text-slate-900">DEV-101</strong>
                </p>
                <span className="text-[10px] text-slate-400 font-mono">2 hours ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="size-4" />
              </div>
              <div>
                <p className="text-slate-700">
                  Sprint 24 velocity checkpoint verified at 92% on track
                </p>
                <span className="text-[10px] text-slate-400 font-mono">Today at 09:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
