import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoLibraryOutline,
  IoWalletOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoPersonOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const InstituteNavbar = ({ onNavToggle }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  // Initialize expanded state from localStorage or default to false
  const [expanded, setExpanded] = useState(() => {
    const savedState = localStorage.getItem("instituteNavbarExpanded");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Save expanded state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("instituteNavbarExpanded", JSON.stringify(expanded));
    if (onNavToggle) {
      onNavToggle(expanded);
    }
  }, [expanded, onNavToggle]);

  // Handle window resize to detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleNavbar = () => {
    setExpanded((prev) => !prev); // Update state and let useEffect handle persistence
  };

  // Handle navigation item click
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (isMobile) {
      setExpanded(false);
    }
    navigate(path);
  };

  const navItems = [
    {
      name: "Overview",
      icon: <IoHomeOutline className="text-lg" />,
      path: "/institute",
    },
    {
      name: "Teachers",
      icon: <IoPersonOutline className="text-lg" />,
      path: "/institute/teachers",
    },
    {
      name: "Students",
      icon: <IoPeopleOutline className="text-lg" />,
      path: "/institute/students",
    },
    {
      name: "Classes",
      icon: <IoLibraryOutline className="text-lg" />,
      path: "/institute/classes",
    },
    {
      name: "Attendance Report",
      icon: <IoBarChartOutline className="text-lg" />,
      path: "/institute/attendance",
    },
    {
      name: "Academic Report",
      icon: <IoDocumentTextOutline className="text-lg" />,
      path: "/institute/reports",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline className="text-lg" />,
      path: "/institute/settings",
    },
  ];

  if (isMobile && !expanded) {
    return (
      <nav className={`fixed top-0 left-0 w-full ${darkMode ? "bg-[#5b3a64]" : "bg-white"} flex items-center justify-between px-4 py-6 shadow-sm z-50 transition-colors duration-300`}>
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-white opacity-80" />
          </div>
          <span className={`ml-3 font-bold text-lg whitespace-nowrap ${darkMode ? "text-white" : "text-gray-700"} transition-colors duration-300`}>
            GyanSetu
          </span>
        </div>

        <div className="cursor-pointer" onClick={toggleNavbar}>
          <div className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-sm transition-colors duration-300`}>
            <div className="flex flex-col justify-between h-5 w-5">
              <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
              <span className={`h-0.5 w-3/4 ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
              <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50 flex flex-col 
        ${darkMode ? "bg-[#5b3a64]" : isMobile ? "bg-gradient-to-r from-purple-50 to-gray-100" : "bg-gradient-to-b from-gray-100 to-purple-50"}
        ${expanded ? (isMobile ? "w-full" : "w-[330px]") : "w-[100px]"} transition-colors duration-300`}
    >
      {isMobile && expanded && (
        <div className="flex items-center justify-between w-full px-4 py-6">
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            <span className={`ml-3 font-bold text-lg whitespace-nowrap ${darkMode ? "text-white" : "text-gray-700"} transition-colors duration-300`}>
              GyanSetu
            </span>
          </div>

          <div className="cursor-pointer" onClick={toggleNavbar}>
            <div className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <div className="flex flex-col justify-between h-5 w-5">
                <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
                <span className={`h-0.5 w-3/4 ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
                <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <>
          <div className="flex items-center px-5 py-6 cursor-pointer ml-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            {expanded && (
              <span className={`ml-3 font-bold text-lg whitespace-nowrap ${darkMode ? "text-white" : "text-gray-700"} transition-colors duration-300`}>
                GyanSetu
              </span>
            )}
          </div>

          <div
            className="flex items-center px-5 py-3 cursor-pointer mb-4 ml-2"
            onClick={toggleNavbar}
          >
            <div className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <div className="flex flex-col justify-between h-5 w-5">
                <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
                <span className={`h-0.5 w-3/4 ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
                <span className={`h-0.5 w-full ${darkMode ? "bg-gray-300" : "bg-gray-500"} rounded transition-colors duration-300`}></span>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`flex flex-col h-full space-y-3 px-2 ${
          isMobile && expanded ? "mt-4" : ""
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.name}
            onClick={(e) => handleNavClick(e, item.path)}
            className={`relative flex items-center cursor-pointer transition-all duration-300 group
              ${
                expanded
                  ? `px-3 py-3 rounded-xl ${
                      location.pathname === item.path
                        ? darkMode 
                          ? "bg-[#4a2f52] text-purple-200 shadow-sm"
                          : "bg-gradient-to-r from-purple-200 to-purple-50 text-purple-700 shadow-sm"
                        : darkMode
                        ? "text-gray-300 hover:bg-[#4a2f52] hover:text-purple-200"
                        : "text-gray-500 hover:bg-gradient-to-r hover:from-purple-200 hover:to-purple-50 hover:text-purple-700 hover:shadow-sm"
                    }`
                  : `justify-center py-3 ${
                      location.pathname === item.path
                        ? ""
                        : darkMode
                        ? "hover:bg-[#4a2f52]"
                        : "hover:bg-gradient-to-r hover:from-purple-200 hover:to-purple-50"
                    }`
              }`}
          >
            <div
              className={`flex items-center justify-center min-w-[40px] w-10 h-10 rounded-full flex-shrink-0 transition-colors duration-300
              ${
                location.pathname === item.path
                  ? darkMode
                    ? "bg-purple-500 text-purple-200"
                    : "bg-gray-800 text-white"
                  : darkMode
                  ? "bg-gray-300 text-purple-900 group-hover:bg-purple-500 group-hover:text-purple-200"
                  : "bg-white text-gray-500 group-hover:bg-gray-800 group-hover:text-white"
              }`}
            >
              {item.icon}
            </div>
            {expanded && (
              <span
                className={`ml-4 font-medium whitespace-nowrap transition-colors duration-300 ${
                  location.pathname === item.path
                    ? darkMode
                      ? "text-white"
                      : "text-gray-700"
                    : darkMode
                    ? "text-gray-300 group-hover:text-white"
                    : "text-gray-600 group-hover:text-gray-700"
                }`}
              >
                {item.name}
              </span>
            )}

            {!expanded && location.pathname === item.path && (
              <div className="absolute left-0 h-10 w-1 bg-purple-500 rounded-r-md transition-colors duration-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto mb-6 mx-auto">
        {expanded ? (
          <div className={`w-32 h-1 ${darkMode ? "bg-gradient-to-r from-purple-400 to-transparent" : "bg-gradient-to-r from-purple-200 to-transparent"} rounded-full transition-colors duration-300`}></div>
        ) : (
          <div className={`w-8 h-1 ${darkMode ? "bg-gradient-to-r from-purple-400 to-transparent" : "bg-gradient-to-r from-purple-200 to-transparent"} rounded-full transition-colors duration-300`}></div>
        )}
      </div>
    </nav>
  );
};

export default InstituteNavbar;