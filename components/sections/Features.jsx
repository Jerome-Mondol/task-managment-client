// components/sections/Features.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant updates and smooth animations for a seamless experience.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays yours. End-to-end encryption by default.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share tasks and projects with your team members easily.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Clock,
    title: 'Smart Reminders',
    description: 'Never miss a deadline with intelligent notifications.',
    gradient: 'from-green-500 to-emerald-500'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950/50" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-indigo-500 mb-4 block">Features</span>
          <h2 className="text-4xl sm:text-5xl font-medium text-zinc-900 dark:text-zinc-100 mb-6">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Simple features that help you manage your tasks effectively, without the clutter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6 text-indigo-500" />
              </div>
              
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;