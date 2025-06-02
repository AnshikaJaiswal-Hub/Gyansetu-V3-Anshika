import React, { useState, useCallback, useMemo } from 'react';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Plus,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Database,
  MessageSquare,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  MoreVertical
} from 'lucide-react';

const InstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Memoize the tab click handler
  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Memoize the stats data
  const stats = useMemo(() => ({
    totalStudents: 1247,
    totalTeachers: 89,
    totalParents: 1156,
    activeClasses: 45,
    totalRevenue: 125000,
    completionRate: 87
  }), []);

  // Memoize the recent activities
  const recentActivities = useMemo(() => [
    { id: 1, type: 'enrollment', message: 'New student John Doe enrolled in Grade 10-A', time: '2 hours ago' },
    { id: 2, type: 'teacher', message: 'Teacher Sarah Wilson created new assignment for Math Class', time: '4 hours ago' },
    { id: 3, type: 'payment', message: 'Payment received from parent Maria Garcia', time: '6 hours ago' },
    { id: 4, type: 'announcement', message: 'School holiday announcement published', time: '1 day ago' }
  ], []);

  // Memoize the upcoming events
  const upcomingEvents = useMemo(() => [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2025-06-05', time: '10:00 AM' },
    { id: 2, title: 'Annual Sports Day', date: '2025-06-12', time: '9:00 AM' },
    { id: 3, title: 'Science Fair', date: '2025-06-18', time: '2:00 PM' }
  ], []);

  // Memoize the teachers data
  const teachers = useMemo(() => [
    { id: 1, name: 'Sarah Wilson', subject: 'Mathematics', classes: 5, students: 150, status: 'active' },
    { id: 2, name: 'John Smith', subject: 'Science', classes: 4, students: 120, status: 'active' },
    { id: 3, name: 'Emma Davis', subject: 'English', classes: 6, students: 180, status: 'active' }
  ], []);

  // Memoize the classes data
  const classes = useMemo(() => [
    { id: 1, name: 'Grade 10-A', teacher: 'Sarah Wilson', students: 30, subject: 'Mathematics' },
    { id: 2, name: 'Grade 9-B', teacher: 'John Smith', students: 28, subject: 'Science' },
    { id: 3, name: 'Grade 11-C', teacher: 'Emma Davis', students: 32, subject: 'English' }
  ], []);

  // Memoize the TabButton component
  const TabButton = useCallback(({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  ), []);

  // Memoize the StatCard component
  const StatCard = useCallback(({ title, value, icon: Icon, change, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={14} className="mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
    </div>
  ), []);

  // Memoize the render functions
  const renderOverview = useCallback(() => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} change={12} color="blue" />
        <StatCard title="Total Teachers" value={stats.totalTeachers} icon={GraduationCap} change={5} color="green" />
        <StatCard title="Active Classes" value={stats.activeClasses} icon={BookOpen} change={8} color="indigo" />
        <StatCard title="Total Parents" value={stats.totalParents} icon={UserCheck} change={10} color="orange" />
        <StatCard title="Monthly Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} change={15} color="emerald" />
        <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon={Award} change={3} color="violet" />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Add Event</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-500" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm">{event.title}</p>
                  <p className="text-gray-500 text-xs">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ), [stats, recentActivities, upcomingEvents, StatCard]);

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} />
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Teacher</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Subject</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Classes</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Students</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="text-blue-600" size={18} />
                      </div>
                      <span className="font-medium text-gray-900">{teacher.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{teacher.subject}</td>
                  <td className="py-4 px-6 text-gray-600">{teacher.classes}</td>
                  <td className="py-4 px-6 text-gray-600">{teacher.students}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {teacher.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Class Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} />
          <span>Create Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <GraduationCap className="text-gray-500" size={16} />
                <span className="text-gray-600 text-sm">{cls.teacher}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-gray-500" size={16} />
                <span className="text-gray-600 text-sm">{cls.students} Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="text-gray-500" size={16} />
                <span className="text-gray-600 text-sm">{cls.subject}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium">
                  View Details
                </button>
                <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Institute Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" defaultValue="ABC Educational Institute" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" defaultValue="contact@abcinstitute.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto Backup</p>
                <p className="text-sm text-gray-600">Automatically backup data daily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Institute Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="text-blue-500" size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto">
          <TabButton id="overview" label="Overview" icon={BarChart3} isActive={activeTab === 'overview'} onClick={handleTabClick} />
          <TabButton id="teachers" label="Teachers" icon={GraduationCap} isActive={activeTab === 'teachers'} onClick={handleTabClick} />
          <TabButton id="students" label="Students" icon={Users} isActive={activeTab === 'students'} onClick={handleTabClick} />
          <TabButton id="classes" label="Classes" icon={BookOpen} isActive={activeTab === 'classes'} onClick={handleTabClick} />
          <TabButton id="finances" label="Finances" icon={DollarSign} isActive={activeTab === 'finances'} onClick={handleTabClick} />
          <TabButton id="reports" label="Reports" icon={FileText} isActive={activeTab === 'reports'} onClick={handleTabClick} />
          <TabButton id="settings" label="Settings" icon={Settings} isActive={activeTab === 'settings'} onClick={handleTabClick} />
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'teachers' && renderTeachers()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'students' && (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Student Management</h3>
              <p className="text-gray-600">Student management features coming soon...</p>
            </div>
          )}
          {activeTab === 'finances' && (
            <div className="text-center py-12">
              <DollarSign className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Management</h3>
              <p className="text-gray-600">Financial tracking and fee management features coming soon...</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
              <p className="text-gray-600">Detailed reports and analytics features coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstituteDashboard;