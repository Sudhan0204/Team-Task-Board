import React, { useState } from 'react';
import {
  Kanban,
  List,
  Calendar,
  Filter,
  SlidersHorizontal,
  Search,
  ChevronDown,
  X,
  ArrowUpDown,
  Layers,
  Check,
} from 'lucide-react';
import { ViewMode, TaskPriority } from '../types';

interface BoardToolbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPriority: TaskPriority | 'all';
  setSelectedPriority: (p: TaskPriority | 'all') => void;
  selectedAssignee: string | 'all';
  setSelectedAssignee: (a: string | 'all') => void;
  sortBy: 'dueDate' | 'priority' | 'id' | 'title';
  setSortBy: (sort: 'dueDate' | 'priority' | 'id' | 'title') => void;
  groupBy: 'status' | 'priority' | 'assignee';
  setGroupBy: (group: 'status' | 'priority' | 'assignee') => void;
  onResetFilters: () => void;
}

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  selectedAssignee,
  setSelectedAssignee,
  sortBy,
  setSortBy,
  groupBy,
  setGroupBy,
  onResetFilters,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'dueDate':
        return 'Due Date';
      case 'priority':
        return 'Priority';
      case 'id':
        return 'Task ID';
      case 'title':
        return 'Title';
    }
  };

  const getGroupLabel = () => {
    switch (groupBy) {
      case 'status':
        return 'Status';
      case 'priority':
        return 'Priority';
      case 'assignee':
        return 'Assignee';
    }
  };

  const activeFiltersCount = (selectedPriority !== 'all' ? 1 : 0) + (selectedAssignee !== 'all' ? 1 : 0) + 1; // 2 base filters active as in image

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 space-y-3">
      {/* Upper toolbar row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: View Switchers + Filter/Sort/Group controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* View mode switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="size-3.5" />
              <span>Board</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="size-3.5" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="size-3.5" />
              <span>Timeline</span>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition cursor-pointer"
            >
              <Filter className="size-3.5 text-slate-500" />
              <span>Filter</span>
              <span className="size-4.5 rounded-full bg-[#4648d4] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            </button>

            {showFilterDropdown && (
              <div className="absolute top-9 left-0 z-50 w-60 rounded-xl bg-white border border-slate-200 shadow-xl p-3 text-xs space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value as any)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Assignee
                  </label>
                  <select
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#4648d4]"
                  >
                    <option value="all">All Members</option>
                    <option value="user-sarah">Sarah Connor (SC)</option>
                    <option value="user-dk">David Kim (DK)</option>
                    <option value="user-mv">Marcus Vance (MV)</option>
                    <option value="user-er">Elena Rostova (ER)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-[11px] text-[#4648d4] hover:underline"
                  >
                    Reset filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterDropdown(false)}
                    className="px-2.5 py-1 rounded-md bg-[#4648d4] text-white text-[11px] font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition cursor-pointer"
            >
              <ArrowUpDown className="size-3.5 text-slate-500" />
              <span>Sort: <strong>{getSortLabel()}</strong></span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {showSortDropdown && (
              <div className="absolute top-9 left-0 z-50 w-44 rounded-xl bg-white border border-slate-200 shadow-xl p-1 text-xs">
                {(['dueDate', 'priority', 'id', 'title'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSortBy(s);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition ${
                      sortBy === s ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="capitalize">{s === 'dueDate' ? 'Due Date' : s === 'id' ? 'Task ID' : s}</span>
                    {sortBy === s && <Check className="size-3 text-[#4648d4]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition cursor-pointer"
            >
              <Layers className="size-3.5 text-slate-500" />
              <span>Group: <strong>{getGroupLabel()}</strong></span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {showGroupDropdown && (
              <div className="absolute top-9 left-0 z-50 w-40 rounded-xl bg-white border border-slate-200 shadow-xl p-1 text-xs">
                {(['status', 'priority', 'assignee'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGroupBy(g);
                      setShowGroupDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition ${
                      groupBy === g ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="capitalize">{g}</span>
                    {groupBy === g && <Check className="size-3 text-[#4648d4]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Search Filter Input + Sliders Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tasks by key or keyword..."
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
            />
            <Search className="size-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            title="Toggle Filter View"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Active filters row matching image */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="font-bold text-[10px] tracking-wider uppercase text-slate-400">
          ACTIVE FILTERS:
        </span>

        {/* Filter Chip 1 */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <span>Assignee: {selectedAssignee === 'all' ? 'All Members' : selectedAssignee}</span>
          <button
            type="button"
            onClick={() => setSelectedAssignee('all')}
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="size-3" />
          </button>
        </span>

        {/* Filter Chip 2 */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <span>Sprint: Current</span>
          <button type="button" className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="size-3" />
          </button>
        </span>

        {selectedPriority !== 'all' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
            <span>Priority: {selectedPriority}</span>
            <button
              type="button"
              onClick={() => setSelectedPriority('all')}
              className="text-purple-400 hover:text-purple-700 cursor-pointer"
            >
              <X className="size-3" />
            </button>
          </span>
        )}

        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-medium text-[#4648d4] hover:underline ml-1 cursor-pointer"
        >
          Reset all
        </button>
      </div>
    </div>
  );
};
