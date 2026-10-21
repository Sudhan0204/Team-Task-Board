import React, { useState, useEffect } from 'react';
import { initialProjects, initialTasks } from './data/initialData';
import { Project, Task, TaskPriority, TaskStatus, ViewMode, WorkspaceTab } from './types';
import { SignIn } from './components/SignIn';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';
import { TopNav } from './components/TopNav';
import { SprintHeader } from './components/SprintHeader';
import { BoardToolbar } from './components/BoardToolbar';
import { KanbanBoard } from './components/KanbanBoard';
import { ListView } from './components/ListView';
import { TimelineView } from './components/TimelineView';
import { OverviewView } from './components/OverviewView';
import { MembersView } from './components/MembersView';
import { TaskModal } from './components/TaskModal';
import { CreateTaskModal } from './components/CreateTaskModal';
import { CreateProjectModal } from './components/CreateProjectModal';
import { OmniSearchModal } from './components/OmniSearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { LayoutGrid, LogIn, Monitor } from 'lucide-react';

export default function App() {
  // Screen state: 'workspace' or 'signin'
  const [currentScreen, setCurrentScreen] = useState<'workspace' | 'signin'>('workspace');
  const [currentUserEmail, setCurrentUserEmail] = useState('alex@acme.corp');

  // Workspace Data
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-1');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // View & Nav State
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('team_board');
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'id' | 'title'>('dueDate');
  const [groupBy, setGroupBy] = useState<'status' | 'priority' | 'assignee'>('status');

  // Modals state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [createTaskColumn, setCreateTaskColumn] = useState<TaskStatus>('todo');
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isOmniSearchOpen, setIsOmniSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input/textarea
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOmniSearchOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'c' && !isCreateTaskOpen && currentScreen === 'workspace') {
        e.preventDefault();
        setCreateTaskColumn('todo');
        setIsCreateTaskOpen(true);
      } else if (e.key === '1' && currentScreen === 'workspace') {
        setViewMode('board');
      } else if (e.key === '2' && currentScreen === 'workspace') {
        setViewMode('list');
      } else if (e.key === '3' && currentScreen === 'workspace') {
        setViewMode('timeline');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreateTaskOpen, currentScreen]);

  // Task Mutations
  const handleCreateTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'commentsCount'>) => {
    const nextNum = tasks.length + 101;
    const newTask: Task = {
      ...newTaskData,
      id: `${currentProject.key}-${nextNum}`,
      createdAt: new Date().toISOString().split('T')[0],
      commentsCount: 0,
      comments: [],
    };
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTask(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleMoveTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              completed: newStatus === 'done',
            }
          : t
      )
    );
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
    setActiveProjectId(newProject.id);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPriority('all');
    setSelectedAssignee('all');
    setSortBy('dueDate');
  };

  // Filter & Sort tasks
  const projectTasks = tasks.filter((t) => {
    if (activeTab === 'my_tasks') {
      // Alex Morgan or DK tasks
      return t.assignee.initials === 'AM' || t.assignee.initials === 'DK';
    }
    return t.projectId === currentProject.id;
  });

  const filteredTasks = projectTasks
    .filter((task) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesId = task.id.toLowerCase().includes(q);
        const matchesTags = task.tags.some((tg) => tg.toLowerCase().includes(q));
        if (!matchesTitle && !matchesId && !matchesTags) return false;
      }
      // Priority
      if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;
      // Assignee
      if (selectedAssignee !== 'all' && task.assignee.id !== selectedAssignee) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder: Record<TaskPriority, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'id') {
        return a.id.localeCompare(b.id);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return a.dueDate.localeCompare(b.dueDate);
    });

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Quick Screen Switcher Pill in bottom-right corner for reviewing both requested screens */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-slate-700 text-xs">
        <button
          type="button"
          onClick={() => setCurrentScreen('signin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition cursor-pointer ${
            currentScreen === 'signin'
              ? 'bg-[#4648d4] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <LogIn className="size-3.5" />
          <span>Screen 1: Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('workspace')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition cursor-pointer ${
            currentScreen === 'workspace'
              ? 'bg-[#4648d4] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <LayoutGrid className="size-3.5" />
          <span>Screen 2: Team Board</span>
        </button>
      </div>

      {currentScreen === 'signin' ? (
        <SignIn
          onSuccess={(email) => {
            setCurrentUserEmail(email);
            setCurrentScreen('workspace');
          }}
        />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <WorkspaceSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            projects={projects}
            activeProjectId={activeProjectId}
            setActiveProjectId={setActiveProjectId}
            onOpenCreateTask={() => {
              setCreateTaskColumn('todo');
              setIsCreateTaskOpen(true);
            }}
            onOpenCreateProject={() => setIsCreateProjectOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onSignOut={() => setCurrentScreen('signin')}
            isMobileOpen={isMobileSidebarOpen}
            setIsMobileOpen={setIsMobileSidebarOpen}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Bar */}
            <TopNav
              currentProject={currentProject}
              projects={projects}
              onSelectProject={setActiveProjectId}
              activeTab={activeTab}
              onOpenCreateTask={() => {
                setCreateTaskColumn('todo');
                setIsCreateTaskOpen(true);
              }}
              onOpenOmniSearch={() => setIsOmniSearchOpen(true)}
              onToggleMobileMenu={() => setIsMobileSidebarOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              unreadCount={2}
            />

            {/* Content per tab */}
            {activeTab === 'team_board' || activeTab === 'my_tasks' ? (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Sprint Header */}
                <SprintHeader
                  project={currentProject}
                  onAddTask={() => {
                    setCreateTaskColumn('todo');
                    setIsCreateTaskOpen(true);
                  }}
                  onInviteMember={() => setActiveTab('members')}
                />

                {/* View Toolbar */}
                <BoardToolbar
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedPriority={selectedPriority}
                  setSelectedPriority={setSelectedPriority}
                  selectedAssignee={selectedAssignee}
                  setSelectedAssignee={setSelectedAssignee}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  groupBy={groupBy}
                  setGroupBy={setGroupBy}
                  onResetFilters={handleResetFilters}
                />

                {/* Dynamic View rendering */}
                {viewMode === 'board' && (
                  <KanbanBoard
                    tasks={filteredTasks}
                    onSelectTask={(task) => setSelectedTask(task)}
                    onAddTaskToColumn={(col) => {
                      setCreateTaskColumn(col);
                      setIsCreateTaskOpen(true);
                    }}
                    onMoveTaskStatus={handleMoveTaskStatus}
                  />
                )}

                {viewMode === 'list' && (
                  <ListView
                    tasks={filteredTasks}
                    onSelectTask={(task) => setSelectedTask(task)}
                    onMoveStatus={handleMoveTaskStatus}
                  />
                )}

                {viewMode === 'timeline' && (
                  <TimelineView
                    tasks={filteredTasks}
                    onSelectTask={(task) => setSelectedTask(task)}
                  />
                )}
              </div>
            ) : activeTab === 'overview' ? (
              <OverviewView
                project={currentProject}
                tasks={tasks}
                onSelectTask={(task) => setSelectedTask(task)}
              />
            ) : activeTab === 'members' ? (
              <MembersView
                tasks={tasks}
                onInviteMember={() => alert('Invite link copied to clipboard!')}
              />
            ) : activeTab === 'projects' ? (
              <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Projects Portfolio</h2>
                    <p className="text-xs text-slate-500">All engineering streams and active sprint versions</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreateProjectOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#4648d4] text-white text-xs font-semibold hover:bg-[#3b3dbb] transition"
                  >
                    + New Project
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveTab('team_board');
                      }}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: proj.color }} />
                          <h3 className="font-bold text-slate-900">{proj.name}</h3>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {proj.version}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{proj.description}</p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>{proj.activeSprint}</span>
                        <span className="text-emerald-600 font-semibold">{proj.velocity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <TaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreateTask={handleCreateTask}
        defaultStatus={createTaskColumn}
        projectId={currentProject.id}
      />

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <OmniSearchModal
        isOpen={isOmniSearchOpen}
        onClose={() => setIsOmniSearchOpen(false)}
        tasks={tasks}
        projects={projects}
        onSelectTask={(task) => setSelectedTask(task)}
        onSelectProject={setActiveProjectId}
        onChangeView={setViewMode}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
