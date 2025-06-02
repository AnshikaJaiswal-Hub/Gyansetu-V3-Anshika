import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoChatboxOutline,
  IoDocumentTextOutline,
  IoHelpBuoyOutline,
  IoBookOutline,
  IoCalendarClearOutline,
  IoTimeOutline,
} from "react-icons/io5";
import AttendanceCalendar from "./AttendanceCalendar";
import { useTheme } from "../../../context/ThemeContext"; // Import the theme hook


const ParentNavbar = ({ onNavToggle }) => {
  // Initialize expanded state from localStorage or default to false
  const [expanded, setExpanded] = useState(() => {
    const savedState = localStorage.getItem("parentNavbarExpanded");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Use the theme context
  const { darkMode } = useTheme();

  // Save expanded state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("parentNavbarExpanded", JSON.stringify(expanded));
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
  const handleNavClick = (e) => {
    // Don't collapse navbar when navigation items are clicked
    // Just let the Link component handle the navigation
    if (isMobile) {
      setExpanded(false); // Only collapse on mobile when a link is clicked
    }
    // On desktop, we maintain the current expanded state
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <IoHomeOutline className="text-lg" />,
      path: "/Parentdashboard",
    },
    {
      name: "Attendance",
      icon: <IoHelpBuoyOutline className="text-lg" />,
      path: "/parent/attendance",
    },
    {
      name: "Progress Report",
      icon: <IoDocumentTextOutline className="text-lg" />,
      path: "/parent/studentprogress",
    },
    {
      name: "Calendar",
      icon: <IoCalendarClearOutline className="text-lg" />,
      path: "/parent/calendar",
    },
    {
      name: "Schedule Meeting",
      icon: <IoTimeOutline className="text-lg" />,
      path: "/parent/schedule-meeting",
    },
  ];

  // Mobile view - horizontal layout at the top
  if (isMobile) {
    return (
      <>
        {/* Fixed top navbar with transition for showing/hiding on scroll */}
        <nav
          className={`fixed top-0 left-0 w-full ${
            darkMode ? "bg-[#5b3a64]" : "bg-white"
          } flex items-center justify-between px-4 py-6 shadow-sm z-50 transition-all duration-300 ease-in-out rounded-b-[20px]`}
        >
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded-[20px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            <span
              className={`ml-3 font-bold text-lg whitespace-nowrap ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              GyanSetu
            </span>
          </div>

          {/* Hamburger menu */}
          <div className="cursor-pointer" onClick={toggleNavbar}>
            <div
              className={`w-10 h-10 rounded-[20px] ${
                darkMode ? "bg-gray-800" : "bg-white"
              } flex items-center justify-center shadow-sm`}
            >
              <div className="flex flex-col justify-between h-5 w-5">
                <span
                  className={`h-0.5 w-full ${
                    darkMode ? "bg-gray-300" : "bg-gray-500"
                  } rounded`}
                ></span>
                <span
                  className={`h-0.5 w-3/4 ${
                    darkMode ? "bg-gray-300" : "bg-gray-500"
                  } rounded`}
                ></span>
                <span
                  className={`h-0.5 w-full ${
                    darkMode ? "bg-gray-300" : "bg-gray-500"
                  } rounded`}
                ></span>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile slide-out menu */}
        {expanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={toggleNavbar}
          >
            <div
              className={`fixed top-0 right-0 h-screen w-screen ${
                darkMode ? "bg-gray-900" : "bg-white"
              } shadow-lg z-30 transform transition-transform duration-300 ease-in-out`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`flex items-center justify-between w-full px-6 py-4 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}
              >
                {/* Logo */}
                <div className="flex items-center cursor-pointer">
                  <div className="w-10 h-10 rounded-[20px] bg-purple-600 flex items-center justify-center shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-white opacity-90" />
                  </div>
                  <span
                    className={`ml-3 font-bold text-xl whitespace-nowrap ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    GyanSetu
                  </span>
                </div>

                {/* Close button */}
                <div className="cursor-pointer" onClick={toggleNavbar}>
                  <div
                    className={`w-10 h-10 rounded-[20px] ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    } flex items-center justify-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Navigation items */}
              <div className="flex flex-col space-y-2 px-4 mt-10 w-full">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`relative flex items-center cursor-pointer transition-all duration-200 px-5 py-4 rounded-[20px] ${
                      location.pathname === item.path
                        ? darkMode
                          ? "bg-[#5b3a64] text-white"
                          : "bg-purple-100 text-purple-800"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center min-w-[40px] w-10 h-10 rounded-[20px] flex-shrink-0 ${
                        location.pathname === item.path
                          ? darkMode
                            ? "bg-purple-900 text-white"
                            : "bg-gray-900 text-white"
                          : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`ml-4 font-medium whitespace-nowrap ${
                        location.pathname === item.path
                          ? darkMode
                            ? "text-white"
                            : "text-gray-700"
                          : darkMode
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Spacer div with Tailwind transitions */}
        <div className="h-16 transition-all duration-300"></div>
      </>
    );
  }

  // Desktop/Tablet view
  return (
    <nav
      className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50 flex flex-col 
        ${
          isMobile
            ? darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-r from-purple-50 to-gray-100"
            : darkMode
            ? "bg-[#5b3a64]"
            : "bg-gradient-to-b from-gray-100 to-purple-50"
        }
        ${expanded ? (isMobile ? "w-full" : "w-[330px]") : "w-[100px]"}`}
    >
      <div className="flex items-center px-5 py-6 cursor-pointer ml-3">
        <div className="w-8 h-8 rounded-[20px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
          <div className="w-4 h-4 rounded-full bg-white opacity-80" />
        </div>
        {expanded && (
          <span
            className={`ml-3 font-bold text-lg whitespace-nowrap ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            GyanSetu
          </span>
        )}
      </div>

      <div
        className="flex items-center px-5 py-3 cursor-pointer mb-4 ml-2"
        onClick={toggleNavbar}
      >
        <div
          className={`w-10 h-10 rounded-[20px] ${
            darkMode ? "bg-gray-300" : "bg-white"
          } flex items-center justify-center shadow-sm`}
        >
          <div className="flex flex-col justify-between h-5 w-5">
            <span
              className={`h-0.5 w-full ${
                darkMode ? "bg-purple-900" : "bg-gray-500"
              } rounded`}
            ></span>
            <span
              className={`h-0.5 w-3/4 ${
                darkMode ? "bg-purple-900" : "bg-gray-500"
              } rounded`}
            ></span>
            <span
              className={`h-0.5 w-full ${
                darkMode ? "bg-purple-900" : "bg-gray-500"
              } rounded`}
            ></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full space-y-3 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={handleNavClick}
            className={`relative flex items-center cursor-pointer transition-all duration-200 group
              ${
                expanded
                  ? `px-3 py-3 rounded-[20px] ${
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
              className={`flex items-center justify-center min-w-[40px] w-10 h-10 rounded-[20px] flex-shrink-0 transition-colors
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
                className={`ml-4 font-medium whitespace-nowrap transition-colors ${
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
              <div className="absolute left-0 h-10 w-1 bg-purple-500 rounded-r-md"></div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-auto mb-6 mx-auto">
        {expanded ? (
          <div
            className={`w-32 h-1 ${
              darkMode
                ? "bg-gradient-to-r from-purple-400 to-transparent"
                : "bg-gradient-to-r from-purple-200 to-transparent"
            } rounded-full`}
          ></div>
        ) : (
          <div
            className={`w-8 h-1 ${
              darkMode
                ? "bg-gradient-to-r from-purple-400 to-transparent"
                : "bg-gradient-to-r from-purple-200 to-transparent"
            } rounded-full`}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default ParentNavbar;
