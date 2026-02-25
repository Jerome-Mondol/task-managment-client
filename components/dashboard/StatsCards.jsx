// components/dashboard/StatsCards.jsx
import React from 'react';
import { ListTodo, Inbox, Clock, CheckCheck } from 'lucide-react';

const StatsCards = ({ tasks }) => {
  const stats = [
    { icon: ListTodo, label: 'Total Tasks', value: tasks.length, color: 'indigo' },
    { icon: Inbox, label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'orange' },
    { icon: Clock, label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'blue' },
    { icon: CheckCheck, label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'green' },
  ];

  const colorClasses = {
    indigo: 'text-indigo-500',
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-zinc-500 dark:text-zinc-500">{stat.label}</h3>
            <stat.icon className={`w-4 h-4 ${colorClasses[stat.color]}`} />
          </div>
          <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;