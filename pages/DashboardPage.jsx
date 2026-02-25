// pages/Dashboard.jsx (Now clean and modular)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showActions, setShowActions] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' or 'edit'
    task: { title: '', description: '', status: 'pending', dueDate: '' }
  });

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filter !== 'all' && { status: filter }),
        ...(searchQuery && { search: searchQuery })
      });

      const response = await api.get(`/tasks?${params}`);
      setTasks(response.tasks || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setCurrentPage(1);
        fetchTasks();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch when filter or page changes
  useEffect(() => {
    fetchTasks();
  }, [filter, currentPage]);

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
      const response = await api.post('/tasks', modalState.task);
      setTasks([response, ...tasks]);
      setModalState({ isOpen: false, mode: 'create', task: { title: '', description: '', status: 'pending', dueDate: '' } });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/tasks/${modalState.task._id}`, modalState.task);
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
      const response = await api.put(`/tasks/${taskId}`, { status: nextStatus });
      setTasks(tasks.map(t => t._id === taskId ? response : t));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className={`pt-16 lg:ml-64 min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <WelcomeHeader user={user} />
          <StatsCards tasks={tasks} />
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
