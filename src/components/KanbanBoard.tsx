import React, { useState } from 'react';
import { Plus, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onAddTaskToColumn: (status: TaskStatus) => void;
  onMoveTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

interface ColumnConfig {
  id: TaskStatus;
  title: string;
  dotColor: string;
  addBtnText: string;
}

const columns: ColumnConfig[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    dotColor: 'bg-slate-400',
    addBtnText: 'Add issue to Backlog',
  },
  {
    id: 'todo',
    title: 'To Do',
    dotColor: 'bg-blue-500',
    addBtnText: 'Add issue to To Do',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    dotColor: 'bg-[#4648d4]',
    addBtnText: 'Add issue to In Progress',
  },
  {
    id: 'done',
    title: 'Done',
    dotColor: 'bg-emerald-500',
    addBtnText: 'Add completed task',
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onSelectTask,
  onAddTaskToColumn,
  onMoveTaskStatus,
}) => {
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);

  const handleDragOver = (e: React.DragEvent, colId: TaskStatus) => {
    e.preventDefault();
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, colId: TaskStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onMoveTaskStatus(taskId, colId);
    }
  };

  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6 bg-[#f8fafc]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 min-w-[300px] xl:min-w-[1100px]">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          const isDraggingOver = dragOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col rounded-2xl bg-slate-100/70 border ${
                isDraggingOver ? 'border-[#4648d4] ring-2 ring-[#4648d4]/15 bg-indigo-50/30' : 'border-slate-200/70'
              } p-3 sm:p-3.5 transition-colors`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.dotColor}`} />
                  <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                    {col.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-200/80 text-slate-700">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => onAddTaskToColumn(col.id)}
                    className="p-1 rounded hover:bg-slate-200 hover:text-slate-800 transition cursor-pointer"
                    title={`Add task to ${col.title}`}
                  >
                    <Plus className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-slate-200 hover:text-slate-800 transition cursor-pointer"
                    title="Column settings"
                  >
                    <MoreHorizontal className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Task Cards Stack */}
              <div className="space-y-3 flex-1 min-h-[140px]">
                {colTasks.length === 0 ? (
                  <div className="h-28 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-xs text-slate-400 gap-1.5 p-4 text-center">
                    <span>No tasks in {col.title}</span>
                    <button
                      type="button"
                      onClick={() => onAddTaskToColumn(col.id)}
                      className="text-[#4648d4] hover:underline font-medium"
                    >
                      + Create issue
                    </button>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onSelectTask(task)}
                      onMoveStatus={(newStatus) => onMoveTaskStatus(task.id, newStatus)}
                    />
                  ))
                )}
              </div>

              {/* Add issue button at bottom of column */}
              <button
                type="button"
                onClick={() => onAddTaskToColumn(col.id)}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition border border-transparent hover:border-slate-300/60 cursor-pointer"
              >
                <Plus className="size-3.5 text-slate-500" />
                <span>{col.addBtnText}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
