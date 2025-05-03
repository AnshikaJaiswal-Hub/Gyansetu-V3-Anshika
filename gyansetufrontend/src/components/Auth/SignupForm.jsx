import React, { useState, useCallback } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import SignupOverlay from "./SignupOverlay";
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
    lastName: ""
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: `${countryCode}${value}` }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, [countryCode]);

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

    // Validate required fields
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    const interval = simulateProgress();

    try {
      const response = await authService.signup(formData);
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
        lastName: ""
      });

      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      clearInterval(interval);
      toast.error(error.message || "Signup failed ❌");
      setError(error.message);
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

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      // Create user data from Google profile
      const userData = {
        email: result.user.email,
        role: formData.role,
        firstName: result.user.displayName?.split(' ')[0] || '',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        phone: result.user.phoneNumber || ''
      };

      const response = await authService.signup(userData);
      toast.success("Signup successful! 🎉");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      toast.error(error.message || "Signup failed ❌");
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-0 mt-0">
      <ToastContainer position="top-right" autoClose={7000} />
      {loading && <SignupOverlay progress={progress} />}

      <h1 className="font-primary font-secondary text-lg md:text-4xl font-thin mt-2 text-purple-900">
        Sign up account
      </h1>
      <p className="hidden md:block md:mt-3 font-primary font-secondary text-purple-700 md:text-xs font-montserrat mb-2">
        Enter your personal data to create your account
      </p>

      <div className="h-6 mb-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex space-x-2 md:space-x-4 my-3 mb-1 md:my-0">
        <button
          className="text-white px-3 md:px-4 py-1 md:py-2 rounded-[15px] border border-purple-300 transition-colors cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: "#9f7aea" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#805ad5";
            e.target.style.cursor = "pointer";
          }}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#9f7aea")}
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="text-xs md:text-lg bg-transparent" />
        </button>
        <button
          className="text-white px-3 md:px-4 py-1 md:py-2 rounded-[15px] border border-purple-300 transition-colors cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: "#9f7aea" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#805ad5";
            e.target.style.cursor = "pointer";
          }}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#9f7aea")}
        >
          <FaApple className="text-xs md:text-lg bg-transparent" />
        </button>
      </div>

      <div className="flex items-center justify-center my-2 md:my-4 w-full">
        <div className="h-px bg-purple-300 w-48"></div>
        <span className="px-2 text-purple-600">or</span>
        <div className="h-px bg-purple-300 w-48"></div>
      </div>

      <form className="w-80 space-y-4" onSubmit={handleSubmit}>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full h-12 bg-purple-50 text-purple-900 border border-purple-300 rounded-[24px] px-4 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b46c1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
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

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full h-12 bg-purple-50 text-purple-900 border border-purple-300 rounded-[24px] px-4 focus:outline-none focus:border-purple-500"
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full h-12 bg-purple-50 text-purple-900 border border-purple-300 rounded-[24px] px-4 focus:outline-none focus:border-purple-500"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full h-12 bg-purple-50 text-purple-900 border border-purple-300 rounded-[24px] px-4 focus:outline-none focus:border-purple-500"
          onChange={handleChange}
        />

        <div className="flex items-center w-full h-12 bg-purple-50 text-purple-900 border border-purple-300 rounded-[24px] px-4 focus-within:border-purple-500">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-purple-50 text-purple-900 border-none focus:outline-none cursor-pointer mr-2"
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
            className="w-full bg-purple-50 text-purple-900 focus:outline-none"
            onChange={handleChange}
          />
        </div>

        <PasswordInput handleChange={handleChange} />

        <button
          type="submit"
          className="font-primary font-secondary w-full h-12 bg-purple-800 text-white hover:bg-purple-600 transition-colors mt-6 rounded-[24px] hover:cursor-pointer"
        >
          {loading ? "Signing up..." : "Sign up →"}
        </button>
      </form>

      <div className="login-foot mt-8 text-xs text-purple-700">
        <span className="mr-2 font-primary font-secondary">
          Already have an account?
        </span>
        <button
          onClick={switchToLogin}
          className="text-white mt-3 md:mt-0 font-primary font-secondary cursor-pointer px-2 py-1 rounded-[8px] text-[0.85rem] border border-purple-300 transition-colors cursor-pointer bg-purple-600"
          style={{
            backgroundColor: "#8a70d6",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7c3aed")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#8a70d6")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
