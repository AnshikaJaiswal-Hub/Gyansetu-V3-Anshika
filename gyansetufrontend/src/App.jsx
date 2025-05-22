import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentProfileForm from "./components/students/studentDashboard/StudentProfile/StudentProfileForm";

// Auth Pages
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ResetPasswordPage from "./pages/ResetPassword";

// Protected Routes Component
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Role-based Dashboard Pages
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import InstituteDashboard from "./pages/dashboards/InstituteDashboard";

// Teacher Features


//Student Features
import Layout from "./components/students/studentDashboard/Layout";
import ContentApp from "./components/students/Content/Content";
import StudentQuizInterface from "./components/students/Quizs/StudentQuizInterface";
import StudentCalendar from "./components/students/Calendar/StudentCalendar";

//Parent Features



// Auth Service
import authService from "./services/api/authService";
import MainChatbot from "./components/students/Chatbot/MainChatbot";

// StudentAuth component combines protection and layout
const StudentAuth = ({ children }) => {
  const user = authService.getCurrentUser();
  
  // If not logged in or not a student, redirect appropriately
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== "student") {
    // Redirect based on role
    switch (user.role) {
      case "teacher":
        return <Navigate to="/teacher" replace />;
      case "parent":
        return <Navigate to="/parent" replace />;
      case "institute":
        return <Navigate to="/institute" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  // User is authenticated and is a student, show children with layout
  return children;
};

// Wrapper component to handle location-based re-rendering
function AppContent() {
  const location = useLocation();

  // Helper function to redirect based on user role
  const RoleBasedRedirect = () => {
    const user = authService.getCurrentUser();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // Redirect to the appropriate dashboard based on user role
    switch (user.role) {
      case "student":
        return <Navigate to="/Studentdashboard" replace />;
      case "teacher":
        return <Navigate to="/teacher" replace />;
      case "parent":
        return <Navigate to="/Parentdashboard" replace />;
      case "institute":
        return <Navigate to="/institute" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Teacher Routes */}
    
        {/* Student Routes with Layout that works with the existing ProtectedRoute */}
        <Route
          element={
            <StudentAuth>
              <Layout />
            </StudentAuth>
          }
        >
          <Route path="/Studentdashboard/*" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfileForm />} />
          <Route path="/content" element={<ContentApp />} />
          <Route path="/quiz" element={<StudentQuizInterface />} />
          <Route path="/StudentCalendar" element={<StudentCalendar/>} />
        </Route>
        <Route path="/chatbot" element={<MainChatbot />} />

        {/* Parent Routes */}
       

        {/* Root path redirects based on user role */}
        <Route path="/" element={<RoleBasedRedirect />} />

        {/* Redirect any unknown routes to role-based dashboard or login */}
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;