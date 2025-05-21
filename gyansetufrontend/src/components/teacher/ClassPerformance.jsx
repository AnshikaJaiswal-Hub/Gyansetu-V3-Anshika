import React, { useState, useEffect } from "react";
import { FiZoomIn } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassPerformance = ({ selectedClass, selectedSection }) => {
  // Local state for ClassPerformance dropdowns
  const [localSelectedClass, setLocalSelectedClass] = useState(selectedClass);
  const [localSelectedSection, setLocalSelectedSection] =
    useState(selectedSection);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filterMode, setFilterMode] = useState("classAndSection");
  const [filterClass, setFilterClass] = useState(localSelectedClass);
  const [filterSection, setFilterSection] = useState(localSelectedSection);

  // Use the theme context
  const { darkMode } = useTheme();

  // Mock performance data for the chart (same as in TeacherDashBoard)
  const classData = {
    "6-A": {
      totalStudents: 28,
      avgAttendance: "90%",
      completionRate: "82%",
      needAttention: 2,
      performanceData: { avgScore: "85%", topPerformers: "5" },
      studentsNeedingAttention: [
        {
          name: "Varun Singh",
          issue: "Missed last two homework assignments",
          subject: "English",
        },
      ],
    },
    "6-B": {
      totalStudents: 26,
      avgAttendance: "88%",
      completionRate: "80%",
      needAttention: 3,
      performanceData: { avgScore: "82%", topPerformers: "4" },
      studentsNeedingAttention: [
        {
          name: "Aditya Verma",
          issue: "Struggling with reading comprehension",
          subject: "English",
        },
      ],
    },
    "7-A": {
      totalStudents: 30,
      avgAttendance: "88%",
      completionRate: "79%",
      needAttention: 3,
      performanceData: { avgScore: "88%", topPerformers: "3" },
      studentsNeedingAttention: [
        {
          name: "Priya Sharma",
          issue: "Score dropped by 12% in recent tests",
          subject: "Science",
        },
      ],
    },
    "7-B": {
      totalStudents: 29,
      avgAttendance: "86%",
      completionRate: "78%",
      needAttention: 4,
      performanceData: { avgScore: "84%", topPerformers: "4" },
      studentsNeedingAttention: [
        {
          name: "Ananya Reddy",
          issue: "Missing homework submissions",
          subject: "Science",
        },
      ],
    },
    "8-A": {
      totalStudents: 29,
      avgAttendance: "87%",
      completionRate: "81%",
      needAttention: 2,
      performanceData: { avgScore: "87%", topPerformers: "2" },
      studentsNeedingAttention: [
        {
          name: "Arun Patel",
          issue: "Irregular attendance in the last week",
          subject: "Math",
        },
      ],
    },
    "8-B": {
      totalStudents: 28,
      avgAttendance: "85%",
      completionRate: "79%",
      needAttention: 3,
      performanceData: { avgScore: "83%", topPerformers: "3" },
      studentsNeedingAttention: [
        {
          name: "Ravi Kumar",
          issue: "Needs extra help with algebra",
          subject: "Math",
        },
      ],
    },
    "9-A": {
      totalStudents: 31,
      avgAttendance: "86%",
      completionRate: "78%",
      needAttention: 3,
      performanceData: { avgScore: "86%", topPerformers: "3" },
      studentsNeedingAttention: [
        {
          name: "Meera Joshi",
          issue: "Participation has decreased in class",
          subject: "Social Studies",
        },
      ],
    },
    "9-B": {
      totalStudents: 30,
      avgAttendance: "84%",
      completionRate: "76%",
      needAttention: 4,
      performanceData: { avgScore: "81%", topPerformers: "4" },
      studentsNeedingAttention: [
        {
          name: "Suresh Nair",
          issue: "Struggling with history concepts",
          subject: "Social Studies",
        },
      ],
    },
    "10-A": {
      totalStudents: 32,
      avgAttendance: "85%",
      completionRate: "76%",
      needAttention: 4,
      performanceData: { avgScore: "85%", topPerformers: "4" },
      studentsNeedingAttention: [
        {
          name: "Rahul Kumar",
          issue: "Performance dropped by 15% in recent tests",
          subject: "Math",
        },
      ],
    },
    "10-B": {
      totalStudents: 31,
      avgAttendance: "83%",
      completionRate: "74%",
      needAttention: 5,
      performanceData: { avgScore: "80%", topPerformers: "5" },
      studentsNeedingAttention: [
        {
          name: "Neha Sharma",
          issue: "Needs support with geometry",
          subject: "Math",
        },
      ],
    },
    "11-A": {
      totalStudents: 27,
      avgAttendance: "83%",
      completionRate: "74%",
      needAttention: 5,
      performanceData: { avgScore: "83%", topPerformers: "5" },
      studentsNeedingAttention: [
        {
          name: "Isha Gupta",
          issue: "Struggling with new syllabus topics",
          subject: "Physics",
        },
      ],
    },
    "11-B": {
      totalStudents: 26,
      avgAttendance: "81%",
      completionRate: "72%",
      needAttention: 6,
      performanceData: { avgScore: "79%", topPerformers: "6" },
      studentsNeedingAttention: [
        {
          name: "Vikram Singh",
          issue: "Needs help with physics concepts",
          subject: "Physics",
        },
      ],
    },
    "12-A": {
      totalStudents: 25,
      avgAttendance: "89%",
      completionRate: "85%",
      needAttention: 3,
      performanceData: { avgScore: "89%", topPerformers: "3" },
      studentsNeedingAttention: [
        {
          name: "Karan Malhotra",
          issue: "Needs support for upcoming board exams",
          subject: "Chemistry",
        },
      ],
    },
    "12-B": {
      totalStudents: 24,
      avgAttendance: "87%",
      completionRate: "83%",
      needAttention: 4,
      performanceData: { avgScore: "85%", topPerformers: "4" },
      studentsNeedingAttention: [
        {
          name: "Pooja Desai",
          issue: "Preparing for board exams",
          subject: "Chemistry",
        },
      ],
    },
  };

  // Compute currentClassData based on localSelectedClass and localSelectedSection
  const classKey = `${localSelectedClass}-${localSelectedSection}`;
  const currentClassData = classData[classKey] || classData["6-A"];

  // Sync local state with global state when global state changes
  useEffect(() => {
    setLocalSelectedClass(selectedClass);
    setLocalSelectedSection(selectedSection);
    setFilterClass(selectedClass);
    setFilterSection(selectedSection);
  }, [selectedClass, selectedSection]);

  // Sync filterClass and filterSection with localSelectedClass and localSelectedSection
  useEffect(() => {
    setFilterClass(localSelectedClass);
    setFilterSection(localSelectedSection);
  }, [localSelectedClass, localSelectedSection]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFilterModeChange = (e) => {
    setFilterMode(e.target.value);
    if (e.target.value === "classAndSection") {
      setFilterClass(localSelectedClass);
      setFilterSection(localSelectedSection);
    }
  };

  const handleFilterClassChange = (e) => {
    setFilterClass(e.target.value);
  };

  const handleFilterSectionChange = (e) => {
    setFilterSection(e.target.value);
  };

  const handleLocalClassChange = (newClass) => {
    setLocalSelectedClass(newClass);
  };

  const handleLocalSectionChange = (newSection) => {
    setLocalSelectedSection(newSection);
  };

  // Filter performance data based on the selected mode using classData
  const filteredPerformance = () => {
    const filteredData = [];

    if (filterMode === "all") {
      // Group by class and calculate average score for each class
      const classScores = {};

      Object.keys(classData).forEach((key) => {
        const [classNum] = key.split("-");
        const performance = classData[key].performanceData;
        const avgScore = parseFloat(performance.avgScore);

        if (!classScores[classNum]) {
          classScores[classNum] = { totalScore: 0, count: 0 };
        }
        classScores[classNum].totalScore += avgScore;
        classScores[classNum].count += 1;
      });

      Object.keys(classScores).forEach((classNum) => {
        const avgScore =
          classScores[classNum].totalScore / classScores[classNum].count;
        filteredData.push({
          class: classNum,
          avgScore: avgScore.toFixed(2), // Round to 2 decimal places
        });
      });

      // Sort by class number for consistent display
      filteredData.sort((a, b) => parseInt(a.class) - parseInt(b.class));
    } else if (filterMode === "class") {
      // Show all sections for the selected class
      Object.keys(classData).forEach((key) => {
        const [classNum, section] = key.split("-");
        if (classNum === filterClass) {
          const performance = classData[key].performanceData;
          filteredData.push({
            class: classNum,
            section,
            avgScore: parseFloat(performance.avgScore),
          });
        }
      });
    } else {
      // classAndSection: Show only the specific class and section
      Object.keys(classData).forEach((key) => {
        const [classNum, section] = key.split("-");
        if (classNum === filterClass && section === filterSection) {
          const performance = classData[key].performanceData;
          filteredData.push({
            class: classNum,
            section,
            avgScore: parseFloat(performance.avgScore),
          });
        }
      });
    }

    return filteredData;
  };

  // Prepare chart data for the popup with dark mode support
  const chartData = {
    labels: filteredPerformance().map((data) =>
      filterMode === "class"
        ? `Section ${data.section}`
        : filterMode === "all"
        ? `Class ${data.class}`
        : `Class ${data.class}-${data.section}`
    ),
    datasets: [
      {
        label: "Average Score",
        data: filteredPerformance().map((data) => data.avgScore),
        backgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.7)"
          : "rgba(168, 85, 247, 0.5)",
        borderColor: darkMode
          ? "rgba(96, 165, 250, 1)"
          : "rgba(168, 85, 247, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Average Score (%)",
          color: darkMode ? "#F0F2F5" : undefined,
        },
        ticks: {
          color: darkMode ? "#A8B3CF" : undefined,
        },
        grid: {
          color: darkMode ? "rgba(168, 179, 207, 0.15)" : undefined,
        },
      },
      x: {
        title: {
          display: true,
          text:
            filterMode === "all"
              ? "Class"
              : filterMode === "class"
              ? "Section"
              : "Selection",
          color: darkMode ? "#F0F2F5" : undefined,
        },
        ticks: {
          color: darkMode ? "#A8B3CF" : undefined,
        },
        grid: {
          color: darkMode ? "rgba(168, 179, 207, 0.15)" : undefined,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#F0F2F5" : undefined,
        },
      },
      title: {
        display: true,
        text: "Class Performance Overview",
        color: darkMode ? "#F0F2F5" : undefined,
      },
      tooltip: {
        backgroundColor: darkMode ? "#424B64" : undefined,
        titleColor: darkMode ? "#F0F2F5" : undefined,
        bodyColor: darkMode ? "#F0F2F5" : undefined,
      },
    },
  };

  // Chart data for the main view
  const mainChartData = {
    labels: [`Class ${localSelectedClass}-${localSelectedSection}`],
    datasets: [
      {
        label: "Average Score",
        data: [
          parseFloat(
            currentClassData?.performanceData?.avgScore || "85%"
          ).toFixed(0),
        ],
        backgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.7)"
          : "rgba(168, 85, 247, 0.5)",
        borderColor: darkMode
          ? "rgba(96, 165, 250, 1)"
          : "rgba(168, 85, 247, 1)",
        borderWidth: 1,
      },
    ],
  };

  const mainChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Average Score (%)",
          color: darkMode ? "#F0F2F5" : undefined,
        },
        ticks: {
          color: darkMode ? "#A8B3CF" : undefined,
        },
        grid: {
          color: darkMode ? "rgba(168, 179, 207, 0.15)" : undefined,
        },
      },
      x: {
        title: {
          display: true,
          text: "Class-Section",
          color: darkMode ? "#F0F2F5" : undefined,
        },
        ticks: {
          color: darkMode ? "#A8B3CF" : undefined,
        },
        grid: {
          color: darkMode ? "rgba(168, 179, 207, 0.15)" : undefined,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#F0F2F5" : undefined,
        },
      },
      title: {
        display: true,
        text: `Performance for Class ${localSelectedClass}-${localSelectedSection}`,
        color: darkMode ? "#F0F2F5" : undefined,
      },
      tooltip: {
        backgroundColor: darkMode ? "#424B64" : undefined,
        titleColor: darkMode ? "#F0F2F5" : undefined,
        bodyColor: darkMode ? "#F0F2F5" : undefined,
      },
    },
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[#231130]" : "bg-gray-200"
      } p-4 md:p-6 rounded-[3rem] w-full mt-6 relative transition-colors duration-300`}
    >
      {/* Header Area */}
      <div className="mb-4 relative">
        <div className="flex flex-col justify-between items-start mb-4">
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-[#F0F2F5]" : "text-gray-800"
            } mb-3 transition-colors duration-300`}
          >
            Class {localSelectedClass}-{localSelectedSection} Performance
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full">
            <div className="flex items-center w-full md:w-auto">
              <label
                htmlFor="classSelect"
                className={`mr-2 ${
                  darkMode ? "text-[#A8B3CF]" : "text-gray-600"
                } text-sm whitespace-nowrap transition-colors duration-300`}
              >
                Select Class:
              </label>
              <select
                id="classSelect"
                value={localSelectedClass}
                onChange={(e) => handleLocalClassChange(e.target.value)}
                className={`border ${
                  darkMode
                    ? "border-gray-500 bg-[#231130] text-[#F0F2F5] focus:ring-purple-400"
                    : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                } rounded-md px-1 py-0.5 text-xs md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 w-24 md:w-auto transition-colors duration-300`}
              >
                {[...Array(7)].map((_, i) => {
                  const classValue = String(6 + i);
                  return (
                    <option key={classValue} value={classValue}>
                      Class {classValue}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center w-full md:w-auto">
              <label
                htmlFor="sectionSelect"
                className={`mr-2 ${
                  darkMode ? "text-[#A8B3CF]" : "text-gray-600"
                } text-sm whitespace-nowrap transition-colors duration-300`}
              >
                Select Section:
              </label>
              <select
                id="sectionSelect"
                value={localSelectedSection}
                onChange={(e) => handleLocalSectionChange(e.target.value)}
                className={`border ${
                  darkMode
                    ? "border-gray-500 bg-[#231130] text-[#F0F2F5] focus:ring-purple-400"
                    : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                } rounded-md px-1 py-0.5 text-xs md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 w-16 md:w-auto transition-colors duration-300`}
              >
                {["A", "B", "C", "D", "E", "F"].map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            {/* Explore Icon */}
            <button
              onClick={togglePopup}
              className={`${
                darkMode
                  ? "text-[#A8B3CF] hover:text-[#F0F2F5]"
                  : "text-gray-600 hover:text-gray-800"
              } focus:outline-none absolute top-0 right-0 md:static md:ml-auto transition-colors duration-300`}
              aria-label="Explore class performance"
            >
              <FiZoomIn className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`${
          darkMode ? "bg-[#341b47]" : "bg-white"
        } rounded-[2rem] p-4 md:p-6 transition-colors duration-300`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Average Score */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#7CB4FF]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.performanceData?.avgScore || "85%"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#A8B3CF]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Average Score
            </div>
          </div>

          {/* Top Performers */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#F0F2F5]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.performanceData?.topPerformers || "5"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#A8B3CF]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Top Performers
            </div>
          </div>

          {/* Visualization with Bar Chart */}
          <div
            className={`col-span-1 md:col-span-2 p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg h-64 transition-colors duration-300`}
          >
            {currentClassData?.performanceData ? (
              <Bar data={mainChartData} options={mainChartOptions} />
            ) : (
              <p
                className={`${
                  darkMode ? "text-[#A8B3CF]" : "text-gray-500"
                } text-sm text-center transition-colors duration-300`}
              >
                No Data Available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal with Blur Backdrop */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 px-4">
          <div
            className={`${
              darkMode ? "bg-[#343B52]" : "bg-white"
            } w-full max-w-[90vw] h-auto max-h-[90vh] lg:w-[800px] lg:h-[600px] rounded-[2rem] p-4 md:p-6 lg:p-8 shadow-lg relative overflow-y-auto transition-colors duration-300`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2
                className={`text-lg md:text-xl font-semibold ${
                  darkMode ? "text-[#F0F2F5]" : "text-gray-800"
                } transition-colors duration-300`}
              >
                Class Performance
              </h2>
              <button
                onClick={togglePopup}
                className={`${
                  darkMode
                    ? "text-[#A8B3CF] hover:text-[#F0F2F5]"
                    : "text-gray-600 hover:text-gray-800"
                } focus:outline-none transition-colors duration-300`}
                aria-label="Close popup"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filter Controls */}
            <div className="mb-4 md:mb-6 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex items-center">
                <label
                  htmlFor="filterMode"
                  className={`w-20 ${
                    darkMode ? "text-[#A8B3CF]" : "text-gray-600"
                  } text-sm whitespace-nowrap transition-colors duration-300`}
                >
                  Filter By:
                </label>
                <select
                  id="filterMode"
                  value={filterMode}
                  onChange={handleFilterModeChange}
                  className={`border ${
                    darkMode
                      ? "border-gray-500 bg-[#525D77] text-[#F0F2F5] focus:ring-purple-400"
                      : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                  } rounded-md px-1 py-0.5 text-xs md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 w-32 md:w-36 transition-colors duration-300`}
                >
                  <option value="all">All Students</option>
                  <option value="class">Class</option>
                  <option value="classAndSection">Class + Section</option>
                </select>
              </div>
              {filterMode !== "all" && (
                <div className="flex items-center">
                  <label
                    htmlFor="filterClass"
                    className={`w-20 ${
                      darkMode ? "text-[#A8B3CF]" : "text-gray-600"
                    } text-sm whitespace-nowrap transition-colors duration-300`}
                  >
                    Class:
                  </label>
                  <select
                    id="filterClass"
                    value={filterClass}
                    onChange={handleFilterClassChange}
                    className={`border ${
                      darkMode
                        ? "border-gray-500 bg-[#525D77] text-[#F0F2F5] focus:ring-purple-400"
                        : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                    } rounded-md px-1 py-0.5 text-xs md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 w-32 md:w-36 transition-colors duration-300`}
                  >
                    {[...Array(7)].map((_, i) => {
                      const classValue = String(6 + i);
                      return (
                        <option key={classValue} value={classValue}>
                          Class {classValue}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {filterMode === "classAndSection" && (
                <div className="flex items-center">
                  <label
                    htmlFor="filterSection"
                    className={`w-20 ${
                      darkMode ? "text-[#A8B3CF]" : "text-gray-600"
                    } text-sm whitespace-nowrap transition-colors duration-300`}
                  >
                    Section:
                  </label>
                  <select
                    id="filterSection"
                    value={filterSection}
                    onChange={handleFilterSectionChange}
                    className={`border ${
                      darkMode
                        ? "border-gray-500 bg-[#525D77] text-[#F0F2F5] focus:ring-purple-400"
                        : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                    } rounded-md px-1 py-0.5 text-xs md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 w-32 md:w-36 transition-colors duration-300`}
                  >
                    {["A", "B", "C", "D", "E", "F"].map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Visualization Chart in Popup */}
            <div className="h-[200px] md:h-[250px] lg:h-[300px] mb-4 md:mb-6">
              {filteredPerformance().length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <p
                  className={`${
                    darkMode ? "text-[#A8B3CF]" : "text-gray-500"
                  } text-sm text-center transition-colors duration-300`}
                >
                  No performance data available for the selected filter.
                </p>
              )}
            </div>

            {/* Summary Metrics Below Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 ${
                  darkMode ? "bg-[#424B64]" : "bg-gray-100"
                } rounded-lg transition-colors duration-300`}
              >
                <div
                  className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-[#7CB4FF]" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {currentClassData?.performanceData?.avgScore || "85%"}
                </div>
                <div
                  className={`${
                    darkMode ? "text-[#A8B3CF]" : "text-gray-500"
                  } text-sm mt-1 transition-colors duration-300`}
                >
                  Average Score
                </div>
              </div>
              <div
                className={`p-4 ${
                  darkMode ? "bg-[#424B64]" : "bg-gray-100"
                } rounded-lg transition-colors duration-300`}
              >
                <div
                  className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-[#F0F2F5]" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {currentClassData?.performanceData?.topPerformers || "5"}
                </div>
                <div
                  className={`${
                    darkMode ? "text-[#A8B3CF]" : "text-gray-500"
                  } text-sm mt-1 transition-colors duration-300`}
                >
                  Top Performers
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPerformance;
