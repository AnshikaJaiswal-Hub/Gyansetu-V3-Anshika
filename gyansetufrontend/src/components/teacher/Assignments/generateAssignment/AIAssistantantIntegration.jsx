import React, { useState, useEffect } from "react";
import { IoMoonOutline, IoSunnyOutline, IoPersonCircleOutline } from "react-icons/io5";
import TeacherNavbar from "../../TeacherNavbar";
import AIAssistantPanel from "./AIAssistantPanel";

export default function AIAssistantIntegration({
  onBack,
  onContinue,
  selectedTemplate = "quiz",
  onAddContent,
}) {
  // State for navbar and theme
  const [navExpanded, setNavExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Check for device screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      
      // Auto-collapse nav on smaller screens
      if (window.innerWidth < 768) {
        setNavExpanded(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Handle navbar toggle
  const handleNavToggle = (expanded) => {
    setNavExpanded(expanded);
  };

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Handle profile click
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

  // Utility Icons component
  const UtilityIcons = () => (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <button
        onClick={toggleTheme}
        className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <IoSunnyOutline className="text-lg sm:text-xl" />
        ) : (
          <IoMoonOutline className="text-lg sm:text-xl" />
        )}
      </button>
      <button
        onClick={handleProfileClick}
        className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Profile settings"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
          />
        ) : (
          <IoPersonCircleOutline className="text-lg sm:text-xl" />
        )}
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-purple-200 via-white to-purple-300 text-gray-800"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Navbar Integration */}
        <TeacherNavbar 
          onNavToggle={handleNavToggle} 
          isDarkMode={darkMode}
        />

        {/* Mobile/Tablet Utility Icons - Fixed Position */}
        {(isMobile || isTablet) && (
          <div className="fixed top-3 right-16 z-50">
            <UtilityIcons />
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isMobile ? "pt-16" : "pt-4 md:pt-0"
          } ${
            navExpanded 
              ? "md:ml-64 lg:ml-80" 
              : "md:ml-16 lg:ml-20"
          }`}
        >
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Desktop Header with Utility Icons */}
            {!isMobile && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    AI Assistant
                  </h1>
                  <h2 className={`text-sm sm:text-base md:text-lg mt-1 sm:mt-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                    Enhance your teaching with AI-powered tools
                  </h2>
                </div>
                {!isMobile && !isTablet && (
                  <div className="flex items-center">
                    <UtilityIcons />
                  </div>
                )}
              </div>
            )}

            {/* AI Assistant Panel */}
            <div className="w-full max-w-full mx-auto px-0 sm:px-2 md:px-4">
              <div className="transition-all duration-300 overflow-hidden">
                <AIAssistantPanel 
                  selectedTemplate={selectedTemplate}
                  onContinue={onContinue}
                  onBack={onBack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay - when navbar is expanded on mobile */}
      {navExpanded && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setNavExpanded(false)}
        />
      )}
    </div>
  );
}