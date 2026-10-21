import React, { useState } from 'react';
import { X, Plus, Folder, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

const colorOptions = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#06b6d4', // cyan
];

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [key, setKey] = useState('ENG');
  const [color, setColor] = useState(colorOptions[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      key: key.toUpperCase().trim() || 'PROJ',
      color,
      activeSprint: 'SPRINT-01',
      version: 'v1.0.0',
      description: description.trim() || 'Engineering project track and shipping stream.',
      dateRange: 'Oct 21 – Dec 15',
      velocity: '94% on track',
      daysRemaining: 21,
      membersCount: 4,
    };

    onCreateProject(newProject);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-base font-bold text-slate-900">Create New Project</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1" htmlFor="projName">
              Project Name *
            </label>
            <input
              id="projName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!key || key === 'ENG') {
                  const autoKey = e.target.value.substring(0, 3).toUpperCase();
                  if (autoKey) setKey(autoKey);
                }
              }}
              placeholder="e.g. Design Systems v2"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#4648d4]"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1" htmlFor="projKey">
                Project Key
              </label>
              <input
                id="projKey"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                placeholder="ENG"
                maxLength={5}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#4648d4]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Color Accent
              </label>
              <div className="flex items-center gap-2 pt-1.5">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`size-6 rounded-full transition cursor-pointer ${
                      color === c ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1" htmlFor="projDesc">
              Summary &amp; Sprint Goal
            </label>
            <textarea
              id="projDesc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of deliverables..."
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
            />
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
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-semibold shadow-xs"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
