// components/sections/DashboardPreview.tsx
import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20"
    >
      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse" />
      
      <div className="relative rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-2xl bg-white/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="h-12 bg-gradient-to-r from-zinc-100/80 to-white/80 dark:from-zinc-900/80 dark:to-black/80 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </div>
        <img 
          src="/api/placeholder/1200/600" 
          alt="Dashboard Preview"
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default DashboardPreview;