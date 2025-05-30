import React, { useState, useEffect } from 'react';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Navbar from "../TeacherNavbar";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/api/authService";
import { useTheme } from "../../../context/ThemeContext";
import UploadContent from './UploadContent';
import RecentUploads from './RecentUploads';

const TeacherContent = () => {
  // Navbar state
  const [navExpanded, setNavExpanded] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // Use the theme context
  const { darkMode, toggleTheme } = useTheme();

  // Recent uploads state
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, type: 'pdf', title: 'Physics Notes - Chapter 5', class: 'Class 12', section: 'Section A', subject: 'Physics', date: '28 Apr 2025' },
    { id: 2, type: 'image', title: 'Chemistry Diagram - Periodic Table', class: 'Class 11', section: 'Section B', subject: 'Chemistry', date: '30 Apr 2025' },
    { id: 3, type: 'text', title: 'Mathematics Practice Problems', class: 'Class 10', section: 'Section C', subject: 'Maths', date: '02 May 2025' },
    { id: 4, type: 'pdf', title: 'History Timeline - Medieval India', class: 'Class 8', section: 'Section D', subject: 'History', date: '01 May 2025' },
    { id: 5, type: 'text', title: 'Computer Science Algorithms', class: 'Class 11', section: 'Section A', subject: 'Computer', date: '29 Apr 2025' },
  ]);

  // Setting greeting based on time of day
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

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle navbar toggle
  const handleNavToggle = (expanded) => {
    setNavExpanded(expanded);
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Utility Icons component
  const UtilityIcons = () => (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full ${
          darkMode
            ? "hover:bg-[#341b47] text-white"
            : "hover:bg-gray-200 text-gray-800"
        } transition-colors duration-300`}
      >
        {darkMode ? (
          <IoSunnyOutline className="text-xl" />
        ) : (
          <IoMoonOutline className="text-xl" />
        )}
      </button>
    </div>
  );

  // Handle new upload
  const handleNewUpload = (newUpload) => {
    if (newUpload) {
      setRecentUploads([newUpload, ...recentUploads]);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#5b3a64]" : "bg-gray-100"} transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row">
        <Navbar onNavToggle={handleNavToggle} />
        {isMobile && (
          <div className="fixed top-3 right-16 z-50">
            <UtilityIcons />
          </div>
        )}
         
        <div className={`flex-1 transition-all duration-300 pt-[20px] md:pt-7 md:pr-7 ${navExpanded ? "ml-0 md:ml-[330px]" : "ml-0 md:ml-[100px]"}`}>
          {/* Floating dashboard container with rounded corners */}
          <div
            className={`${
              darkMode
                ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
                : "bg-gradient-to-br from-purple-200 via-white to-purple-300"
            } rounded-[30px] shadow-lg w-full transition-colors duration-300`}
          >
            <div className="p-6 md:p-8">
              {!isMobile && (
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h1 className={`text-3xl md:text-4xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {greeting}, {user?.firstName || "Teacher"}!
                    </h1>
                    <h2 className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-lg mt-2`}>
                      Upload and manage your teaching content
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <UtilityIcons />
                  </div>
                </div>
              )}
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <UploadContent darkMode={darkMode} onUpload={handleNewUpload} />
                  </div>
                  <div className="lg:col-span-1">
                    <RecentUploads 
                      darkMode={darkMode} 
                      recentUploads={recentUploads}
                      onUploadsChange={setRecentUploads}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherContent;