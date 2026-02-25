// pages/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MinimalSignIn from '../components/auth/SignIn';
import MinimalAuthLayout from '../components/auth/AuthLayout';
import api from '../services/api';


const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (email, password) => {
    setError('');
    setIsLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      navigate('/dashboard');
    } catch (err) {
      const message = err?.response?.data?.message || 'Sign in failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MinimalAuthLayout
      title="Sign in"
      subtitle="Welcome back"
    >
      <MinimalSignIn onSignIn={handleSignIn} error={error} isLoading={isLoading} />
    </MinimalAuthLayout>
  );
};

export default SignIn;