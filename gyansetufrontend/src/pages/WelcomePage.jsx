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

  // Violet theme colors to match existing UI
  const themeColors = {
    primaryColor: "#8A2BE2",
    textPrimary: "#4B0082",
    textSecondary: "#663399",
    buttonBg: "#9370DB",
    buttonHover: "#7B68EE",
    borderColor: "#4B0082", // Darker purple for border
  };

  return (
    <AuthLayout animate={animate} loading={false}>
      <div
        className="flex flex-col items-center justify-center h-full text-center px-6 py-8 space-y-8 rounded-lg"
        style={{
          background:
            "linear-gradient(to bottom right,rgb(208, 158, 255), white,rgb(242, 229, 255))",
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
          style={{ color: themeColors.textPrimary }}
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
            border: "3px solid #4B0082", // Darker purple, thicker border
            color: "#4B0082", // Start with purple text
            background: "transparent", // Start with transparent background
            backgroundImage:
              "linear-gradient(to left, transparent 50%, #9370DB 50%)", // The fill animation
            backgroundSize: "200% 100%",
            backgroundPosition: "right bottom",
            transition: "all 0.3s ease-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundPosition = "left bottom"; // Move background position to show color
            e.currentTarget.style.color = "white"; // Change text to white on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundPosition = "right bottom"; // Reset position
            e.currentTarget.style.color = "#4B0082"; // Reset text color
          }}
        >
          <span>GET STARTED</span>
        </button>
      </div>
    </AuthLayout>
  );
};

export default WelcomePage;
