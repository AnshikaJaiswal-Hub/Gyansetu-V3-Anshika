import React, { useState, useEffect } from 'react';
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import Navbar from "../TeacherNavbar";
import ProfileCard from './ProfileCard';
import ClassesComponent from './MyClasses';
import SubjectsComponent from './MySubjects';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/api/authService';

const CompleteProfilePage = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState("/api/placeholder/400/400");
  const navigate = useNavigate();
  
  // Try to get user from auth service if available
  const user = authService.getCurrentUser ? authService.getCurrentUser() : {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1-555-789-1234",
  };

  const teacherData = {
    name: user.firstName + " " + (user.lastName || ""),
    email: user.email,
    phone: user.phone,
    image: profileImage
  };

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

  const handleNavToggle = (expanded) => {
    setNavExpanded(expanded);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
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

  const handleLogout = () => {
    if (authService.logout) {
      authService.logout();
      navigate('/login');
    } else {
      console.log('Logout clicked');
    }
  };

  const UtilityIcons = () => (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        {darkMode ? (
          <IoSunnyOutline className="text-xl" />
        ) : (
          <IoMoonOutline className="text-xl" />
        )}
      </button>
      <button
        onClick={handleProfileClick}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-300">
      <div className="flex flex-col md:flex-row">
        <Navbar onNavToggle={handleNavToggle} />
        {isMobile && (
          <div className="fixed top-3 right-16 z-50">
            <UtilityIcons />
          </div>
        )}
        <div
          className={`flex-1 transition-all duration-300 pt-[20px] md:pt-0 ${
            navExpanded ? "ml-0 md:ml-[330px]" : "ml-0 md:ml-[100px]"
          }`}
        >
          <div className="p-6 md:p-8">
            {!isMobile && (
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                    {greeting}, {teacherData.name.split(' ')[0]}!
                  </h1>
                  <h2 className="text-gray-500 text-lg mt-2">
                    Welcome to your profile dashboard.
                  </h2>
                </div>
                <div className="flex items-center space-x-4">
                  <UtilityIcons />
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Layout */}
            <div className="p-5 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 tablet:grid-cols-1">
                {/* Profile Section - 1/3 */}
                <div className="md:col-span-1 tablet:col-span-1">
                  <ProfileCard teacherData={teacherData} />
                </div>
                
                {/* Classes and Subjects - 2/3 */}
                <div className="md:col-span-2 tablet:col-span-1 flex flex-col gap-6">
                  <ClassesComponent />
                  <SubjectsComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .p-6 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          h1, h2 {
            text-align: left;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .tablet\\:grid-cols-1 {
            grid-template-columns: 1fr;
          }
          .tablet\\:col-span-1 {
            grid-column: span 1 / span 1;
          }
          .p-6, .md\\:p-8 {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .flex-1 {
            margin-left: ${navExpanded ? "330px" : "100px"};
          }
          .mb-10, .p-5 {
            width: 100%;
          }
          .mb-4, .mb-6, .mt-6 {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .flex.justify-end {
            justify-content: flex-end;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CompleteProfilePage;