// pages/Dashboard.jsx (Now clean and modular)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatsCards from '../components/dashboard/StatsCards';
import TaskFilters from '../components/dashboard/TaskFilters';
import TaskList from '../components/dashboard/TaskList';
import Pagination from '../components/dashboard/Pagination';
import TaskModal from '../components/dashboard/TaskModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [showActions, setShowActions] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' or 'edit'
    task: { title: '', description: '', status: 'pending', dueDate: '' }
  });

  // Fetch tasks
  const fetchTasks = async (pageOverride, searchOverride) => {
    setLoading(true);
    try {
      const pageToUse = pageOverride ?? currentPage;
      const searchToUse = searchOverride ?? debouncedSearch;
      const response = await getTasks(pageToUse, 10, filter, searchToUse);
      setTasks(response.tasks || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalItems(response.pagination?.totalItems || 0);
      if (response.stats) {
        setStatusCounts({
          total: response.stats.total || 0,
          pending: response.stats.pending || 0,
          inProgress: response.stats.inProgress || 0,
          completed: response.stats.completed || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearch(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch when filter, page, or search changes
  useEffect(() => {
    fetchTasks();
  }, [filter, currentPage, debouncedSearch]);

  // Handlers
  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...modalState.task,
        title: modalState.task.title.trim(),
        description: modalState.task.description.trim()
      };

      await createTask(payload);
      setCurrentPage(1);
      setSearchQuery('');
      setDebouncedSearch('');
      await fetchTasks(1, '');
      setModalState({ isOpen: false, mode: 'create', task: { title: '', description: '', status: 'pending', dueDate: '' } });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(modalState.task._id, modalState.task);
      setTasks(tasks.map(t => t._id === modalState.task._id ? response : t));
      setModalState({ isOpen: false, mode: 'create', task: { title: '', description: '', status: 'pending', dueDate: '' } });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleStatusToggle = async (taskId, currentStatus) => {
    const nextStatus = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    }[currentStatus];

    try {
      const response = await updateTask(taskId, { status: nextStatus });
      setTasks(tasks.map(t => t._id === taskId ? response : t));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
      setShowActions(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      task: { ...task }
    });
    setShowActions(null);
  };

  const handleSidebarSelect = (value) => {
    setActiveTab(value);
    if (value === 'dashboard') {
      setFilter('all');
    } else if (value === 'pending' || value === 'completed' || value === 'in-progress') {
      setFilter(value);
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewTask={() => setModalState({ ...modalState, isOpen: true, mode: 'create', task: { title: '', description: '', status: 'pending', dueDate: '' } })}
        onSignOut={handleSignOut}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        tasks={tasks}
        counts={statusCounts}
        activeTab={activeTab}
        onSelect={handleSidebarSelect}
      />

      <main className={`pt-16 lg:ml-64 min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <WelcomeHeader user={user} />
          <StatsCards tasks={tasks} totalCount={totalItems} counts={statusCounts} />
          <TaskFilters filter={filter} setFilter={setFilter} />
          
          <TaskList
            tasks={tasks}
            loading={loading}
            searchQuery={searchQuery}
            onStatusToggle={handleStatusToggle}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            showActions={showActions}
            setShowActions={setShowActions}
            onNewTask={() => setModalState({ ...modalState, isOpen: true, mode: 'create', task: { title: '', description: '', status: 'pending', dueDate: '' } })}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <TaskModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onSubmit={modalState.mode === 'create' ? handleCreateTask : handleUpdateTask}
        task={modalState.task}
        setTask={(task) => setModalState({ ...modalState, task })}
        mode={modalState.mode}
      />
    </div>
  );
};

export default Dashboard;
