import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/api/authService';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  TrendingUp,
  Award,
  DollarSign,
  Plus,
  Eye,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { IoMoonOutline, IoSunnyOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { useInstitute } from "../../context/InstituteContext";

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const { darkMode, toggleTheme } = useTheme();
  const instituteContext = useInstitute();
  
  // Add null checks for classes and teachers
  const classes = instituteContext?.classes || [];
  const teachers = instituteContext?.teachers || [];
  
  const [profileImage, setProfileImage] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    totalStudents: classes.reduce((acc, curr) => acc + (curr.students?.length || 0), 0),
    totalTeachers: teachers.length,
    totalParents: 1156,
    totalClasses: classes.length,
    totalRevenue: 125000,
    completionRate: 87
  });

  const [attendanceData] = useState({
    dailyTrends: [
      { date: '2025-05-26', students: 85, teachers: 95 },
      { date: '2025-05-27', students: 88, teachers: 100 },
      { date: '2025-05-28', students: 82, teachers: 90 },
      { date: '2025-05-29', students: 90, teachers: 95 },
      { date: '2025-05-30', students: 87, teachers: 100 },
      { date: '2025-05-31', students: 89, teachers: 95 },
      { date: '2025-06-01', students: 91, teachers: 100 },
    ],
    classWise: [
      { class: '10A', present: 28, absent: 2, total: 30 },
      { class: '10B', present: 25, absent: 3, total: 28 },
      { class: '11A', present: 26, absent: 4, total: 30 },
      { class: '11B', present: 22, absent: 5, total: 27 },
    ]
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'enrollment', message: 'New student John Doe enrolled in Grade 10-A', time: '2 hours ago', icon: Users },
    { id: 2, type: 'teacher', message: 'Teacher Sarah Wilson created new assignment for Math Class', time: '4 hours ago', icon: GraduationCap },
    { id: 3, type: 'payment', message: 'Payment received from parent Maria Garcia', time: '6 hours ago', icon: DollarSign },
    { id: 4, type: 'announcement', message: 'School holiday announcement published', time: '1 day ago', icon: Bell }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: 'Parent-Teacher Meeting', date: '2025-06-05', time: '10:00 AM' },
    { id: 2, title: 'Annual Sports Day', date: '2025-06-12', time: '9:00 AM' },
    { id: 3, title: 'Science Fair', date: '2025-06-18', time: '2:00 PM' },
    { id: 4, title: 'Mid-term Examinations', date: '2025-06-25', time: '8:00 AM' }
  ]);

  const [performanceData] = useState([
    { 
      subject: 'Mathematics',
      averageScore: 82,
      highestScore: 95,
      lowestScore: 68,
      passRate: 92,
      improvement: '+5%'
    },
    { 
      subject: 'Science',
      averageScore: 78,
      highestScore: 92,
      lowestScore: 65,
      passRate: 88,
      improvement: '+3%'
    },
    { 
      subject: 'English',
      averageScore: 85,
      highestScore: 97,
      lowestScore: 72,
      passRate: 94,
      improvement: '+4%'
    },
    { 
      subject: 'History',
      averageScore: 80,
      highestScore: 94,
      lowestScore: 70,
      passRate: 90,
      improvement: '+2%'
    },
    { 
      subject: 'Geography',
      averageScore: 83,
      highestScore: 96,
      lowestScore: 71,
      passRate: 91,
      improvement: '+6%'
    }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState('Current Term');

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
    return () => clearInterval(timer);
  }, []);

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

  const StatCard = ({ title, value, icon: Icon, color = 'blue', onClick, darkMode }) => (
    <div className={`${
      darkMode ? "bg-[#341b47] hover:bg-[#4a1f5e]" : "bg-white hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]"
    } rounded-xl shadow-sm border ${
      darkMode ? "border-[#4a1f5e]" : "border-gray-100"
    } p-6 transition-all duration-200 cursor-pointer group transform hover:scale-105`} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } text-sm font-medium`}>{title}</p>
          <p className={`${
            darkMode ? "text-white" : "text-gray-900"
          } text-2xl font-bold mt-1`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${
          darkMode ? "bg-[#4a1f5e]" : `bg-${color}-100`
        } group-hover:${
          darkMode ? "bg-[#5b2a6e]" : `bg-${color}-200`
        } transition-colors`}>
          <Icon className={`${
            darkMode ? "text-white" : `text-${color}-600`
          }`} size={24} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick, darkMode }) => (
    <div 
      className={`${
        darkMode ? "bg-[#341b47] hover:bg-[#4a1f5e]" : "bg-white hover:shadow-md"
      } rounded-xl shadow-sm border ${
        darkMode ? "border-[#4a1f5e]" : "border-gray-100"
      } p-6 transition-all duration-200 cursor-pointer group transform hover:scale-105`} 
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${
          darkMode ? "bg-[#4a1f5e]" : `bg-${color}-100`
        } group-hover:${
          darkMode ? "bg-[#5b2a6e]" : `bg-${color}-200`
        } transition-colors`}>
          <Icon className={`${
            darkMode ? "text-white" : `text-${color}-600`
          }`} size={20} />
        </div>
        <div className="flex-1">
          <h4 className={`${
            darkMode ? "text-white" : "text-gray-900"
          } font-semibold`}>{title}</h4>
          <p className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } text-sm mt-1`}>{description}</p>
        </div>
        <ArrowRight className={`${
          darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-600"
        } transition-colors`} size={16} />
      </div>
    </div>
  );

  const handleStatClick = (type) => {
    if (type === 'students') {
      navigate('/students');
    }
    console.log(`Navigate to ${type} page`);
  };

  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action);
    if (action === 'add-student') {
      console.log('Navigating to /institute/students');
      navigate('/institute/students', { state: { openAddStudent: true } });
    } else if (action === 'create-class') {
      console.log('Navigating to /institute/classes');
      navigate('/institute/classes', { state: { openAddClass: true } });
    } else if (action === 'add-teacher') {
      console.log('Navigating to /institute/teachers');
      navigate('/institute/teachers', { state: { openAddTeacher: true } });
    } else if (action === 'view-reports') {
      console.log('Navigating to /institute/reports');
      navigate('/institute/reports');
    }
    console.log(`Execute ${action} action`);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#5b3a64]" : "bg-gray-100"} transition-colors duration-300`}>
      <div className={`transition-all duration-300 flex-1 px-4 md:px-8 py-6`}>
        {/* Floating dashboard container with rounded corners */}
        <div className={`${
          darkMode
            ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
            : "bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400"
        } rounded-[30px] shadow-lg w-full transition-all duration-300`}>
          <div className="p-6 md:p-8">
            {/* Header with greeting and utility icons */}
            <div className="flex justify-between items-start mb-6">
              {/* Greeting section */}
              <div>
                <h1 className={`text-2xl md:text-4xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                } transition-colors duration-300`}>
                  {greeting}, {user?.firstName || "Admin"}!
                </h1>
                <h2 className={`${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } text-base md:text-lg mt-2 transition-colors duration-300`}>
                  Welcome back! Here's what's happening at your institute today.
                </h2>
              </div>

              {/* Utility Icons and Logout */}
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
                <button
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "hover:bg-[#341b47] text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  } transition-colors duration-300`}
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
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 ${
                    darkMode
                      ? "bg-[#341b47] hover:bg-purple-800"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white rounded-lg transition-colors duration-300`}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Total Students" 
                value={stats.totalStudents.toLocaleString()} 
                icon={Users} 
                color="blue"
                onClick={() => handleStatClick('students')}
                darkMode={darkMode}
              />
              <StatCard 
                title="Total Teachers" 
                value={stats.totalTeachers} 
                icon={GraduationCap} 
                color="green"
                onClick={() => handleStatClick('teachers')}
                darkMode={darkMode}
              />
              <StatCard 
                title="Total Classes" 
                value={stats.totalClasses} 
                icon={BookOpen} 
                color="purple"
                onClick={() => handleStatClick('classes')}
                darkMode={darkMode}
              />
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-4 transition-colors duration-300`}>Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                  title="Add New Student"
                  description="Enroll a new student"
                  icon={Plus}
                  color="blue"
                  onClick={() => handleQuickAction('add-student')}
                  darkMode={darkMode}
                />
                <QuickActionCard
                  title="Create Class"
                  description="Set up a new class"
                  icon={BookOpen}
                  color="green"
                  onClick={() => handleQuickAction('create-class')}
                  darkMode={darkMode}
                />
                <QuickActionCard
                  title="Add Teacher"
                  description="Hire a new teacher"
                  icon={GraduationCap}
                  color="purple"
                  onClick={() => handleQuickAction('add-teacher')}
                  darkMode={darkMode}
                />
                <QuickActionCard
                  title="View Reports"
                  description="Check analytics"
                  icon={BarChart3}
                  color="orange"
                  onClick={() => handleQuickAction('view-reports')}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Attendance Charts */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-300`}>Attendance Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} p-6 rounded-xl shadow-sm border ${darkMode ? "border-[#4a1f5e]" : "border-purple-100"} transition-colors duration-300`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-purple-200" : "text-purple-800"} transition-colors duration-300`}>Daily Attendance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceData.dailyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4a1f5e" : "#e5e7eb"} />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} stroke={darkMode ? "#e5e7eb" : "#374151"} />
                      <YAxis domain={[0, 100]} stroke={darkMode ? "#e5e7eb" : "#374151"} />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        contentStyle={{
                          backgroundColor: darkMode ? "#341b47" : "white",
                          border: darkMode ? "1px solid #4a1f5e" : "1px solid #e5e7eb",
                          color: darkMode ? "#e5e7eb" : "#374151"
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="students" stroke="#7C3AED" name="Students %" strokeWidth={2} />
                      <Line type="monotone" dataKey="teachers" stroke="#84cc16" name="Teachers %" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} p-6 rounded-xl shadow-sm border ${darkMode ? "border-[#4a1f5e]" : "border-purple-100"} transition-colors duration-300`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-purple-200" : "text-purple-800"} transition-colors duration-300`}>Class-wise Attendance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData.classWise}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4a1f5e" : "#e5e7eb"} />
                      <XAxis dataKey="class" stroke={darkMode ? "#e5e7eb" : "#374151"} />
                      <YAxis stroke={darkMode ? "#e5e7eb" : "#374151"} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? "#341b47" : "white",
                          border: darkMode ? "1px solid #4a1f5e" : "1px solid #e5e7eb",
                          color: darkMode ? "#e5e7eb" : "#374151"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="present" fill="#84cc16" name="Present" />
                      <Bar dataKey="absent" fill="#7C3AED" name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-[#4a1f5e]" : "border-gray-100"} p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}>Recent Activities</h3>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className={`flex items-start space-x-3 p-3 hover:bg-${darkMode ? "[#4a1f5e]" : "gray-50"} rounded-lg transition-colors duration-300`}>
                        <div className={`w-8 h-8 ${darkMode ? "bg-[#4a1f5e]" : "bg-violet-100"} rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                          <IconComponent className={`${darkMode ? "text-violet-300" : "text-violet-600"} transition-colors duration-300`} size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm transition-colors duration-300`}>{activity.message}</p>
                          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs mt-1 transition-colors duration-300`}>{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-[#4a1f5e]" : "border-gray-100"} p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}>Upcoming Events</h3>
                  <button className={`text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center transition-colors duration-300`}>
                    Add Event <Plus size={14} className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`flex items-center space-x-3 p-3 hover:bg-${darkMode ? "[#4a1f5e]" : "gray-50"} rounded-lg transition-colors duration-300 cursor-pointer group`}>
                      <div className={`w-10 h-10 ${darkMode ? "bg-[#4a1f5e]" : "bg-violet-100"} rounded-lg flex items-center justify-center group-hover:bg-violet-200 transition-colors duration-300`}>
                        <Calendar className={`${darkMode ? "text-violet-300" : "text-violet-600"} transition-colors duration-300`} size={16} />
                      </div>
                      <div className="flex-1">
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} font-medium text-sm transition-colors duration-300`}>{event.title}</p>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs transition-colors duration-300`}>{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className={`mt-8 ${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-[#4a1f5e]" : "border-gray-100"} p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}>Subject-wise Performance</h3>
                <div className="flex items-center space-x-2">
                  <select 
                    className={`px-3 py-1 border ${darkMode ? "border-[#4a1f5e] bg-[#341b47] text-gray-300" : "border-gray-300 bg-white text-gray-800"} rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors duration-300`}
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                  >
                    <option>Current Term</option>
                    <option>Previous Term</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4a1f5e" : "#e5e7eb"} />
                    <XAxis type="number" domain={[0, 100]} stroke={darkMode ? "#e5e7eb" : "#374151"} />
                    <YAxis dataKey="subject" type="category" width={100} stroke={darkMode ? "#e5e7eb" : "#374151"} />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      labelStyle={{ color: darkMode ? "#e5e7eb" : "#7C3AED" }}
                      contentStyle={{
                        backgroundColor: darkMode ? "#341b47" : "white",
                        border: darkMode ? "1px solid #4a1f5e" : "1px solid #e5e7eb",
                        color: darkMode ? "#e5e7eb" : "#374151"
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="averageScore" 
                      fill="#7C3AED" 
                      name="Average Score"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar 
                      dataKey="passRate" 
                      fill="#84cc16" 
                      name="Pass Rate"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.map((subject) => (
                  <div key={subject.subject} className={`${darkMode ? "bg-[#4a1f5e]" : "bg-gray-50"} p-4 rounded-lg transition-colors duration-300`}>
                    <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}>{subject.subject}</h4>
                    <div className="mt-2 space-y-1">
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}>
                        Highest Score: <span className="text-green-600 font-medium">{subject.highestScore}%</span>
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}>
                        Lowest Score: <span className="text-red-600 font-medium">{subject.lowestScore}%</span>
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}>
                        Improvement: <span className="text-blue-600 font-medium">{subject.improvement}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;