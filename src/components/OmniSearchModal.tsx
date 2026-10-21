import React, { useState, useEffect } from 'react';
import { Search, X, Kanban, List, Calendar, ArrowRight, Folder } from 'lucide-react';
import { Project, Task, ViewMode } from '../types';

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  projects: Project[];
  onSelectTask: (task: Task) => void;
  onSelectProject: (id: string) => void;
  onChangeView: (mode: ViewMode) => void;
}

export const OmniSearchModal: React.FC<OmniSearchModalProps> = ({
  isOpen,
  onClose,
  tasks,
  projects,
  onSelectTask,
  onSelectProject,
  onChangeView,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs pt-20 p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 px-4">
          <Search className="size-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a task key, title, project, or command..."
            className="w-full h-14 pl-3 pr-8 text-sm focus:outline-none placeholder:text-slate-400"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 text-xs space-y-3">
          {/* Quick Views navigation */}
          {!query && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Navigation &amp; Views
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onChangeView('board');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Kanban className="size-4 text-[#4648d4]" />
                    <span className="font-medium">Switch to Kanban Board</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">View 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeView('list');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <List className="size-4 text-[#4648d4]" />
                    <span className="font-medium">Switch to List Table View</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">View 2</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeView('timeline');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#4648d4]" />
                    <span className="font-medium">Switch to Sprint Timeline</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">View 3</span>
                </button>
              </div>
            </div>
          )}

          {/* Filtered Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Projects ({filteredProjects.length})
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(proj.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: proj.color }} />
                      <span className="font-medium">{proj.name}</span>
                      <span className="text-[11px] font-mono text-slate-400">({proj.activeSprint})</span>
                    </div>
                    <ArrowRight className="size-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Tasks */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tasks ({filteredTasks.length})
            </div>
            {filteredTasks.length === 0 ? (
              <div className="p-4 text-center text-slate-400 italic">No matching tasks found</div>
            ) : (
              <div className="space-y-1">
                {filteredTasks.slice(0, 8).map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => {
                      onSelectTask(task);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-indigo-50/60 text-slate-800 cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-semibold text-[#4648d4] group-hover:underline">
                        {task.id}
                      </span>
                      <span className="font-medium truncate">{task.title}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                      {task.status.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Press ESC to exit</span>
          <span>DEVFLOW OMNI</span>
        </div>
      </div>
    </div>
  );
};
