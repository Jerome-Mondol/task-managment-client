// components/sections/Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950/50" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-xl text-zinc-900 dark:text-zinc-100">TaskFlow</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-md">
              The most elegant task management solution for modern teams.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Github className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </motion.a>
            </div>
          </div>
          
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'FAQ'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers'] },
            { title: 'Resources', links: ['Documentation', 'Support', 'Contact'] }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-600">
            © 2024 TaskFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-zinc-500 dark:text-zinc-600 hover:text-indigo-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-zinc-500 dark:text-zinc-600 hover:text-indigo-500 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-zinc-500 dark:text-zinc-600 hover:text-indigo-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;