//MAIN PAGE WHERE ALL ASSIGNMENT RELATED PAGES ARE IMPORTED

import React, { useState, useEffect } from "react";
import { Check, ChevronDown, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useTheme } from "../../../../context/ThemeContext";

// Import components
import Navbar from "../../TeacherNavbar"; 
import TemplateSelection from "./TemplateSelection";
import ContentCreation from "./content/ContentCreation";
import SettingsConfiguration from "./SettingConfig";
import ReviewComponent from "./EnhancedReview";

export default function AssignmentCreatorMain() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

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

  // Navbar state
  const [navExpanded, setNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

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

  // Check for mobile screen size - matching TeacherDashboard approach
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
    console.log(`--- Step ${currentStep} -> Step ${currentStep + 1} ---`);
    console.log("Data received from previous step:", data);
    console.log("assignmentData BEFORE update:", assignmentData);

    let nextAssignmentData = assignmentData; // Keep current data by default

    if (data) { // Only merge if data is provided
        // Special handling if data contains 'settings' (from Step 3)
        if (data.settings !== undefined) {
             // Ensure we are merging settings onto the existing data correctly
             // The data passed from SettingConfig should already contain ...assignmentData
             // So, just using 'data' should be sufficient if SettingConfig sends everything
             nextAssignmentData = data;
             console.log("Received settings, using data as next state:", nextAssignmentData);
        } else {
            // Merge data from ContentCreation (Step 2)
            nextAssignmentData = { ...assignmentData, ...data };
            console.log("Merging data from Content step:", nextAssignmentData);
        }
    } else {
        console.log("No data received, proceeding to next step without data merge.");
    }


    if (currentStep < 4) {
      setAssignmentData(nextAssignmentData); // Update state
      console.log("assignmentData AFTER update (will reflect on next render):", nextAssignmentData);
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
       console.log("Already on last step or attempting to go beyond.");
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

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#5b3a64]" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Navbar Integration */}
        <Navbar onNavToggle={handleNavToggle} />

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
            } rounded-[30px] shadow-lg w-full transition-colors duration-300 px-0 md:px-8`}
          >
            <div className="p-6 md:p-8 md:px-0">
              {/* Header with title and utility icons aligned */}
              <div className="flex justify-between items-start mb-6">
                {/* Title section */}
                <div>
                  <h1
                    className={`text-2xl md:text-4xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-800"
                    } transition-colors duration-300`}
                  >
                    Create Assignment
                  </h1>
                  <h2
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    } text-base md:text-lg mt-2 transition-colors duration-300`}
                  >
                    Build a new learning experience for your students
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

              {/* Progress Steps */}
              <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 mt-1 mb-8 sm:mb-10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  {["Template", "Content", "Settings", "Review"].map(
                    (step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center relative"
                      >
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-sm font-medium ${
                            currentStep > index + 1
                              ? "bg-[#5c4370] text-white"
                              : currentStep === index + 1
                              ? "bg-[#5c4370] text-white"
                              : darkMode
                              ? "bg-[#2a0c2e] text-gray-300"
                              : "bg-gray-300 text-gray-700"
                          } shadow-sm transition-all duration-200`}
                        >
                          {currentStep > index + 1 ? (
                            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span
                          className={`mt-2 text-xs sm:text-sm hidden sm:block ${
                            currentStep === index + 1
                              ? "font-medium text-purple-300"
                              : darkMode
                              ? "text-gray-300 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {step}
                        </span>

                        {/* Connecting line */}
                        {index < 3 && (
                          <div className={`absolute left-10 sm:left-13 top-5 sm:top-6 w-full h-0.5 ${
                            darkMode ? "bg-[#2a0c2e]" : "bg-gray-300"
                          }`}>
                            <div
                              className="h-full bg-[#5c4370] transition-all duration-300"
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
              <main className="w-full px-0 md:px-0 pb-12">
                {currentStep === 1 && (
                  <TemplateSelection
                    onSelectTemplate={handleTemplateSelect}
                    onNext={() => handleNextStep()}
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
