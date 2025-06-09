// src/pages/WelcomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  // Dark theme colors to match TeacherDashboard
  const themeColors = {
    primaryColor: "#5b3a64",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    buttonBg: "#341b47",
    buttonHover: "#4a1f63",
    borderColor: "#8A2BE2",
  };

  return (
    <AuthLayout animate={animate} loading={false}>
      <div
        className="flex flex-col items-center justify-center h-full text-center px-6 py-8 space-y-8 rounded-lg"
        style={{
          background: "linear-gradient(to bottom right, #100e10, #5b3a64, #2a0c2e)",
        }}
      >
        {/* Logo - Using image from public folder */}
        <div className="mb-2">
          <img
            src="/gyansetu-logo.png"
            alt="Gyansetu Logo"
            className="h-20 mx-auto"
            onError={(e) => {
              console.error("Logo failed to load");
              setLogoError(true);
            }}
          />
          {logoError && (
            <p className="text-red-500 text-xs mt-1">
              Logo image not found. Place logo file in public folder as
              "gyansetu-logo.png"
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="font-primary text-sm md:text-base max-w-md"
          style={{ color: themeColors.textSecondary }}
        >
          Welcome to the future of learning! Our AI-based Learning Management
          System (LMS) revolutionizes the way you learn, providing personalized
          and adaptive educational experiences tailored to your individual
          needs. Harness the power of artificial intelligence to make learning
          more efficient, engaging, and effective.
        </p>

        {/* Get Started Button - With Fill Effect Animation */}
        <button
          onClick={handleGetStarted}
          className="w-full md:w-2/3 h-12 font-bold cursor-pointer rounded-full flex items-center justify-center uppercase tracking-wide relative overflow-hidden"
          style={{
            border: "3px solid #c3abd6",
            color: "#ffffff",
            background: "transparent",
            backgroundImage: "linear-gradient(to left, transparent 50%, #231130 50%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "right bottom",
            transition: "all 0.3s ease-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundPosition = "left bottom";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundPosition = "right bottom";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <span>GET STARTED</span>
        </button>
      </div>
    </AuthLayout>
  );
};

export default WelcomePage;
