// src/pages/SignupPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import SignupForm from "../components/Auth/SignupForm";
import { authService } from "../../services/api"; // Import authService

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (authService.isAuthenticated()) {
      const user = authService.getUser();
      if (user && user.role) {
        navigate(`/${user.role}`, { replace: true }); // Use replace to avoid adding signup to history
      }
    }

    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [navigate]); // Add navigate to dependency array

  const switchToLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <AuthLayout animate={animate} loading={loading}>
      <SignupForm switchToLogin={switchToLogin} />
    </AuthLayout>
  );
};

export default SignupPage;
