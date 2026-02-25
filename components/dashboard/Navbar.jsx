// components/dashboard/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Menu, Search, Plus, User, Settings, LogOut } from 'lucide-react';

const Navbar = ({ 
  user, 
  sidebarOpen, 
  setSidebarOpen, 
  showUserMenu, 
  setShowUserMenu,
  searchQuery,
  setSearchQuery,
  onNewTask,
  onSignOut 
}) => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 mr-2"
            >
              <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
            
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">TaskFlow</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks... (⌘K)"
                className="w-full pl-9 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onNewTask}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
            
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">{user?.email}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={onSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center space-x-2 border-t border-zinc-200 dark:border-zinc-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;