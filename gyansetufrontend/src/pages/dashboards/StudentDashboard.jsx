import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Calendar,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Sliders,
  Sun,
  Zap,
  Flame,
  Crown,
  Users,
  Atom,
} from "lucide-react";
import ReactApexChart from "react-apexcharts";
import RecentAchievements from "../../components/students/studentDashboard/RecentAchievements";
import StatsSection from "../../components/students/studentDashboard/StatsSection";
import MiniChatbot from "../../components/students/studentDashboard/MiniChatbot";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../../components/students/studentDashboard/ProfilePopup";
import PopNotifications from "../../components/students/studentDashboard/PopNotifications";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

// Country Bar Chart Component
const CountryBarChart = ({ darkMode }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Hours Studied",
        data: [5, 3, 7, 4, 8, 9, 6],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        background: darkMode ? "#341b47" : "#f3e8ff",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " hrs";
        },
        style: {
          colors: ["#000000"],
        },
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        tickAmount: 12,
        min: 0,
        max: 12,
        labels: {
          formatter: function (val) {
            return val;
          },
        },
        title: {
          text: "Hours",
          style: {
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        title: {
          text: "Day of Week",
          style: {
            fontWeight: 600,
          },
        },
      },
      colors: darkMode ? ["#A855F7", "#EC4899", "#F472B6"] : ["#b6d238", "#b6d238", "#b6d238"],
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " hours";
          },
        },
      },
    },
  });

  useEffect(() => {
    if (darkMode) {
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          theme: { mode: "dark" },
          xaxis: {
            ...prev.options.xaxis,
            labels: { style: { colors: "#ccc" } },
            title: {
              ...prev.options.xaxis.title,
              style: {
                color: "#ccc",
                fontWeight: 600,
              },
            },
          },
          yaxis: {
            ...prev.options.yaxis,
            labels: { style: { colors: "#ccc" } },
            title: {
              ...prev.options.yaxis.title,
              style: {
                color: "#ccc",
                fontWeight: 600,
              },
            },
          },
          dataLabels: {
            ...prev.options.dataLabels,
            style: {
              colors: ["#fff"],
            },
          },
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          theme: { mode: "light" },
          xaxis: {
            ...prev.options.xaxis,
            labels: { style: { colors: "#525252" } },
            title: {
              ...prev.options.xaxis.title,
              style: {
                color: "#525252",
                fontWeight: 600,
              },
            },
          },
          yaxis: {
            ...prev.options.yaxis,
            labels: { style: { colors: "#525252" } },
            title: {
              ...prev.options.yaxis.title,
              style: {
                color: "#525252",
                fontWeight: 600,
              },
            },
          },
          dataLabels: {
            ...prev.options.dataLabels,
            style: {
              colors: ["#000000"],
            },
          },
        },
      }));
    }
  }, [darkMode]);

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

// Attendance Pie Chart Component
const AttendancePieChart = ({ darkMode }) => {
  const [state] = useState({
    series: [75, 25], // 75% present, 25% absent
    options: {
      chart: {
        type: 'donut',
        height: 350,
        background: darkMode ? "#341b47" : "#f3e8ff",
      },
      labels: ['Present', 'Absent'],
      colors: darkMode ? ['#A855F7', '#6366F1'] : ['#b6d238', '#8B5CF6'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: darkMode ? '#fff' : '#1F2937',
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: darkMode ? '#fff' : '#1F2937',
                formatter: function (val) {
                  return val + '%';
                }
              },
              total: {
                show: true,
                label: 'Attendance',
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: darkMode ? '#fff' : '#1F2937',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) / w.globals.seriesTotals.length + '%';
                }
              }
            }
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        labels: {
          colors: darkMode ? '#fff' : '#1F2937'
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });

  return (
    <div className="w-full">
      <div className={`rounded-2xl shadow-md overflow-hidden p-5 transition-all duration-300 hover:shadow-lg ${
        darkMode ? "bg-[#341b47]" : "bg-white"
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : ""}`}>Attendance</h3>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
              Overall attendance rate
            </p>
          </div>
        </div>
        <div className="h-[350px]">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [statusEnabled, setStatusEnabled] = useState(true);
  const [navExpanded, setNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState(""); // Initialize as empty string
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.firstName) {
      setUserName(userData.firstName);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavToggle = useCallback((expanded) => {
    setNavExpanded(expanded);
  }, [setNavExpanded]);

  // Map icon strings to Lucide components
  const iconMap = {
    flame: Flame,
    crown: Crown,
    users: Users,
    atom: Atom,
  };

  const achievementsData = [
    {
      id: 1,
      icon: "flame",
      points: 100,
      title: "Learning Streak!",
      description: "A month of consistent learning",
    },
    {
      id: 2,
      icon: "crown",
      points: 500,
      title: "Subject Master",
      description: "Top scorer in Advanced Algebra",
    },
    {
      id: 3,
      icon: "users",
      points: 250,
      title: "Group Projects",
      description: "2/3 Projects",
    },
    {
      id: 4,
      icon: "atom",
      points: 300,
      title: "Quiz Champion",
      description: "Perfect score in Physics Quiz",
    },
  ].map((achievement) => ({
    ...achievement,
    IconComponent: iconMap[achievement.icon],
  }));

  const statsData = { quizzesCompleted: 14, hoursSpent: 6 };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#5b3a64]" : "bg-gray-100"} transition-colors duration-300 p-4`}>
      <div className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
          : "bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400"
      } rounded-[30px] p-4 transition-colors duration-300`}>
        <header className="flex justify-between items-center">
          {/* Profile Section */}
          <div className="w-full">
            <h3 className={`text-4xl font-medium left-6 ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-violet-600 to-purple-300 bg-clip-text text-transparent"
            } pb-1 leading-tight transition-colors duration-300`}>
              {getGreeting()}, {userName}!
            </h3>
          </div>

          <div className="flex items-center gap-4">
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
            <div 
              className={`w-10 h-10 rounded-full ${
                darkMode ? "bg-[#341b47]" : "bg-white"
              } flex items-center justify-center shadow-md relative cursor-pointer transition-colors duration-300`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">5</span>
              </div>
            </div>
            <PopNotifications 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
            <ProfilePopup />
          </div>
        </header>

        <div className="p-6">
          {/* Profile and Achievements Section */}
          <div className="flex flex-col md:flex-row gap-20 mb-8">
            <div className="w-full md:w-3/4">
              <RecentAchievements
                achievements={achievementsData}
                stats={statsData}
              />
            </div>

            <div className="w-full md:w-1/2">
              <MiniChatbot />
            </div>
          </div>

          {/* Time Analysis and Calendar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <AttendancePieChart darkMode={darkMode} />
            </div>

            <div className="w-full md:w-2/3">
              <div className={`rounded-2xl shadow-md overflow-hidden p-5 transition-all duration-300 hover:shadow-lg ${
                darkMode ? "bg-[#341b47]" : "bg-white"
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : ""}`}>Time spend</h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                      Weekly time analysis
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      darkMode ? "bg-[#5b3a64]" : "bg-purple-50"
                    }`}>
                      <ArrowUpRight size={16} className={darkMode ? "text-gray-300" : "dark:text-gray-300"} />
                    </button>
                  </div>
                </div>
                <div className="h-[350px]">
                  <CountryBarChart darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <StatsSection stats={statsData} />
        </div>
      </div>
    </div>
  );
};

const StudentDashboardPage = () => {
  return (
   
      <StudentDashboard />

  );
};

export default StudentDashboardPage;
