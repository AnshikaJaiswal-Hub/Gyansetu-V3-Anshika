import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Calendar, TrendingUp, Award } from "lucide-react";

const StudentProgressReport = () => {
  // Sample data - replace with real data from your API
  const studentData = {
    name: "Sadaf Aalia",
    class: "Grade 10-A",
    rollNumber: "2024001",
  };

  const progressData = [
    {
      month: "Jan",
      Mathematics: 85,
      Science: 78,
      English: 92,
      History: 88,
      Geography: 82,
    },
    {
      month: "Feb",
      Mathematics: 88,
      Science: 82,
      English: 89,
      History: 85,
      Geography: 84,
    },
    {
      month: "Mar",
      Mathematics: 92,
      Science: 85,
      English: 94,
      History: 90,
      Geography: 87,
    },
    {
      month: "Apr",
      Mathematics: 87,
      Science: 88,
      English: 91,
      History: 86,
      Geography: 89,
    },
    {
      month: "May",
      Mathematics: 94,
      Science: 91,
      English: 96,
      History: 93,
      Geography: 91,
    },
    {
      month: "Jun",
      Mathematics: 90,
      Science: 89,
      English: 93,
      History: 91,
      Geography: 88,
    },
  ];

  const subjects = [
    "All Subjects",
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
  ];
  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  // Filter data based on selections
  const getFilteredData = () => {
    let filteredData = [...progressData];

    // Filter by month
    if (selectedMonth !== "All Months") {
      const monthIndex = months.indexOf(selectedMonth) - 1;
      if (monthIndex >= 0) {
        filteredData = [progressData[monthIndex]];
      }
    }

    // Filter by subject
    if (selectedSubject !== "All Subjects") {
      filteredData = filteredData.map((item) => ({
        month: item.month,
        [selectedSubject]: item[selectedSubject],
      }));
    }

    return filteredData;
  };

  // Get subjects to display in chart
  const getSubjectsToShow = () => {
    if (selectedSubject === "All Subjects") {
      return subjects.slice(1); // Remove 'All Subjects' option
    }
    return [selectedSubject];
  };

  // Calculate average scores
  const calculateAverage = () => {
    const data = getFilteredData();
    const subjectsToShow = getSubjectsToShow();

    let total = 0;
    let count = 0;

    data.forEach((monthData) => {
      subjectsToShow.forEach((subject) => {
        if (monthData[subject] !== undefined) {
          total += monthData[subject];
          count++;
        }
      });
    });

    return count > 0 ? (total / count).toFixed(1) : 0;
  };

  // Get highest score
  const getHighestScore = () => {
    const data = getFilteredData();
    const subjectsToShow = getSubjectsToShow();

    let highest = 0;

    data.forEach((monthData) => {
      subjectsToShow.forEach((subject) => {
        if (monthData[subject] !== undefined && monthData[subject] > highest) {
          highest = monthData[subject];
        }
      });
    });

    return highest;
  };

  const subjectColors = {
    Mathematics: "#7E57C2",
    Science: "#78909C",
    English: "#ED417A",
    History: "#D4E056",
    Geography: "#43A5F4",
  };

  return (
    <div className="bg-gray-100 p-2 sm:p-4 md:p-6 lg:pt-10  lg:pr-10 lg:pb-10">
      <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[30px] p-3 sm:p-4 md:p-6 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 md:space-y-0 mb-4 sm:mb-6 lg:mb-3 lg:flex-row">
            <div className="flex-1 lg:flex lg:items-center lg:space-x-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-violet-600 mb-2 sm:mb-4 lg:mb-4 lg:ml-2 xl:ml-6 text-center sm:text-left md:text-left">
                Student Progress Report
              </h1>
            </div>
            <div className="text-center sm:text-right md:text-right lg:text-right bg-white/20 rounded-lg p-3 sm:p-4 md:p-5 lg:p-0 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-900">
                {studentData.name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-base text-gray-600">
                {studentData.class}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-sm text-gray-500">
                Roll No: {studentData.rollNumber}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6 mb-4 sm:mb-6 lg:mb-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 md:space-x-8 lg:space-x-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-2 lg:mb-4 xl:mb-0">
                <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 text-gray-500" />
                  <label className="text-sm md:text-base lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                    Subject:
                  </label>
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full sm:w-auto md:w-48 lg:w-auto border border-gray-300 rounded-md px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 text-sm md:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-2">
                <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 text-gray-500" />
                  <label className="text-sm md:text-base lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                    Month:
                  </label>
                </div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full sm:w-auto md:w-48 lg:w-auto border border-gray-300 rounded-md px-3 py-2 md:px-4 md:py-3 lg:px-3 lg:py-2 text-sm md:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 mb-4 sm:mb-6 lg:mb-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-indigo-500">
                    {calculateAverage()}%
                  </p>
                </div>
                <div className="bg-violet-100 p-2 sm:p-3 md:p-4 lg:p-3 rounded-full">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 text-indigo-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-sm font-medium text-gray-600">
                    Highest Score
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-indigo-500">
                    {getHighestScore()}%
                  </p>
                </div>
                <div className="bg-purple-100 p-2 sm:p-3 md:p-4 lg:p-3 rounded-full">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 text-indigo-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6 sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-sm font-medium text-gray-600">
                    Total Subjects
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-purple-600">
                    {subjects.length - 1}
                  </p>
                </div>
                <div className="bg-indigo-100 p-2 sm:p-3 md:p-4 lg:p-3 rounded-full">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-6 lg:h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6">
            <div className="mb-4 lg:mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-900">
                {selectedSubject === "All Subjects"
                  ? "All Subjects"
                  : selectedSubject}{" "}
                Progress
                {selectedMonth !== "All Months" && ` - ${selectedMonth}`}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-base text-gray-600">
                Monthly performance overview
              </p>
            </div>

            <div className="h-64 sm:h-80 md:h-96 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getFilteredData()}
                  margin={{
                    top: 20,
                    right: window.innerWidth >= 1024 ? 30 : 15,
                    left: window.innerWidth >= 1024 ? 20 : 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize:
                        window.innerWidth < 640
                          ? 10
                          : window.innerWidth < 1024
                          ? 12
                          : 12,
                    }}
                    interval={0}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{
                      fontSize:
                        window.innerWidth < 640
                          ? 10
                          : window.innerWidth < 1024
                          ? 12
                          : 12,
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: window.innerWidth < 640 ? "10px" : "12px",
                    }}
                  />
                  {getSubjectsToShow().map((subject) => (
                    <Bar
                      key={subject}
                      dataKey={subject}
                      fill={subjectColors[subject]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Performance Table */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 lg:p-6 mt-4 sm:mt-6 lg:mt-6">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-4">
              Detailed Performance
            </h3>

            {/* Mobile Card View (up to sm) */}
            <div className="block sm:hidden space-y-4">
              {getFilteredData().map((row, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-center border-b pb-2">
                    {row.month}
                  </h4>
                  <div className="space-y-3">
                    {getSubjectsToShow().map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {subject}:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {row[subject]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${row[subject]}%`,
                                backgroundColor: subjectColors[subject],
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet Card View (sm to lg) */}
            <div className="hidden sm:block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {getFilteredData().map((row, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-5 shadow-sm"
                  >
                    <h4 className="font-semibold text-gray-900 mb-4 text-center border-b pb-3 text-lg">
                      {row.month}
                    </h4>
                    <div className="space-y-4">
                      {getSubjectsToShow().map((subject) => (
                        <div key={subject} className="flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {subject}
                            </span>
                            <span className="text-base font-bold text-gray-900">
                              {row[subject]}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full"
                              style={{
                                width: `${row[subject]}%`,
                                backgroundColor: subjectColors[subject],
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View (lg and up) - Original Design */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    {getSubjectsToShow().map((subject) => (
                      <th
                        key={subject}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {subject}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.month}
                      </td>
                      {getSubjectsToShow().map((subject) => (
                        <td
                          key={subject}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{row[subject]}%</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-20">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${row[subject]}%`,
                                  backgroundColor: subjectColors[subject],
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressReport;
