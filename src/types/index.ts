export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  bg: string;
  role?: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  author: Assignee;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  commentsCount: number;
  comments?: TaskComment[];
  attachmentsCount?: number;
  dueDate: string;
  isDueToday?: boolean;
  assignee: Assignee;
  subtasks?: Subtask[];
  completed?: boolean;
  projectId: string;
  sprintId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  color: string;
  activeSprint: string;
  version: string;
  description: string;
  dateRange: string;
  velocity: string;
  daysRemaining: number;
  membersCount: number;
}

export type ViewMode = 'board' | 'list' | 'timeline';

export type WorkspaceTab = 'overview' | 'my_tasks' | 'team_board' | 'projects' | 'members';
