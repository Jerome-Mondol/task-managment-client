// pages/SignIn.jsx
import React from 'react';
import MinimalSignIn from '../components/auth/SignIn';
import MinimalAuthLayout from '../components/auth/AuthLayout';


const SignIn = () => {
  const handleSignIn = (email, password) => {
    console.log('Sign in:', { email, password });
    // Add your sign in logic here
  };

  return (
    <MinimalAuthLayout
      title="Sign in"
      subtitle="Welcome back"
    >
      <MinimalSignIn onSignIn={handleSignIn} />
    </MinimalAuthLayout>
  );
};

export default SignIn;