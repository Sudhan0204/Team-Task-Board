import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  FolderKanban,
  Users,
  Plus,
  Settings,
  HelpCircle,
  MoreVertical,
  ChevronsUpDown,
  LogOut,
  Keyboard,
  UserCheck,
  X,
} from 'lucide-react';
import { Project, WorkspaceTab } from '../types';

interface WorkspaceSidebarProps {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  projects: Project[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  onOpenCreateTask: () => void;
  onOpenCreateProject: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onSignOut: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  activeTab,
  setActiveTab,
  projects,
  activeProjectId,
  setActiveProjectId,
  onOpenCreateProject,
  onOpenSettings,
  onOpenHelp,
  onSignOut,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [currentOrg, setCurrentOrg] = useState('Acme Tech');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const orgs = ['Acme Tech', 'Stripe Dev', 'Linear Systems', 'Vercel Labs'];

  const workspaceNavItems = [
    { id: 'overview' as WorkspaceTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'my_tasks' as WorkspaceTab, label: 'My Tasks', icon: CheckSquare, badge: 12 },
    { id: 'team_board' as WorkspaceTab, label: 'Team Board', icon: Kanban },
    { id: 'projects' as WorkspaceTab, label: 'Projects', icon: FolderKanban },
    { id: 'members' as WorkspaceTab, label: 'Members', icon: Users },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col justify-between bg-[#131a29] text-[#94a3b8] border-r border-[#222b40] transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand & Workspace Org Switcher */}
        <div>
          <div className="relative p-4 border-b border-[#222b40]/80">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex items-center gap-3 w-full p-1.5 rounded-lg hover:bg-[#1c2438] transition text-left cursor-pointer group"
              >
                <div className="size-8 rounded-lg bg-[#4648d4] text-white flex items-center justify-center shadow-inner shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
                    DevFlow
                  </div>
                  <div className="text-xs text-[#94a3b8] truncate font-medium">{currentOrg}</div>
                </div>
                <ChevronsUpDown className="size-4 text-[#64748b] group-hover:text-white shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Org Switcher Menu */}
            {showOrgDropdown && (
              <div className="absolute top-16 left-4 right-4 z-50 rounded-xl bg-[#1c2438] border border-[#2e3a54] p-1.5 shadow-2xl text-xs">
                <div className="px-2.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#64748b]">
                  Switch Workspace
                </div>
                {orgs.map((org) => (
                  <button
                    key={org}
                    type="button"
                    onClick={() => {
                      setCurrentOrg(org);
                      setShowOrgDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition ${
                      currentOrg === org ? 'bg-[#4648d4] text-white font-semibold' : 'text-[#cbd5e1] hover:bg-[#25304a]'
                    }`}
                  >
                    <span>{org}</span>
                    {currentOrg === org && <UserCheck className="size-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section: WORKSPACE */}
          <div className="px-3 pt-4">
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
              WORKSPACE
            </div>
            <nav className="space-y-1">
              {workspaceNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-[#4648d4] text-white shadow-sm font-semibold'
                        : 'text-[#94a3b8] hover:bg-[#1a2235] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4.5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#1e293b] text-[#cbd5e1] border border-[#2b384e]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Section: PROJECTS */}
          <div className="px-3 pt-6">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
                PROJECTS
              </span>
              <button
                type="button"
                onClick={onOpenCreateProject}
                className="p-1 rounded hover:bg-[#1e293b] text-[#64748b] hover:text-white transition cursor-pointer"
                title="Create Project"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              {projects.map((proj) => {
                const isSelected = activeProjectId === proj.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setActiveTab('team_board');
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#1d263b] text-white border border-[#2d3a57]'
                        : 'text-[#94a3b8] hover:bg-[#1a2235] hover:text-white'
                    }`}
                  >
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: proj.color }}
                    />
                    <span className="truncate">{proj.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Settings, Help & User Profile */}
        <div className="p-3 border-t border-[#222b40]/80 space-y-1">
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#94a3b8] hover:bg-[#1a2235] hover:text-white transition cursor-pointer"
          >
            <Settings className="size-4.5" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={onOpenHelp}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#94a3b8] hover:bg-[#1a2235] hover:text-white transition cursor-pointer"
          >
            <HelpCircle className="size-4.5" />
            <span>Help &amp; Support</span>
          </button>

          {/* User Profile Footer Card */}
          <div className="relative pt-2">
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-between p-2 rounded-xl bg-[#182033] border border-[#25324c] hover:border-[#38496e] transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative size-8 rounded-full overflow-hidden bg-indigo-700 ring-2 ring-[#4648d4]/40 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Alex Morgan"
                    className="size-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-xs font-semibold text-white truncate">Alex Morgan</div>
                  <div className="text-[11px] text-[#94a3b8] truncate">Project Manager</div>
                </div>
              </div>
              <MoreVertical className="size-4 text-[#64748b] hover:text-white shrink-0" />
            </div>

            {/* User Context Menu */}
            {showUserMenu && (
              <div className="absolute bottom-16 left-0 right-0 z-50 rounded-xl bg-[#1c2438] border border-[#2e3a54] p-1.5 shadow-2xl text-xs">
                <div className="px-2.5 py-1.5 text-[11px] text-[#cbd5e1] border-b border-[#29364f] mb-1">
                  Signed in as <strong className="text-white">alex@acme.corp</strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#cbd5e1] hover:bg-[#25304a] text-left"
                >
                  <Settings className="size-3.5" />
                  <span>Profile Settings</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenHelp();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#cbd5e1] hover:bg-[#25304a] text-left"
                >
                  <Keyboard className="size-3.5" />
                  <span>Keyboard Shortcuts</span>
                </button>
                <div className="my-1 border-t border-[#29364f]" />
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-left font-medium"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out to Login Page</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
