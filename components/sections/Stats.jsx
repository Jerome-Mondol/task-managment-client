// components/sections/Stats.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Active Users' },
  { icon: CheckCircle2, value: '1M+', label: 'Tasks Completed' },
  { icon: Clock, value: '99.9%', label: 'Uptime' },
  { icon: Award, value: '4.9/5', label: 'User Rating' }
];

const Stats = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 mb-4">
                <stat.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="text-3xl font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;