import React, { useState } from 'react';
import { X, Plus, Calendar, User, Tag, AlertCircle } from 'lucide-react';
import { Assignee, Task, TaskPriority, TaskStatus } from '../types';
import { teamMembers } from '../data/initialData';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (newTask: Omit<Task, 'id' | 'createdAt' | 'commentsCount'>) => void;
  defaultStatus?: TaskStatus;
  projectId: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreateTask,
  defaultStatus = 'todo',
  projectId,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>(teamMembers[0].id);
  const [dueDate, setDueDate] = useState('Oct 28');
  const [tagInput, setTagInput] = useState('Frontend');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const selectedAssignee = teamMembers.find((m) => m.id === assigneeId) || teamMembers[0];
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onCreateTask({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assignee: selectedAssignee,
      dueDate,
      tags: tags.length > 0 ? tags : ['General'],
      projectId,
      sprintId: 'SPRINT-24',
      subtasks: [],
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-base font-bold text-slate-900">Create New Task</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1" htmlFor="taskTitle">
              Task Title *
            </label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Implement real-time notifications engine"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1" htmlFor="taskDesc">
              Description (optional)
            </label>
            <textarea
              id="taskDesc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide technical context, constraints, and acceptance criteria..."
              className="w-full p-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Column Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.initials})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1" htmlFor="taskDue">
                Due Date
              </label>
              <input
                id="taskDue"
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. Oct 28"
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1" htmlFor="taskTags">
              Tags (comma separated)
            </label>
            <input
              id="taskTags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Frontend, Components, API"
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-semibold shadow-xs transition cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
