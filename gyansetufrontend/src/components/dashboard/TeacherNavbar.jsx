import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  IoHomeOutline, 
  IoChatboxOutline, 
  IoCalendarOutline,
  IoHelpBuoyOutline, 
  IoBookOutline,
  IoPeopleOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { Users, CreditCard, Clock } from 'lucide-react';

const TeacherNavbar = ({ onNavToggle, expanded, setExpanded, activeItem, setActiveItem, isMobile }) => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    try {
      console.log('Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <IoHomeOutline className="text-lg" /> },
    { name: "Finance", icon: <CreditCard className="text-lg" /> },
    { name: "Calendar", icon: <IoCalendarOutline className="text-lg" /> },
    { name: "Teacher", icon: <Users className="text-lg" /> },
    { name: "Students", icon: <IoPeopleOutline className="text-lg" /> },
    { name: "Scheduling", icon: <Clock className="text-lg" /> },
  ];

  // Mobile view - horizontal layout at the top
  if (isMobile && !expanded) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white flex items-center justify-between px-4 py-6 shadow-sm z-50">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-white opacity-80" />
          </div>
          <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
            GyanSetu
          </span>
        </div>

        {/* Hamburger menu */}
        <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="flex flex-col justify-between h-5 w-5">
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile expanded view or desktop/tablet view
  return (
    <nav
      className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50 flex flex-col 
        ${
          isMobile
            ? "bg-gradient-to-r from-purple-50 to-gray-100"
            : "bg-gradient-to-b from-gray-100 to-purple-50"
        }
        ${expanded ? (isMobile ? "w-full" : "w-[330px]") : "w-[100px]"}`}
    >
      {/* Mobile expanded header with hamburger at right */}
      {isMobile && expanded && (
        <div className="flex items-center justify-between w-full px-4 py-6">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
              GyanSetu
            </span>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <div className="flex flex-col justify-between h-5 w-5">
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
                <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop/Tablet Logo section and hamburger */}
      {!isMobile && (
        <>
          <div className="flex items-center justify-between px-5 py-6">
            <div className="flex items-center cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                <div className="w-4 h-4 rounded-full bg-white opacity-80" />
              </div>
              {expanded && (
                <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
                  GyanSetu
                </span>
              )}
            </div>
          </div>

          <div
            className="flex items-center px-5 py-3 cursor-pointer mb-4 ml-2"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <div className="flex flex-col justify-between h-5 w-5">
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
                <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation items */}
      <div
        className={`flex flex-col h-full space-y-3 px-2 ${
          isMobile && expanded ? "mt-4" : ""
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`relative flex items-center cursor-pointer transition-all duration-200
              ${
                expanded
                  ? "px-3 py-3 rounded-xl " +
                    (activeItem === item.name
                      ? "bg-gradient-to-r from-purple-200 to-purple-50 text-purple-700 shadow-sm"
                      : "text-gray-500 hover:bg-purple-50")
                  : "justify-center py-3"
              }`}
            onClick={() => setActiveItem(item.name)}
          >
            <div
              className={`flex items-center justify-center min-w-[40px] w-10 h-10 rounded-full flex-shrink-0
              ${
                activeItem === item.name
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              {item.icon}
            </div>
            {expanded && (
              <span
                className={`ml-4 font-medium whitespace-nowrap ${
                  activeItem === item.name ? "text-gray-700" : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            )}

            {/* Active indicator for collapsed state */}
            {!expanded && activeItem === item.name && (
              <div className="absolute left-0 h-10 w-1 bg-purple-500 rounded-r-md"></div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom decoration - subtle gradient accent */}
      <div className="mt-auto mb-6 mx-auto">
        {expanded ? (
          <div className="w-32 h-1 bg-gradient-to-r from-purple-300 to-transparent rounded-full"></div>
        ) : (
          <div className="w-8 h-1 bg-gradient-to-r from-purple-300 to-transparent rounded-full"></div>
        )}
      </div>
    </nav>
  );
};

export default TeacherNavbar; 