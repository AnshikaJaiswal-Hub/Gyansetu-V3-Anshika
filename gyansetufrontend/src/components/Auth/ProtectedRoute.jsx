// src/components/Auth/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../../services/api";
import LoadingOverlay from "./LoginOverlay";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        if (!authService.isAuthenticated()) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Get the current path to determine the required role
        const path = location.pathname;
        const requiredRole = path.split("/")[1]; // Extract role from path (e.g., /student -> student)

        // Validate token with backend
        const response = await authService.getCurrentUser();
        const userRole = response.user.role;

        setCurrentRole(userRole);
        setIsAuthenticated(true);

        // If user is trying to access a dashboard that doesn't match their role,
        // redirect them to their correct dashboard
        if (
          requiredRole !== userRole &&
          ["student", "teacher", "parent", "institute"].includes(requiredRole)
        ) {
          navigate(`/${userRole}`, { replace: true });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Handle invalid or expired token
        authService.logout();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
