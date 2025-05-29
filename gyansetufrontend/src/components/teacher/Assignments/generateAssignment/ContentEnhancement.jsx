import React, { useState } from "react";
import { Zap, AlertCircle } from "lucide-react";
import PropTypes from "prop-types";

// Reusable button component for analysis actions
const AnalysisButton = ({ label, onClick }) => (
  <button
    type="button"
    className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
    onClick={onClick}
    aria-label={label}
  >
    {label}
  </button>
);

AnalysisButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const ContentEnhancement = () => {
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [content, setContent] = useState(
    "Explain how air resistance effects projectile motion and why it causes the projectile to not follow a perfect parabola."
  );

  // Handle applying the grammar fix
  const handleApplyFix = () => {
    setContent(
      "Explain how air resistance affects projectile motion and why it causes the projectile to not follow a perfect parabola."
    );
    setShowAnalysis(false);
  };

  // Handle ignoring the analysis
  const handleIgnore = () => {
    setShowAnalysis(false);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="bg-purple-100 rounded-full p-1 mr-2">
            <Zap className="w-4 h-4 text-purple-700" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">
            Content Enhancement
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Analyze and improve your questions for clarity, reading level, and quality.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg mb-6">
        <div className="bg-purple-50 px-4 py-2 border-b border-gray-200">
          <h4 className="text-sm font-medium text-purple-800">
            Content Analysis
          </h4>
        </div>

        <div className="p-4">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 mb-3"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Content input for analysis"
          />
          <div className="flex flex-wrap gap-2 mb-3">
            <AnalysisButton label="Check Clarity" />
            <AnalysisButton label="Grade Level" />
            <AnalysisButton label="Improve Options" />
            <AnalysisButton label="Fix Grammar" />
          </div>
        </div>

        {showAnalysis && (
          <div className="border-t border-gray-200 px-4 py-3 bg-yellow-50">
            <div className="flex items-start">
              <AlertCircle
                className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h5 className="text-sm font-medium text-yellow-800">
                  Clarity Issues Found
                </h5>
                <p className="text-xs text-yellow-700 mt-1">
                  Spelling error: "effects" should be "affects" (verb) instead of
                  "effects" (noun).
                </p>
                <div className="mt-2 bg-white p-2 rounded border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <span className="bg-yellow-100 line-through">
                      Explain how air resistance effects projectile motion
                    </span>{" "}
                    <span className="bg-green-100">
                      Explain how air resistance affects projectile motion
                    </span>{" "}
                    and why it causes the projectile to not follow a perfect
                    parabola.
                  </p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onClick={handleApplyFix}
                    aria-label="Apply grammar fix"
                  >
                    Apply Fix
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    onClick={handleIgnore}
                    aria-label="Ignore grammar suggestion"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ReadingLevelAnalysis />
    </div>
  );
};

ContentEnhancement.propTypes = {
  // Add props here if needed in the future
};

const ReadingLevelAnalysis = () => (
  <div className="border border-gray-200 rounded-lg">
    <div className="bg-purple-50 px-4 py-2 border-b border-gray-200">
      <h4 className="text-sm font-medium text-purple-800">
        Reading Level Analysis
      </h4>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-medium text-gray-700">
            Current Reading Level:
          </span>
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Grade 10-11
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Target:</span>
          <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
            Grade 10
          </span>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg mb-3">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: "95%" }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Grade 6</span>
          <span>Grade 8</span>
          <span>Grade 10</span>
          <span>Grade 12</span>
          <span>College</span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-3 mt-3">
        <h5 className="text-sm font-medium text-gray-700 mb-2">
          Vocabulary Complexity
        </h5>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 flex-grow">
              projectile motion
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Grade 10
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 flex-grow">
              air resistance
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Grade 8
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 flex-grow">parabola</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Grade 10-11
            </span>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none flex items-center justify-center"
          aria-label="Adjust to target grade level"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
            aria-hidden="true"
          >
            <path d="M15 4V2" />
            <path d="M15 16v-2" />
            <path d="M8 9h2" />
            <path d="M20 9h2" />
            <path d="M17.7 11.7a6 6 0 0 1-7.4 7.4A6 6 0 0 1 6 15a6 6 0 0 1 4-5.7A6 6 0 0 1 17.7 11.7Z" />
            <path d="M12 16v-3" />
            <path d="M4 22H2" />
            <path d="M22 22h-2" />
          </svg>
          Adjust to Target Grade Level
        </button>
      </div>
    </div>
  </div>
);

ReadingLevelAnalysis.propTypes = {
  // Add props here if needed in the future
};

export default ContentEnhancement;
export { ReadingLevelAnalysis };