import React, { useState, useCallback } from "react";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SignupOverlay from "./SignupOverlay";
import SimpleLoader from "./SimpleLoader";
import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/api/authService";

const SignupForm = ({ switchToLogin }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Dark theme colors to match TeacherDashboard and LoginForm
  const themeColors = {
    bgColor: "#231130",
    cardBg: "#341b47",
    primaryColor: "#8A2BE2",
    borderColor: "#c3abd6",
    buttonBg: "#341b47",
    buttonHover: "#4a1f67",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    errorColor: "#ff6b6b",
    successColor: "#4CAF50",
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const phoneNumberOnly = value.replace(countryCode, "");
      setFormData((prev) => ({ ...prev, phone: phoneNumberOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear errors when user starts typing again
      if (error) setError(null);
    }
  }, [countryCode, error]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const simulateProgress = () => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 90) clearInterval(interval);
    }, 300);
    return interval;
  };

  // Send OTP to the user's email
  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setQuickLoading(true);
    setError(null);

    try {
      // Send verification OTP
      await authService.preSignup(formData.email, formData.role);
      toast.success("Verification code sent to your email!");
      
      // Show OTP field
      setOtpSent(true);
      
      // Start resend timer (60 seconds)
      setResendDisabled(true);
      let timer = 60;
      setResendTimer(timer);
      
      const countdown = setInterval(() => {
        timer -= 1;
        setResendTimer(timer);
        
        if (timer <= 0) {
          clearInterval(countdown);
          setResendDisabled(false);
        }
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Failed to send verification code fill all fields first");
      setError(error.message || "Failed to send verification code fill all fields first");
    } finally {
      setQuickLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendDisabled) return;
    
    setQuickLoading(true);
    setError(null);

    try {
      // Resend verification OTP
      await authService.preSignup(formData.email, formData.role);
      toast.success("New verification code sent to your email!");
      
      // Start resend timer again
      setResendDisabled(true);
      let timer = 60;
      setResendTimer(timer);
      
      const countdown = setInterval(() => {
        timer -= 1;
        setResendTimer(timer);
        
        if (timer <= 0) {
          clearInterval(countdown);
          setResendDisabled(false);
        }
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Failed to resend verification code");
      setError(error.message || "Failed to resend verification code");
    } finally {
      setQuickLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }
    
    setQuickLoading(true);
    setError(null);
    
    try {
      // Verify OTP
      const response = await authService.verifyEmailOTP(formData.email, formData.otp);
      
      // Store verification token for signup
      setVerifiedToken(response.verified_token);
      
      // Mark as verified
      setOtpVerified(true);
      
      toast.success("Email verified successfully!");
    } catch (error) {
      toast.error(error.message || "Invalid verification code");
      setError(error.message || "Invalid verification code");
    } finally {
      setQuickLoading(false);
    }
  };

  // Handle final signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    // Verify that email is verified
    if (!otpVerified || !verifiedToken) {
      setError("Please verify your email before signup");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    const interval = simulateProgress();

    try {
      // Prepare data for API
      const signupData = {
        ...formData,
        phone: `${countryCode}${formData.phone}`,
      };

      // Complete registration
      const response = await authService.completeSignup(signupData, verifiedToken);
      clearInterval(interval);
      setProgress(100);
      toast.success("Signup successful! Please login to continue 🎉");
      
      // Clear form data
      setFormData({
        role: "student",
        email: "",
        password: "",
        phone: "",
        firstName: "",
        lastName: "",
        otp: ""
      });

      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      clearInterval(interval);
      toast.error(error.message || "Signup failed ❌");
      setError(error.message || "Signup failed");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!formData.role) {
      toast.error("Please select a role before signing up with Google");
      return;
    }

    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      // Create user data from Google profile
      const userData = {
        email: result.user.email,
        role: formData.role,
        googleToken: idToken,
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        phone: result.user.phoneNumber || ''
      };

      const response = await authService.googleLogin(userData);
      toast.success("Signup successful! 🎉");
      setTimeout(() => {
        navigate(`/${response.user.role}`);
      }, 500);
    } catch (error) {
      // Handle role mismatch
      if (error.response?.status === 403 && error.response?.data?.actualRole) {
        const actualRole = error.response.data.actualRole;
        toast.error(
          `This email is already registered as a ${actualRole}. Please select the correct role.`,
          { position: "top-center", autoClose: 5000 }
        );
      } else {
        toast.error(error.message || "Signup failed ❌");
        setError(error.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    toast.info("Apple login is coming soon");
  };

  return (
    <div 
      className="flex flex-col items-center text-center space-y-0 mt-0"
      style={{ backgroundColor: themeColors.bgColor }}
    >
      <ToastContainer position="top-right" autoClose={7000} />
      {loading && <SignupOverlay progress={progress} />}
      {quickLoading && <SimpleLoader />}

      <h1 
        className="font-primary font-secondary text-lg md:text-4xl font-thin mt-0"
        style={{ color: themeColors.textPrimary }}
      >
        Sign up account
      </h1>
      <p 
        className="hidden md:block md:mt-3 font-primary font-secondary md:text-xs font-montserrat mb-2"
        style={{ color: themeColors.textSecondary, marginBottom: 0 }}
      >
        Enter your personal data to create your account
      </p>

      <div className="h-6 mb-0">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex space-x-2 md:space-x-4 mt-1 mb-1 md:my-0">
        <button
          className="text-white px-3 md:px-4 py-1 md:py-2 rounded-[15px] border transition-colors cursor-pointer flex items-center justify-center hover:bg-[#4a1f67]"
          style={{
            backgroundColor: themeColors.buttonBg,
            borderColor: themeColors.borderColor,
          }}
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="text-xs md:text-lg bg-transparent" />
        </button>
        <button
          className="text-white px-3 md:px-4 py-1 md:py-2 rounded-[15px] border transition-colors cursor-pointer flex items-center justify-center hover:bg-[#4a1f67]"
          style={{
            backgroundColor: themeColors.buttonBg,
            borderColor: themeColors.borderColor,
          }}
          onClick={handleAppleLogin}
        >
          <FaApple className="text-xs md:text-lg bg-transparent" />
        </button>
      </div>

      <div className="flex items-center justify-center my-2 md:my-4 w-full">
        <div className="h-px w-48" style={{ backgroundColor: themeColors.borderColor }}></div>
        <span className="px-2" style={{ color: themeColors.textSecondary }}>or</span>
        <div className="h-px w-48" style={{ backgroundColor: themeColors.borderColor }}></div>
      </div>

      <form className="w-full max-w-2xl space-y-4 pb-8" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full flex-1 border rounded-[24px] px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            style={{
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.borderColor,
              color: themeColors.textPrimary,
            }}
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full flex-1 border rounded-[24px] px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            style={{
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.borderColor,
              color: themeColors.textPrimary,
            }}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full h-12 border rounded-[24px] px-4 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] appearance-none cursor-pointer"
          style={{
            backgroundColor: themeColors.cardBg,
            borderColor: themeColors.borderColor,
            color: themeColors.textPrimary,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%23c3abd6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1.5rem",
          }}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="institute">Institution</option>
          <option value="parent">Parent</option>
        </select>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border rounded-[24px] px-4 h-12 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            style={{
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.borderColor,
              color: themeColors.textPrimary,
            }}
            value={formData.email}
            onChange={handleChange}
            disabled={otpVerified}
          />
          {otpVerified ? (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-sm bg-green-900/30 px-2 py-1 rounded-full">
              Verified ✓
            </span>
          ) : (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={resendDisabled}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-full text-xs ${
                resendDisabled
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-[#4a1f67] text-white hover:bg-[#5b3a64]"
              }`}
            >
              {resendDisabled
                ? `Resend in ${resendTimer}s`
                : otpSent
                ? "Resend OTP"
                : "Send OTP"}
            </button>
          )}
        </div>
        <div className="flex items-center border rounded-[24px] px-4 h-12 focus-within:ring-2 focus-within:ring-[#8A2BE2]"
          style={{
            backgroundColor: themeColors.cardBg,
            borderColor: themeColors.borderColor,
          }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border-none focus:outline-none cursor-pointer mr-2 bg-transparent"
            style={{
              color: themeColors.textPrimary,
            }}
          >
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+81">🇯🇵 +81</option>
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="w-full focus:outline-none bg-transparent"
            style={{
              color: themeColors.textPrimary,
            }}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {otpSent && !otpVerified && (
          <div className="relative">
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit verification code"
              className="w-full h-12 border rounded-[24px] px-4 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
              style={{
                backgroundColor: themeColors.cardBg,
                borderColor: themeColors.borderColor,
                color: themeColors.textPrimary,
              }}
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-green-900/30 text-green-400 hover:bg-green-900/50 rounded-full text-xs"
            >
              Verify
            </button>
          </div>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="w-full h-12 border rounded-[24px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            style={{
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.borderColor,
              color: themeColors.textPrimary,
            }}
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            style={{ color: themeColors.textSecondary }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className={`font-primary font-secondary w-full h-12 text-white transition-colors mt-2 rounded-[24px] ${
            otpVerified
              ? "hover:bg-[#341b47] cursor-pointer"
              : "bg-purple-400 cursor-not-allowed"
          }`}
          style={{
            backgroundColor: otpVerified ? themeColors.buttonBg : undefined,
          }}
          disabled={!otpVerified}
        >
          {loading ? "Signing up..." : "Sign up →"}
        </button>
        <div className="login-foot text-xs" style={{ color: themeColors.textSecondary }}>
          <span className="mr-2 font-primary font-secondary">
            Already have an account?
          </span>
          <button
            onClick={switchToLogin}
            className="text-white mt-3 md:mt-0 font-primary font-secondary cursor-pointer px-2 py-1 rounded-[8px] text-[0.85rem] border transition-colors hover:bg-[#4a1f67]"
            style={{
              backgroundColor: themeColors.buttonBg,
              borderColor: themeColors.borderColor,
            }}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;