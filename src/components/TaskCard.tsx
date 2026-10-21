import React from 'react';
import {
  MessageSquare,
  Paperclip,
  Calendar,
  CheckCircle2,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onMoveStatus?: (newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onMoveStatus }) => {
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-200/60">
            <span className="size-1.5 rounded-full bg-rose-500" />
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200/60">
            <span className="size-1.5 rounded-full bg-amber-500" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200/60">
            <span className="size-1.5 rounded-full bg-blue-500" />
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
            <span className="size-1.5 rounded-full bg-slate-400" />
            Low
          </span>
        );
    }
  };

  const completedSubtasks = task.subtasks ? task.subtasks.filter((s) => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="group relative bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-md hover:border-[#4648d4]/40 transition-all duration-150 cursor-pointer select-none"
    >
      {/* Top row: ID + Priority badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          {task.status === 'done' ? (
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
          ) : null}
          <span
            className={`font-mono text-xs font-semibold ${
              task.status === 'in_progress' ? 'text-[#4648d4]' : 'text-slate-500'
            }`}
          >
            {task.id}
          </span>
        </div>
        {getPriorityBadge(task.priority)}
      </div>

      {/* Task Title */}
      <h3
        className={`text-sm font-semibold leading-snug mb-2.5 ${
          task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-900 group-hover:text-[#4648d4] transition-colors'
        }`}
      >
        {task.title}
      </h3>

      {/* Tag pills */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Subtasks Progress Bar (like DEV-107 in image) */}
      {totalSubtasks > 0 && (
        <div className="mb-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mb-1.5">
            <span>Sub-tasks completed</span>
            <span className="font-mono font-semibold text-slate-800">
              {completedSubtasks} / {totalSubtasks} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progressPercent === 100 ? 'bg-emerald-500' : 'bg-[#4648d4]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer row: Comments, Attachments, Due Date, Assignee Avatar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {/* Comments count */}
          {task.commentsCount > 0 && (
            <div className="flex items-center gap-1" title={`${task.commentsCount} comments`}>
              <MessageSquare className="size-3.5 text-slate-400" />
              <span className="font-mono text-[11px]">{task.commentsCount}</span>
            </div>
          )}

          {/* Attachments count */}
          {task.attachmentsCount && task.attachmentsCount > 0 ? (
            <div className="flex items-center gap-1" title={`${task.attachmentsCount} attachments`}>
              <Paperclip className="size-3.5 text-slate-400" />
              <span className="font-mono text-[11px]">{task.attachmentsCount}</span>
            </div>
          ) : null}

          {/* Due date */}
          <div
            className={`flex items-center gap-1 font-mono text-[11px] ${
              task.isDueToday
                ? 'text-rose-600 font-semibold'
                : task.status === 'done'
                ? 'text-emerald-600'
                : 'text-slate-500'
            }`}
          >
            {task.status === 'done' ? (
              <Check className="size-3 text-emerald-500" />
            ) : (
              <Calendar className="size-3 text-slate-400" />
            )}
            <span>{task.dueDate}</span>
          </div>
        </div>

        {/* Assignee Avatar */}
        <div className="shrink-0" title={task.assignee.name}>
          {task.assignee.avatar ? (
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className="size-6 rounded-full object-cover ring-2 ring-white shadow-2xs"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className={`size-6 rounded-full text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs ${task.assignee.bg}`}
            >
              {task.assignee.initials}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
