// components/auth/MinimalAuthLayout.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const MinimalAuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex">
      {/* Simple left side - just logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 dark:bg-zinc-900/50 items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle2 className="w-8 h-8 text-indigo-500" />
            <span className="font-semibold text-2xl text-zinc-900 dark:text-zinc-100">TaskFlow</span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
            Simple, minimal, and elegant task management.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              {subtitle}
            </p>
          </div>
          
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default MinimalAuthLayout;