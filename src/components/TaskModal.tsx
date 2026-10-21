import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Plus,
  Trash2,
  Tag,
  Clock,
  User,
  Paperclip,
  Send,
  Sparkles,
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';
import { teamMembers } from '../data/initialData';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  onClose,
  onUpdateTask,
  onDeleteTask,
}) => {
  if (!task) return null;

  const [commentText, setCommentText] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const toggleSubtask = (subtaskId: string) => {
    if (!task.subtasks) return;
    const updatedSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSt = {
      id: `st-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    const currentList = task.subtasks || [];
    onUpdateTask({ ...task, subtasks: [...currentList, newSt] });
    setNewSubtaskTitle('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: teamMembers[0], // Alex Morgan
      text: commentText.trim(),
      createdAt: 'Just now',
    };
    const existing = task.comments || [];
    onUpdateTask({
      ...task,
      comments: [newComment, ...existing],
      commentsCount: task.commentsCount + 1,
    });
    setCommentText('');
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || task.tags.includes(newTag.trim())) return;
    onUpdateTask({ ...task, tags: [...task.tags, newTag.trim()] });
    setNewTag('');
    setShowTagInput(false);
  };

  const completedSubtasks = task.subtasks ? task.subtasks.filter((s) => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#4648d4] bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              {task.id}
            </span>

            {/* Status Select */}
            <select
              value={task.status}
              onChange={(e) =>
                onUpdateTask({ ...task, status: e.target.value as TaskStatus })
              }
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-white shadow-2xs focus:outline-none focus:border-[#4648d4]"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Priority Select */}
            <select
              value={task.priority}
              onChange={(e) =>
                onUpdateTask({ ...task, priority: e.target.value as TaskPriority })
              }
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-white shadow-2xs focus:outline-none focus:border-[#4648d4]"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Delete this task?')) {
                  onDeleteTask(task.id);
                  onClose();
                }
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Delete task"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {task.title}
            </h2>
            {task.description && (
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
            <div>
              <span className="text-slate-400 font-medium block mb-1 flex items-center gap-1">
                <User className="size-3.5" /> Assignee
              </span>
              <div className="flex items-center gap-2">
                {task.assignee.avatar ? (
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="size-5 rounded-full object-cover"
                  />
                ) : (
                  <div className={`size-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${task.assignee.bg}`}>
                    {task.assignee.initials}
                  </div>
                )}
                <span className="font-semibold text-slate-800">{task.assignee.name}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1 flex items-center gap-1">
                <Calendar className="size-3.5" /> Due Date
              </span>
              <span className={`font-mono font-semibold ${task.isDueToday ? 'text-rose-600' : 'text-slate-800'}`}>
                {task.dueDate}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1 flex items-center gap-1">
                <Clock className="size-3.5" /> Sprint
              </span>
              <span className="font-mono text-slate-800 font-medium">
                {task.sprintId}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag className="size-3.5" /> Tags
              </span>
              <button
                type="button"
                onClick={() => setShowTagInput(!showTagInput)}
                className="text-xs text-[#4648d4] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Plus className="size-3" /> Add tag
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
              {showTagInput && (
                <form onSubmit={handleAddTag} className="inline-flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="New tag..."
                    className="h-7 px-2 text-xs rounded-md border border-[#4648d4] focus:outline-none"
                    autoFocus
                  />
                </form>
              )}
            </div>
          </div>

          {/* Subtasks Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" /> Sub-tasks
              </span>
              {totalSubtasks > 0 && (
                <span className="text-xs font-mono font-semibold text-slate-700">
                  {completedSubtasks} of {totalSubtasks} completed ({progressPercent}%)
                </span>
              )}
            </div>

            {totalSubtasks > 0 && (
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    progressPercent === 100 ? 'bg-emerald-500' : 'bg-[#4648d4]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            <div className="space-y-1.5">
              {task.subtasks?.map((st) => (
                <label
                  key={st.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer select-none group border border-transparent hover:border-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => toggleSubtask(st.id)}
                    className="size-4 rounded border-slate-300 text-[#4648d4] focus:ring-[#4648d4]/20 accent-[#4648d4] cursor-pointer"
                  />
                  <span
                    className={`text-xs ${
                      st.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {st.title}
                  </span>
                </label>
              ))}
            </div>

            {/* Add Subtask input */}
            <form onSubmit={handleAddSubtask} className="mt-2.5 flex gap-2">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Add new subtask item..."
                className="flex-1 h-8 px-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#4648d4]"
              />
              <button
                type="submit"
                className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

          {/* Comments Section */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <MessageSquare className="size-3.5" /> Comments ({task.commentsCount})
            </span>

            {/* Add Comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment or update..."
                className="flex-1 h-9 px-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#4648d4]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="h-9 px-3 rounded-lg bg-[#4648d4] text-white text-xs font-semibold hover:bg-[#3b3dbb] disabled:opacity-50 transition cursor-pointer flex items-center gap-1"
              >
                <Send className="size-3" />
                <span>Post</span>
              </button>
            </form>

            {/* Discussion history */}
            <div className="space-y-3">
              {task.comments && task.comments.length > 0 ? (
                task.comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">{c.author.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{c.createdAt}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic">
                  No comments yet. Start the conversation above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
