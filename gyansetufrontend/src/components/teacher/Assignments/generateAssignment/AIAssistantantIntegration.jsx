import React, { useState, useEffect } from "react";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import TeacherNavbar from "../../TeacherNavbar";
import AIAssistantPanel from "./AIAssistantPanel";
import { useTheme } from "../../../../context/ThemeContext"; // Import the theme hook

export default function AIAssistantIntegration({
  onBack,
  onContinue,
  selectedTemplate = "quiz",
  onAddContent,
}) {
  // State for navbar and screen size
  const [navExpanded, setNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);


  // Use the theme context instead of local state
  const { darkMode, toggleTheme } = useTheme();

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

  

  // Utility Icons component
  const UtilityIcons = () => (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <button
        onClick={toggleTheme}
        className={`p-1 sm:p-2 rounded-full ${
          darkMode
            ? "hover:bg-[#341b47] text-white"
            : "hover:bg-gray-200 text-gray-800"
        } transition-colors duration-300`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <IoSunnyOutline className="text-lg sm:text-xl" />
        ) : (
          <IoMoonOutline className="text-lg sm:text-xl" />
        )}
      </button>
      
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#5b3a64]" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Navbar Integration */}
        <TeacherNavbar onNavToggle={handleNavToggle} />

        

        {/* Main Content Area */}
        <div
          className={`transition-all duration-300 ${
            navExpanded ? "ml-0 md:ml-[300px]" : "ml-0 md:ml-[70px]"
          } flex-1 px-4 md:px-8 py-6`}
        >
          {/* Floating container with rounded corners */}
          <div
            className={`${
              darkMode
                ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
                : "bg-gradient-to-br from-purple-200 via-white to-purple-300"
            } rounded-[30px] shadow-lg w-full transition-colors duration-300`}
          >
            <div className="p-6 md:p-8">
              {/* Header with title and utility icons aligned */}
              <div className="flex justify-between items-start mb-6">
                {/* Title section */}
                <div>
                  <h1
                    className={`text-2xl md:text-4xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-800"
                    } transition-colors duration-300`}
                  >
                    AI Assistant
                  </h1>
                  <h2
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    } text-base md:text-lg mt-2 transition-colors duration-300`}
                  >
                    Enhance your teaching with AI-powered tools
                  </h2>
                </div>

                {/* Utility Icons - aligned with the title */}
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
              </div>

              {/* AI Assistant Panel */}
              <div className="w-full">
                <AIAssistantPanel
                  selectedTemplate={selectedTemplate}
                  onContinue={onContinue}
                  onBack={onBack}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {navExpanded && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setNavExpanded(false)}
        />
      )}

      <style jsx>{`
        /* Hide scrollbars while maintaining scroll functionality */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}
