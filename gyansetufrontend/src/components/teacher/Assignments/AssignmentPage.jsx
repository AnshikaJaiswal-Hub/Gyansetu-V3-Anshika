import React, { useState, useEffect } from "react";
import { Check, ChevronDown, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

// Import components
import Navbar from "../TeacherNavbar"; // Reusing the same Navbar component
import TemplateSelection from "./TemplateSelection";
import ContentCreation from "./ContentCreation";
import SettingsConfiguration from "./SeetingConfig";
import ReviewComponent from "./EnhancedReview";

export default function AssignmentCreatorMain() {
  const location = useLocation();

  // Original state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("quiz");
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    timeLimit: "",
    dueDate: "",
    subject: "",
    gradeLevel: "",
    difficulty: "medium",
    sections: [],
  });

  // Navbar state (added from TeacherDashboard)
  const [navExpanded, setNavExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Reset state when navigating to this component
  useEffect(() => {
    setCurrentStep(1);
    setSelectedTemplate("quiz");
    setAssignmentData({
      title: "",
      description: "",
      timeLimit: "",
      dueDate: "",
      subject: "",
      gradeLevel: "",
      difficulty: "medium",
      sections: [],
    });
  }, [location.pathname]);

  // Check for mobile and tablet screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Add scroll behavior for mobile view
  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;
    const mobileNavbarClass = "transform -translate-y-full";
    const contentSpacerClass = "mt-0";
    const contentNormalClass = "mt-[60px]";

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Get navbar elements if they exist
      const mobileNavbar = document.querySelector(".mobile-navbar-top");
      const mainContent = document.querySelector(".main-content-area");

      if (mobileNavbar && mainContent) {
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          // Scrolling down - hide the navbar
          mobileNavbar.classList.add(mobileNavbarClass);
          mainContent.classList.remove(contentNormalClass);
          mainContent.classList.add(contentSpacerClass);
        } else {
          // Scrolling up - show the navbar
          mobileNavbar.classList.remove(mobileNavbarClass);
          mainContent.classList.remove(contentSpacerClass);
          mainContent.classList.add(contentNormalClass);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Handle moving to next step
  const handleNextStep = (data) => {
    if (currentStep < 4) {
      if (data) {
        setAssignmentData({ ...assignmentData, ...data });
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle moving to previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  // Handle navbar toggle (from TeacherDashboard)
  const handleNavToggle = (expanded) => {
    setNavExpanded(expanded);
  };

  // Toggle theme (from TeacherDashboard)
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Handle profile click (from TeacherDashboard)
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

  // Utility Icons component (from TeacherDashboard)
  const UtilityIcons = () => (
    <div className="flex items-center space-x-3">
      <button
        className={`w-10 h-10 rounded-[20px] ${
          darkMode ? "bg-black" : "bg-gray-300"
        } flex items-center justify-center shadow-lg hover:bg-gray-400 transition-colors`}
        onClick={toggleTheme}
      >
        {darkMode ? (
          <IoSunnyOutline className="text-white text-xl font-bold" />
        ) : (
          <IoMoonOutline className="text-gray-700 text-xl font-bold" />
        )}
      </button>
      <button
        className="w-10 h-10 rounded-[20px] bg-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-400 transition-colors overflow-hidden"
        onClick={handleProfileClick}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-[20px]"
          />
        ) : (
          <IoPersonCircleOutline className="text-gray-700 text-xl font-bold" />
        )}
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-red-50"}`}>
      <div className="flex flex-col sm:flex-row">
        {/* Navbar Integration - Now fixed position on all devices */}
        <div className="fixed top-0 left-0 h-full z-10">
          <Navbar onNavToggle={handleNavToggle} />
        </div>

        {/* Mobile Utility Icons */}
        {isMobile && (
          <div className="fixed top-3 right-3 z-50">
            <UtilityIcons />
          </div>
        )}

        {/* Main Content Area - properly structured for mobile scroll behavior */}
        <div
          className={`flex-1 transition-all duration-300 z-20 main-content-area
            ${
              isMobile
                ? "ml-0 px-4 mt-[60px]"
                : isTablet
                ? "ml-[80px] mt-0"
                : navExpanded
                ? "ml-[330px]"
                : "ml-[100px]"
            } pt-4`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Desktop/Tablet Utility Icons */}
            {!isMobile && (
              <div className="flex justify-end mb-4">
                <UtilityIcons />
              </div>
            )}

            {/* Progress Steps - With Tailwind classes for transitions */}
            <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 mt-1 mb-8 sm:mb-10 transition-all duration-300">
              <div className="flex items-center justify-between">
                {["Template", "Content", "Settings", "Review"].map(
                  (step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-[20px] text-sm font-medium ${
                          currentStep > index + 1
                            ? "bg-purple-600 text-white"
                            : currentStep === index + 1
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        } shadow-sm transition-all duration-200`}
                      >
                        {currentStep > index + 1 ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs sm:text-sm ${
                          currentStep === index + 1
                            ? "font-medium text-purple-800"
                            : "text-gray-600"
                        }`}
                      >
                        {step}
                      </span>

                      {/* Connecting line */}
                      {index < 3 && (
                        <div className="absolute left-10 sm:left-12 top-5 sm:top-6 w-full h-0.5 bg-gray-200">
                          <div
                            className="h-full bg-purple-500 transition-all duration-300"
                            style={{
                              width: currentStep > index + 1 ? "100%" : "0%",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Template Cards - Modified for rounded corners */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {currentStep === 1 && (
                <div className="bg-white rounded-[20px] shadow-md p-4 sm:p-6 mb-6 mx-auto max-w-sm sm:max-w-none">
                  <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center sm:text-left">
                    Choose Template
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Quiz Template */}
                    <div
                      className={`rounded-[20px] border-2 p-4 cursor-pointer transition-all duration-200 flex items-center gap-3
                        ${
                          selectedTemplate === "quiz"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      onClick={() => handleTemplateSelect("quiz")}
                    >
                      <div className="rounded-[20px] bg-purple-100 p-2 sm:p-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 flex items-center justify-center">
                          📝
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          Quiz Template
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Multiple choice questions with automatic grading
                        </p>
                      </div>
                      {selectedTemplate === "quiz" && (
                        <Check className="ml-auto text-purple-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Written Assignment */}
                    <div
                      className={`rounded-[20px] border-2 p-4 cursor-pointer transition-all duration-200 flex items-center gap-3
                        ${
                          selectedTemplate === "written"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      onClick={() => handleTemplateSelect("written")}
                    >
                      <div className="rounded-[20px] bg-blue-100 p-2 sm:p-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex items-center justify-center">
                          ✏️
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          Written Assignment
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Long-form responses with rubric-based grading
                        </p>
                      </div>
                      {selectedTemplate === "written" && (
                        <Check className="ml-auto text-purple-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Test Module */}
                    <div
                      className={`rounded-[20px] border-2 p-4 cursor-pointer transition-all duration-200 flex items-center gap-3
                        ${
                          selectedTemplate === "test"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      onClick={() => handleTemplateSelect("test")}
                    >
                      <div className="rounded-[20px] bg-green-100 p-2 sm:p-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 flex items-center justify-center">
                          📃
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          Test Module
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Comprehensive testing with various question types
                        </p>
                      </div>
                      {selectedTemplate === "test" && (
                        <Check className="ml-auto text-purple-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Project Based */}
                    <div
                      className={`rounded-[20px] border-2 p-4 cursor-pointer transition-all duration-200 flex items-center gap-3
                        ${
                          selectedTemplate === "project"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      onClick={() => handleTemplateSelect("project")}
                    >
                      <div className="rounded-[20px] bg-amber-100 p-2 sm:p-3 flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 flex items-center justify-center">
                          🧑‍🤝‍🧑
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          Project Based
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Collaborative or individual project work
                        </p>
                      </div>
                      {selectedTemplate === "project" && (
                        <Check className="ml-auto text-purple-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => handleNextStep()}
                      className="bg-purple-600 text-white px-6 py-2 rounded-[20px] hover:bg-purple-700 transition-colors"
                    >
                      Continue to Content
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <ContentCreation
                  onNext={handleNextStep}
                  onPrevious={handlePrevStep}
                  selectedTemplate={selectedTemplate}
                />
              )}
              {currentStep === 3 && (
                <SettingsConfiguration
                  onNext={handleNextStep}
                  onPrevious={handlePrevStep}
                  assignmentData={assignmentData}
                />
              )}
              {currentStep === 4 && (
                <ReviewComponent
                  onPrevious={handlePrevStep}
                  finalAssignment={{
                    ...assignmentData,
                    template: selectedTemplate,
                  }}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
