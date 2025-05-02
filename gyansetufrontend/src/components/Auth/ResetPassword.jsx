// src/components/Auth copy/ForgotPassword.jsx
import React, { useState, useCallback } from "react";
import { FaArrowLeft, FaEnvelope, FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginOverlay from "./LoginOverlay";

const ForgotPassword = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [emailError, setEmailError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Violet theme colors (same as LoginForm for consistency)
  const themeColors = {
    bgColor: "#F8F5FF",
    cardBg: "#F0E6FF",
    primaryColor: "#8A2BE2",
    borderColor: "#D1C2F0",
    buttonBg: "#9370DB",
    buttonHover: "#7B68EE",
    textPrimary: "#4B0082",
    textSecondary: "#663399",
    errorColor: "#FF3333", // Bright red for errors
    successColor: "#00C853", // Green for success
  };

  const handleChange = useCallback(
    (e) => {
      setEmail(e.target.value);
      // Clear email error when user starts typing again
      if (emailError) setEmailError(null);
    },
    [emailError]
  );

  const simulateProgress = () => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 90) clearInterval(interval);
    }, 300);
    return interval;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setEmailError(null);
    setProgress(0);

    const interval = simulateProgress();

    try {
      // Mock API call - replace with your actual API endpoint
      const response = await fetch(
        "https://auth-service-tfl3.onrender.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset email");
      }

      toast.success("Password reset link sent to your email 🎉");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.message || "Request failed");
      setEmailError("Failed to send reset link. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="flex flex-col items-center text-center h-full overflow-y-auto px-6">
      <ToastContainer position="top-right" autoClose={7000} />
      {loading && <LoginOverlay progress={progress} />}

      {/* Back button */}
      <div className="self-start mt-4">
        <button
          onClick={switchToLogin}
          className="flex items-center space-x-2 text-sm"
          style={{ color: themeColors.textSecondary }}
        >
          <FaArrowLeft /> <span>Back to Login</span>
        </button>
      </div>

      {/* Top Badge */}
      <h1
        className="font-primary text-4xl font-thin mt-6"
        style={{ color: themeColors.primaryColor }}
      >
        Forgot Password
      </h1>

      {!submitted ? (
        <>
          <p
            className="font-primary text-base mb-6"
            style={{ color: themeColors.textPrimary }}
          >
            Enter your email to receive a password reset link
          </p>

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-12 border rounded-full px-4 pl-12 focus:outline-none"
                  style={{
                    backgroundColor: themeColors.cardBg,
                    borderColor: emailError
                      ? themeColors.errorColor
                      : themeColors.borderColor,
                    color: themeColors.textPrimary,
                  }}
                  onChange={handleChange}
                  value={email}
                />
                <div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: themeColors.textSecondary }}
                >
                  <FaEnvelope size={18} />
                </div>
              </div>

              {/* Error message container with red styling */}
              <div style={{ height: "20px", marginTop: "4px" }}>
                {emailError && (
                  <p
                    className="text-sm font-semibold text-left"
                    style={{
                      color: themeColors.errorColor,
                    }}
                  >
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-white cursor-pointer transition-colors rounded-full border"
              style={{
                backgroundColor: themeColors.buttonBg,
                borderColor: themeColors.borderColor,
              }}
            >
              Reset Password →
            </button>
          </form>
        </>
      ) : (
        <div className="mt-6 w-full">
          <div
            className="flex flex-col items-center justify-center p-6 rounded-lg border"
            style={{
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.borderColor,
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: themeColors.primaryColor }}
            >
              <FaCheck size={24} color="white" />
            </div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: themeColors.textPrimary }}
            >
              Check Your Email
            </h2>
            <p
              className="text-center mb-6"
              style={{ color: themeColors.textSecondary }}
            >
              We've sent a password reset link to:
              <br />
              <span className="font-semibold">{email}</span>
            </p>
            <p
              className="text-sm text-center mb-4"
              style={{ color: themeColors.textSecondary }}
            >
              Don't see it? Check your spam folder or make sure the email is
              correct.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full h-12 cursor-pointer transition-colors rounded-full border"
              style={{
                backgroundColor: themeColors.cardBg,
                borderColor: themeColors.borderColor,
                color: themeColors.textPrimary,
              }}
            >
              Try another email
            </button>
          </div>

          <button
            onClick={switchToLogin}
            className="w-full h-12 text-white cursor-pointer transition-colors rounded-full border mt-4"
            style={{
              backgroundColor: themeColors.buttonBg,
              borderColor: themeColors.borderColor,
            }}
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
