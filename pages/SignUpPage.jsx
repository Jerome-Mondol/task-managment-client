import MinimalAuthLayout from "../components/auth/AuthLayout";
import MinimalSignUp from "../components/auth/SignUp";

// pages/SignUp.jsx
const SignUp = () => {
  const handleSignUp = (name, email, password) => {
    console.log('Sign up:', { name, email, password });
    // Add your sign up logic here
  };

  return (
    <MinimalAuthLayout
      title="Sign up"
      subtitle="Create your account"
    >
      <MinimalSignUp onSignUp={handleSignUp} />
    </MinimalAuthLayout>
  );
};

export default SignUp;