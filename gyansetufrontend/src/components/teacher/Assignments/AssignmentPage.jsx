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

  // Check for mobile screen size
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
        className={`w-10 h-10 rounded-full ${
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
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-400 transition-colors overflow-hidden"
        onClick={handleProfileClick}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <IoPersonCircleOutline className="text-gray-700 text-xl font-bold" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Navbar Integration */}
        <Navbar onNavToggle={handleNavToggle} />

        {/* Mobile Utility Icons */}
        {isMobile && (
          <div className="fixed top-3 right-16 z-50">
            <UtilityIcons />
          </div>
        )}

        {/* Main Content Area - adjusts based on navbar state */}
        <div
          className={`flex-1 transition-all duration-300 pt-[20px] md:pt-0 ${
            navExpanded ? "ml-0 md:ml-[330px]" : "ml-0 md:ml-[100px]"
          }`}
        >
          <div className="p-6 md:p-8">
            {/* Desktop Utility Icons */}
            {!isMobile && (
              <div className="flex justify-end mb-4">
                <UtilityIcons />
              </div>
            )}

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-1 mb-10">
              <div className="flex items-center justify-between">
                {["Template", "Content", "Settings", "Review"].map(
                  (step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-medium ${
                          currentStep > index + 1
                            ? "bg-purple-600 text-white"
                            : currentStep === index + 1
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        } shadow-sm transition-all duration-200`}
                      >
                        {currentStep > index + 1 ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm ${
                          currentStep === index + 1
                            ? "font-medium text-purple-800"
                            : "text-gray-600"
                        }`}
                      >
                        {step}
                      </span>

                      {/* Connecting line */}
                      {index < 3 && (
                        <div className="absolute left-12 top-6 w-full h-0.5 bg-gray-200">
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

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {currentStep === 1 && (
                <TemplateSelection
                  onNext={handleNextStep}
                  onSelectTemplate={handleTemplateSelect}
                />
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

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          .p-6 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .p-6,
          .md\\:p-8 {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .flex-1 {
            margin-left: ${navExpanded ? "330px" : "100px"};
          }
          .flex.justify-end {
            justify-content: flex-end;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
