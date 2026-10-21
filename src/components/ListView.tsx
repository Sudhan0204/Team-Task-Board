import React from 'react';
import { CheckCircle2, MessageSquare, Paperclip, Calendar } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface ListViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onMoveStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const ListView: React.FC<ListViewProps> = ({ tasks, onSelectTask }) => {
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'backlog':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">Backlog</span>;
      case 'todo':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">To Do</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">In Progress</span>;
      case 'done':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Done</span>;
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent':
        return <span className="text-rose-600 font-semibold text-xs">• Urgent</span>;
      case 'high':
        return <span className="text-amber-600 font-semibold text-xs">• High</span>;
      case 'medium':
        return <span className="text-blue-600 font-semibold text-xs">• Medium</span>;
      case 'low':
        return <span className="text-slate-500 font-medium text-xs">• Low</span>;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#f8fafc]">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Key</th>
                <th className="py-3 px-4">Title &amp; Tags</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Subtasks</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {tasks.map((task) => {
                const completedSub = task.subtasks ? task.subtasks.filter((s) => s.completed).length : 0;
                const totalSub = task.subtasks ? task.subtasks.length : 0;

                return (
                  <tr
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Key */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {task.status === 'done' && <CheckCircle2 className="size-3.5 text-emerald-500" />}
                        <span className={task.status === 'in_progress' ? 'text-[#4648d4]' : ''}>
                          {task.id}
                        </span>
                      </div>
                    </td>

                    {/* Title & Tags */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-[#4648d4] transition-colors">
                        {task.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(task.status)}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getPriorityBadge(task.priority)}
                    </td>

                    {/* Subtasks */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-600">
                      {totalSub > 0 ? (
                        <div className="flex items-center gap-2">
                          <span>{completedSub}/{totalSub}</span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#4648d4] rounded-full"
                              style={{ width: `${Math.round((completedSub / totalSub) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono">
                      <span className={task.isDueToday ? 'text-rose-600 font-semibold' : 'text-slate-600'}>
                        {task.dueDate}
                      </span>
                    </td>

                    {/* Assignee */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <span className="text-slate-700 font-medium hidden sm:inline">
                          {task.assignee.name}
                        </span>
                        {task.assignee.avatar ? (
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="size-6 rounded-full object-cover ring-1 ring-slate-200"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            className={`size-6 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${task.assignee.bg}`}
                          >
                            {task.assignee.initials}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
