// components/auth/MinimalSignUp.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // or 'next/link' if using Next.js

const MinimalSignUp = ({ onSignUp, error, isLoading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUp) {
      onSignUp(name, email, password);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="text-white w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-indigo-500 text-sm transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            required
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="text-white w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-indigo-500 text-sm transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-white w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-indigo-500 text-sm transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            required
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
            Minimum 8 characters
          </p>
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
          {isLoading ? 'Creating account...' : 'Create account'}
        </motion.button>
      </form>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-6">
        Already have an account?{' '}
        <Link 
          to="/signin"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default MinimalSignUp;