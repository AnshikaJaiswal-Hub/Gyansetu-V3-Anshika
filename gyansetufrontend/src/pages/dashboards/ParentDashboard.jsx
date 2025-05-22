import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import authService from "../../services/api/authService";
import ParentNavbar from "../../components/Parent/parentDashboard/ParentNavbar";
import AttendancePieChart from "../../components/Parent/parentDashboard/AttendancePieChart";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook
import StudentProgressChart from "../../components/Parent/parentDashboard/ProgressChart";

const ParentDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // Use the theme context
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfileImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#5b3a64]" : "bg-gray-100"
      } transition-colors duration-300 pt-10 pr-10 pb-10 `}
    >
      <div
        className={`min-h-screen ${
          darkMode
            ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
            : "bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400"
        } rounded-4xl p-1 pl-6 pr-6 pb-6 transition-colors duration-300`}
      >
        {/* Header with greeting and utility icons */}
        <div className="flex justify-between items-start pt-6 pr-6">
          {/* Greeting section */}
          <div>
            <h1
              className={`text-2xl md:text-4xl font-semibold ${
                darkMode ? "text-white" : "text-violet-600"
              } transition-colors duration-300`}
            >
              {greeting}, {user?.firstName || "Parent"}!
            </h1>
            <h2
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } text-base md:text-lg mt-2 transition-colors duration-300`}
            >
              Welcome to your child's progress overview.
            </h2>
          </div>

          {/* Utility Icons and Logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                darkMode
                  ? "hover:bg-[#341b47] text-white"
                  : "hover:bg-violet-200 text-violet-700"
              } transition-colors duration-300`}
            >
              {darkMode ? (
                <IoSunnyOutline className="text-xl" />
              ) : (
                <IoMoonOutline className="text-xl" />
              )}
            </button>
            <button
              onClick={handleProfileClick}
              className={`p-2 rounded-full ${
                darkMode
                  ? "hover:bg-[#341b47] text-white"
                  : "hover:bg-violet-200 text-violet-700"
              } transition-colors duration-300`}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <IoPersonCircleOutline className="text-xl" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className={`px-4 py-2 ${
                darkMode
                  ? "bg-[#341b47] hover:bg-purple-800"
                  : "bg-violet-600 hover:bg-violet-700"
              } text-white rounded-lg transition-colors duration-300`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-8">
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-violet-600"
            } mb-4 transition-colors duration-300`}
          >
            Parent Dashboard
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full mt-8 ">
            {/* Attendance Pie Chart - Takes up 5 columns */}
            <div className="xl:col-span-5 rounded-lg p-6">
              <div className="w-full h-full">
                <AttendancePieChart />
              </div>
            </div>
            {/* Student Progress Chart - Takes up 7 columns */}
            <div className="xl:col-span-7 min-h-96">
              <StudentProgressChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
