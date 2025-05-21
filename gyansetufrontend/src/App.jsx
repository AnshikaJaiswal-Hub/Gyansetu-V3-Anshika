// Updated App.js with Welcome Page routing and global dark theme
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentAssignmentInterface from "./components/students/Assignment/StudentAssignment";
import NotesApp from "./components/students/notes/NotesApp";
import ContentApp from "./components/students/Content/Content";

// Auth Pages
import WelcomePage from "./pages/WelcomePage"; // Import the new welcome page
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ResetPasswordPage from "./pages/ResetPassword";

// Protected Routes Component
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Role-based Dashboard Pages
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import InstituteDashboard from "./pages/dashboards/InstituteDashboard";

// Teacher Features
import AssignmentPage from "./components/teacher/Assignments/createAssignment/AssignmentPage";
import AIGenerate from "./components/teacher/Assignments/generateAssignment/AIAssistantantIntegration";
import TeacherMainCalender from "./components/teacher/calender/MainCalenderTeacher";
import TeacherContent from "./components/teacher/contentUploading/TeacherContent";
import CompleteProfilePage from "./components/teacher/profile/CompleteProfilePage";

// Auth Service
import authService from "./services/api/authService";
import MainChatbot from "./components/students/Chatbot/MainChatbot";

// Import theme styles
import "./darkTheme.css";

// ThemeWrapper component to apply theme class to body
const ThemeWrapper = ({ children }) => {
  const { darkMode } = useTheme();

  useEffect(() => {
    // Apply or remove dark-theme class to the body based on darkMode state
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return <>{children}</>;
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
        return <Navigate to="/parent" replace />;
      case "institute":
        return <Navigate to="/institute" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <>
      <ThemeProvider>
        <ThemeWrapper>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            theme="colored" // Makes toasts follow the theme
          />
          <Routes>
            {/* Welcome Page - Initial Landing Page */}
            <Route
              path="/"
              element={
                authService.isAuthenticated() ? (
                  <RoleBasedRedirect />
                ) : (
                  <WelcomePage />
                )
              }
            />

            {/* Public Routes */}
            <Route
              path="/login"
              element={
                authService.isAuthenticated() ? (
                  <RoleBasedRedirect />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/signup"
              element={
                authService.isAuthenticated() ? (
                  <RoleBasedRedirect />
                ) : (
                  <SignupPage />
                )
              }
            />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Teacher Routes */}
            <Route
              key={location.pathname}
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/create-assignment"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <AssignmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/generate-assignment"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <AIGenerate />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/analytics"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/calendar"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherMainCalender />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/content"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherContent />
                </ProtectedRoute>
              }
            />
            <Route
              key={location.pathname}
              path="/teacher/profile"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <CompleteProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/Studentdashboard*"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <NotesApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <MainChatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/StudentAssignment"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentAssignmentInterface />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <ContentApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cal"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <TeacherMainCalender />
                </ProtectedRoute>
              }
            />

            <Route
              path="/parent/*"
              element={
                <ProtectedRoute allowedRoles={["parent"]}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/institute/*"
              element={
                <ProtectedRoute allowedRoles={["institute"]}>
                  <InstituteDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect any unknown routes to welcome page or role-based dashboard */}
            <Route
              path="*"
              element={
                authService.isAuthenticated() ? (
                  <RoleBasedRedirect />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </ThemeWrapper>
      </ThemeProvider>
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
