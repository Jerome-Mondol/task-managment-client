// components/sections/Testimonials.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    content: 'TaskFlow has completely transformed how our team manages projects. The minimalist design helps us focus on what really matters.',
    avatar: 'SJ',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'The clean interface and smooth animations make it a joy to use. Best task management tool I have ever used.',
    avatar: 'MC',
    rating: 5
  },
  {
    name: 'Emma Davis',
    role: 'Designer',
    content: 'Finally, a tool that understands minimalism. It is beautiful, fast, and does exactly what I need.',
    avatar: 'ED',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">
            Loved by teams everywhere
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Join thousands of satisfied users who have simplified their workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;