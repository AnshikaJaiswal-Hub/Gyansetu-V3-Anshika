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

const OverviewPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 1247,
    totalTeachers: 89,
    totalParents: 1156,
    totalClasses: 45,
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

  const StatCard = ({ title, value, icon: Icon, color = 'blue', onClick }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-200 cursor-pointer group transform hover:scale-105" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group transform hover:scale-105" 
      onClick={() => {
        console.log('QuickActionCard clicked:', title);
        onClick();
      }}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
          <Icon className={`text-${color}-600`} size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <ArrowRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={16} />
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
    <div className="p-6 bg-gray-100">
      <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-violet-600 mb-2">Institute Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening at your institute today.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-red-600 border border-gray-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Students" 
              value={stats.totalStudents.toLocaleString()} 
              icon={Users} 
              color="blue"
              onClick={() => handleStatClick('students')}
            />
            <StatCard 
              title="Total Teachers" 
              value={stats.totalTeachers} 
              icon={GraduationCap} 
              color="green"
              onClick={() => handleStatClick('teachers')}
            />
            <StatCard 
              title="Total Classes" 
              value={stats.totalClasses} 
              icon={BookOpen} 
              color="purple"
              onClick={() => handleStatClick('classes')}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                title="Add New Student"
                description="Enroll a new student"
                icon={Plus}
                color="blue"
                onClick={() => handleQuickAction('add-student')}
              />
              <QuickActionCard
                title="Create Class"
                description="Set up a new class"
                icon={BookOpen}
                color="green"
                onClick={() => handleQuickAction('create-class')}
              />
              <QuickActionCard
                title="Add Teacher"
                description="Hire a new teacher"
                icon={GraduationCap}
                color="purple"
                onClick={() => handleQuickAction('add-teacher')}
              />
              <QuickActionCard
                title="View Reports"
                description="Check analytics"
                icon={BarChart3}
                color="orange"
                onClick={() => handleQuickAction('view-reports')}
              />
            </div>
          </div>

          {/* Attendance Charts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-purple-800">Daily Attendance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData.dailyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#7C3AED" name="Students %" strokeWidth={2} />
                    <Line type="monotone" dataKey="teachers" stroke="#84cc16" name="Teachers %" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-purple-800">Class-wise Attendance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData.classWise}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center">
                  View All <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-violet-600" size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm">{activity.message}</p>
                        <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center">
                  Add Event <Plus size={14} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                      <Calendar className="text-violet-600" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm">{event.title}</p>
                      <p className="text-gray-500 text-xs">{event.date} at {event.time}</p>
                    </div>
                    <Eye className="text-gray-400 group-hover:text-gray-600 transition-colors" size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Subject-wise Performance</h3>
              <div className="flex items-center space-x-2">
                <select 
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="subject" type="category" width={100} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    labelStyle={{ color: '#7C3AED' }}
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
                <div key={subject.subject} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Highest Score: <span className="text-green-600 font-medium">{subject.highestScore}%</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Lowest Score: <span className="text-red-600 font-medium">{subject.lowestScore}%</span>
                    </p>
                    <p className="text-sm text-gray-600">
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
  );
};

export default OverviewPage;