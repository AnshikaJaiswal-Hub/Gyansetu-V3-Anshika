// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ResetPasswordPage from "./pages/ResetPassword";

// Protected Routes Component
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Role-based Dashboard Pages
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
//import ParentDashboard from "./pages/dashboards/ParentDashboard";
//import InstituteDashboard from "./pages/dashboards/InstituteDashboard";

// Auth Service
import { authService } from "../services/api";

function App() {
  // Helper function to redirect based on user role
  const RoleBasedRedirect = () => {
    const user = authService.getUser();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // Redirect to the appropriate dashboard based on user role
    switch (user.role) {
      case "student":
        return <Navigate to="/student" replace />;
      case "teacher":
        return <Navigate to="/teacher" replace />;
      case "parent":
        return <Navigate to="/parent" replace />;
      case "institute":
        return <Navigate to="/institute" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        Role-based Protected Routes
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/parent"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/institute"
          element={
            <ProtectedRoute>
              <InstituteDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* Root path redirects based on user role */}
        <Route path="/" element={<RoleBasedRedirect />} />
        {/* Redirect any unknown routes to role-based dashboard or login */}
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
