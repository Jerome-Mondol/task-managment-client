// components/dashboard/TaskFilters.jsx
import React from 'react';

const TaskFilters = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center space-x-2 mb-6">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filter === f.value
              ? 'bg-indigo-500 text-white'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;