import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MinimalAuthLayout from "../components/auth/AuthLayout";
import MinimalSignUp from "../components/auth/SignUp";
import { useAuth } from "../context/AuthContext";

// pages/SignUp.jsx
const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (name, email, password) => {
    setError("");
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/signin", { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "Sign up failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MinimalAuthLayout
      title="Sign up"
      subtitle="Create your account"
    >
      <MinimalSignUp onSignUp={handleSignUp} error={error} isLoading={isLoading} />
    </MinimalAuthLayout>
  );
};

export default SignUp;