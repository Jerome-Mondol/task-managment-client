// components/dashboard/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, ListTodo, Inbox, CheckCheck } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, tasks, activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', value: 'dashboard', count: tasks.length },
    { icon: ListTodo, label: 'All Tasks', value: 'all', count: tasks.length },
    { icon: Inbox, label: 'Pending', value: 'pending', count: tasks.filter(t => t.status === 'pending').length },
    { icon: CheckCheck, label: 'Completed', value: 'completed', count: tasks.filter(t => t.status === 'completed').length },
  ];

  return (
    <>
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 z-20 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.value
                    ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === item.value
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;