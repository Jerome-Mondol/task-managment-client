// components/dashboard/WelcomeHeader.jsx
import React from 'react';

const WelcomeHeader = ({ user }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
        Here's what's happening with your tasks today.
      </p>
    </div>
  );
};

export default WelcomeHeader;