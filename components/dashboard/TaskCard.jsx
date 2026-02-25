// components/dashboard/TaskCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CheckCircle2, Calendar, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onStatusToggle, onEdit, onDelete, showActions, setShowActions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900';
      case 'in-progress':
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900';
      case 'completed':
        return 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900';
      default:
        return 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group p-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Status toggle */}
          <button
            onClick={() => onStatusToggle(task._id, task.status)}
            className="mt-1"
          >
            {task.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 hover:text-indigo-500 transition-colors" />
            )}
          </button>

          {/* Task content */}
          <div className="flex-1">
            <h3 className={`text-sm font-medium mb-1 ${
              task.status === 'completed' 
                ? 'line-through text-zinc-400 dark:text-zinc-600' 
                : 'text-zinc-900 dark:text-zinc-100'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}
            
            {/* Meta info */}
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                {task.status === 'pending' && 'Pending'}
                {task.status === 'in-progress' && 'In Progress'}
                {task.status === 'completed' && 'Completed'}
              </span>
              
              {task.dueDate && (
                <span className="flex items-center text-xs text-zinc-500 dark:text-zinc-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(task.dueDate)}
                </span>
              )}

              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                Created {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions menu */}
        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowActions(showActions === task._id ? null : task._id)}
            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <MoreHorizontal className="w-4 h-4 text-zinc-500" />
          </button>

          {showActions === task._id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-1 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden z-10"
            >
              <button
                onClick={() => onEdit(task)}
                className="w-full px-3 py-2 text-left text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center space-x-2"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;