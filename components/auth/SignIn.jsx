// components/auth/MinimalSignIn.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // or 'next/link' if using Next.js

const MinimalSignIn = ({ onSignIn, error, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn(email, password);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-indigo-500 text-sm text-zinc-900 dark:text-zinc-100 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-indigo-500 text-sm text-zinc-900 dark:text-zinc-100 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-500 focus:ring-indigo-500/20"
            />
            <span className="text-zinc-600 dark:text-zinc-400">Remember me</span>
          </label>
          
          <Link 
            to="/forgot-password"
            className="text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" aria-live="polite">
            {error}
          </p>
        ) : null}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </motion.button>
      </form>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-6">
        Don't have an account?{' '}
        <Link 
          to="/signup"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default MinimalSignIn;