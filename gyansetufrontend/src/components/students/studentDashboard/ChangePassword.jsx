import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({
    current: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");

  const toggleVisibility = (field) => {
    setVisible({ ...visible, [field]: !visible[field] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (error) {
      setError("");
    }

    // Check password match when either new password or confirm password changes
    if (name === "newPassword" || name === "confirmPassword") {
      if (name === "newPassword" && form.confirmPassword && value !== form.confirmPassword) {
        setError("Passwords do not match");
      } else if (name === "confirmPassword" && form.newPassword && value !== form.newPassword) {
        setError("Passwords do not match");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Submit password change logic here
    console.log("Password changed:", form);
  };

  const isFormValid = form.current && form.newPassword && form.confirmPassword && !error;

  return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
      <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-2xl sm:rounded-3xl md:rounded-4xl pl-4 sm:pl-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 mb-6 sm:mb-8 tracking-wide text-center">Change Password</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white px-4 sm:px-8 md:px-12 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-3xl transform hover:scale-[1.01] transition-all duration-300"
        >
          {["current", "newPassword", "confirmPassword"].map((field, index) => (
            <div key={field} className="mb-6 sm:mb-8 relative">
              <label
                htmlFor={field}
                className={`absolute -top-3 left-3 sm:left-4 text-sm sm:text-base px-2 bg-white ${
                  index === 0 ? "text-purple-600" : "text-gray-600"
                } font-medium`}
              >
                {field === "current"
                  ? "Current Password"
                  : field === "newPassword"
                  ? "New Password"
                  : "Confirm Password"}
              </label>
              <div className={`flex items-center border-2 rounded-lg px-3 sm:px-4 md:px-5 py-3 sm:py-4 transition-colors duration-200 ${
                error && (field === "newPassword" || field === "confirmPassword")
                  ? "border-red-500 focus-within:border-red-500"
                  : "border-gray-200 hover:border-purple-400 focus-within:border-purple-500"
              }`}>
                <Lock className="text-purple-600 mr-2 sm:mr-3 md:mr-4" size={18} sm:size={20} md:size={22} />
                <input
                  id={field}
                  name={field}
                  type={visible[field] ? "text" : "password"}
                  value={form[field]}
                  onChange={handleChange}
                  className="flex-grow focus:outline-none text-base sm:text-lg placeholder-gray-400"
                  placeholder={`Enter your ${field === "current" ? "current" : "new"} password`}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(field)}
                  className="ml-2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                >
                  {visible[field] ? <Eye size={18} sm:size={20} md:size={22} /> : <EyeOff size={18} sm:size={20} md:size={22} />}
                </button>
              </div>
            </div>
          ))}

          {error && (
            <div className="text-red-500 text-sm sm:text-base mb-4 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full sm:w-3/4 md:w-1/2 text-white py-2 sm:py-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                isFormValid
                  ? "bg-purple-600 hover:bg-purple-700 hover:shadow-lg cursor-pointer"
                  : "bg-purple-400 cursor-not-allowed opacity-70"
              }`}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
