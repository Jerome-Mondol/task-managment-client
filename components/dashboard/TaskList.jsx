// components/dashboard/TaskList.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskList = ({ 
  tasks, 
  loading, 
  searchQuery,
  onStatusToggle, 
  onEdit, 
  onDelete,
  showActions,
  setShowActions,
  onNewTask 
}) => {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-600 dark:text-zinc-400">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl mb-4">
          <AlertCircle className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
          No tasks found
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          {searchQuery 
            ? "No tasks match your search criteria" 
            : "Get started by creating your first task"}
        </p>
        <button
          onClick={onNewTask}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create your first task</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusToggle={onStatusToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
            setShowActions={setShowActions}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;