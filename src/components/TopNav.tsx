import React, { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  Menu,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Project, WorkspaceTab } from '../types';

interface TopNavProps {
  currentProject: Project;
  projects: Project[];
  onSelectProject: (id: string) => void;
  activeTab: WorkspaceTab;
  onOpenCreateTask: () => void;
  onOpenOmniSearch: () => void;
  onToggleMobileMenu: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentProject,
  projects,
  onSelectProject,
  activeTab,
  onOpenCreateTask,
  onOpenOmniSearch,
  onToggleMobileMenu,
  onOpenNotifications,
  unreadCount = 3,
}) => {
  const [showProjectPicker, setShowProjectPicker] = useState(false);

  const getTabLabel = (tab: WorkspaceTab) => {
    switch (tab) {
      case 'overview':
        return 'Overview';
      case 'my_tasks':
        return 'My Tasks';
      case 'team_board':
        return 'Team Board';
      case 'projects':
        return 'Projects';
      case 'members':
        return 'Members';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-slate-200 shadow-2xs">
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap min-w-0">
          <span className="hover:text-slate-900 transition cursor-pointer">Projects</span>
          <ChevronRight className="size-3.5 text-slate-400 shrink-0" />

          {/* Project dropdown in breadcrumb */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProjectPicker(!showProjectPicker)}
              className="flex items-center gap-1 font-semibold text-slate-900 hover:text-[#4648d4] transition px-1.5 py-0.5 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentProject.name}</span>
              <ChevronDown className="size-3.5 text-slate-500 shrink-0" />
            </button>

            {showProjectPicker && (
              <div className="absolute top-8 left-0 z-50 w-56 rounded-xl bg-white border border-slate-200 shadow-xl p-1 text-xs">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400">
                  Switch Active Project
                </div>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(p.id);
                      setShowProjectPicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition ${
                      currentProject.id === p.id
                        ? 'bg-[#4648d4]/10 text-[#4648d4] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span>{p.name}</span>
                    </div>
                    {currentProject.id === p.id && <Check className="size-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ChevronRight className="size-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-medium truncate">{getTabLabel(activeTab)}</span>
        </nav>
      </div>

      {/* Right: Search, Notifications, Avatars, Create Task */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Global Omni-Search Bar */}
        <button
          type="button"
          onClick={onOpenOmniSearch}
          className="flex items-center gap-2.5 h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs sm:w-64 md:w-72 transition cursor-pointer border border-transparent focus:border-[#4648d4]"
        >
          <Search className="size-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-left flex-1 hidden sm:inline">Search tasks, projects, or peop...</span>
          <span className="truncate text-left flex-1 sm:hidden">Search...</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px] font-medium bg-white text-slate-500 shadow-2xs border border-slate-200">
            Ctrl+K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            title="Notifications"
          >
            <Bell className="size-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>
        </div>

        {/* Team Avatar Stack */}
        <div className="hidden md:flex items-center -space-x-1.5">
          <div className="size-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
            JD
          </div>
          <div className="size-7 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
            SK
          </div>
          <div className="size-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-semibold ring-2 ring-white">
            +4
          </div>
        </div>

        {/* Primary Action Button: + Create Task */}
        <button
          type="button"
          onClick={onOpenCreateTask}
          className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <Plus className="size-4" />
          <span>Create Task</span>
        </button>
      </div>
    </header>
  );
};
