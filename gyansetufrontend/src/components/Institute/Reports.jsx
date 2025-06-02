import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  BarChart3, Search, Download, Filter, MoreVertical, Calendar, FileText, Users,
  GraduationCap, DollarSign, TrendingUp, TrendingDown, Award, AlertTriangle,
  Eye, User, BookOpen, Target, Clock, Star, ArrowUpRight, ArrowDownRight,
  ChevronDown, RefreshCw, Minus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// StatCard Component
const StatCard = ({ title, value, icon, change, trend, color }) => (
  <div className={`rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
    color === 'green' ? 'bg-green-100' :
    color === 'yellow' ? 'bg-yellow-100' :
    color === 'red' ? 'bg-red-100' :
    'bg-white'
  }`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-1">
          {trend === 'up' ? (
            <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
          ) : trend === 'down' ? (
            <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
          ) : (
            <Minus className="text-gray-500" size={16} aria-hidden="true" />
          )}
          <p className={`text-sm ml-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {change}
          </p>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${
        color === 'green' ? 'bg-green-200' :
        color === 'yellow' ? 'bg-yellow-200' :
        color === 'red' ? 'bg-red-200' :
        'bg-gray-50'
      }`}>{icon}</div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
  color: PropTypes.string,
};

// StudentModal Component
const StudentModal = ({ isOpen, onClose, students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState('all');

  if (!isOpen) return null;

  // Get unique classes and subjects from students data
  const uniqueClasses = [...new Set(students.map(student => student.class))];
  const uniqueSubjects = [...new Set(students.map(student => student.subjects.split(', ')).flat())];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.subjects.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSubject = selectedSubject === 'all' || student.subjects.includes(selectedSubject);
    const matchesTrend = selectedTrend === 'all' || student.trend === selectedTrend;

    return matchesSearch && matchesClass && matchesSubject && matchesTrend;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Student Performance Reports</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Search students"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="classFilter" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  id="classFilter"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">All Classes</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subjectFilter" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  id="subjectFilter"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">All Subjects</option>
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="trendFilter" className="block text-sm font-medium text-gray-700 mb-1">Performance Trend</label>
                <select
                  id="trendFilter"
                  value={selectedTrend}
                  onChange={(e) => setSelectedTrend(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">All Trends</option>
                  <option value="up">Improving</option>
                  <option value="stable">Stable</option>
                  <option value="down">Needs Attention</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <User className="text-white" size={20} aria-hidden="true" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900">{student.score}</span>
                        <div className="ml-2">
                          {student.trend === 'up' ? (
                            <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
                          ) : student.trend === 'down' ? (
                            <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
                          ) : (
                            <Minus className="text-gray-500" size={16} aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.subjects}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.trend === 'up' ? 'bg-green-100 text-green-800' : 
                        student.trend === 'down' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {student.trend === 'up' ? 'Improving' : 
                         student.trend === 'down' ? 'Needs Attention' : 'Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      score: PropTypes.string.isRequired,
      subjects: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
    })
  ).isRequired,
};

// Main Reports Component
const Reports = () => {
  const [timeRange, setTimeRange] = useState('last30days');
  const [reportType, setReportType] = useState('overview');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    performanceMetrics: [
      { title: "Average Score", value: "85.2%", icon: <Target className="text-green-600" size={24} />, change: "+3.5%", trend: "up", color: "green" },
      { title: "Top Performers", value: "125", icon: <Award className="text-yellow-600" size={24} />, change: "+8", trend: "up", color: "yellow" },
      { title: "At-Risk Students", value: "23", icon: <AlertTriangle className="text-red-600" size={24} />, change: "-5", trend: "down", color: "red" }
    ],
    topStudents: [
      // Class 12 Students
      { name: "Priya Sharma", class: "Class 12-A", score: "98.5%", subjects: "Physics, Math", trend: "up" },
      { name: "Rahul Kumar", class: "Class 12-B", score: "97.2%", subjects: "Chemistry, Biology", trend: "up" },
      { name: "Anita Singh", class: "Class 12-A", score: "96.8%", subjects: "Math, Computer", trend: "up" },
      { name: "Vikash Gupta", class: "Class 12-B", score: "95.9%", subjects: "Science, English", trend: "up" },
      { name: "Meera Patel", class: "Class 12-A", score: "95.3%", subjects: "Biology, Chemistry", trend: "up" },
      
      // Class 11 Students
      { name: "Arjun Reddy", class: "Class 11-A", score: "94.8%", subjects: "Physics, Math", trend: "up" },
      { name: "Sneha Verma", class: "Class 11-B", score: "93.5%", subjects: "Chemistry, Biology", trend: "stable" },
      { name: "Karan Malhotra", class: "Class 11-A", score: "92.7%", subjects: "Math, Computer", trend: "up" },
      { name: "Pooja Sharma", class: "Class 11-B", score: "91.9%", subjects: "Science, English", trend: "down" },
      { name: "Rohan Singh", class: "Class 11-A", score: "90.5%", subjects: "Biology, Chemistry", trend: "up" },

      // Class 10 Students
      { name: "Aisha Khan", class: "Class 10-A", score: "89.8%", subjects: "Science, Math", trend: "up" },
      { name: "Vivek Patel", class: "Class 10-B", score: "88.5%", subjects: "English, Social", trend: "stable" },
      { name: "Neha Gupta", class: "Class 10-A", score: "87.9%", subjects: "Math, Science", trend: "up" },
      { name: "Aditya Singh", class: "Class 10-B", score: "86.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Divya Sharma", class: "Class 10-A", score: "85.8%", subjects: "Science, Math", trend: "up" },

      // Class 9 Students
      { name: "Riya Verma", class: "Class 9-A", score: "84.5%", subjects: "Science, Math", trend: "up" },
      { name: "Aryan Kumar", class: "Class 9-B", score: "83.2%", subjects: "English, Social", trend: "stable" },
      { name: "Zara Khan", class: "Class 9-A", score: "82.8%", subjects: "Math, Science", trend: "up" },
      { name: "Kartik Singh", class: "Class 9-B", score: "81.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Ananya Patel", class: "Class 9-A", score: "80.9%", subjects: "Science, Math", trend: "up" },

      // Class 8 Students
      { name: "Ishaan Sharma", class: "Class 8-A", score: "79.5%", subjects: "Science, Math", trend: "up" },
      { name: "Myra Gupta", class: "Class 8-B", score: "78.2%", subjects: "English, Social", trend: "stable" },
      { name: "Vihaan Kumar", class: "Class 8-A", score: "77.8%", subjects: "Math, Science", trend: "up" },
      { name: "Siya Singh", class: "Class 8-B", score: "76.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Arnav Patel", class: "Class 8-A", score: "75.9%", subjects: "Science, Math", trend: "up" },

      // Class 7 Students
      { name: "Aarav Verma", class: "Class 7-A", score: "74.5%", subjects: "Science, Math", trend: "up" },
      { name: "Diya Kumar", class: "Class 7-B", score: "73.2%", subjects: "English, Social", trend: "stable" },
      { name: "Reyansh Singh", class: "Class 7-A", score: "72.8%", subjects: "Math, Science", trend: "up" },
      { name: "Pari Sharma", class: "Class 7-B", score: "71.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Aryan Patel", class: "Class 7-A", score: "70.9%", subjects: "Science, Math", trend: "up" },

      // Class 6 Students
      { name: "Kavya Gupta", class: "Class 6-A", score: "69.5%", subjects: "Science, Math", trend: "up" },
      { name: "Shaurya Kumar", class: "Class 6-B", score: "68.2%", subjects: "English, Social", trend: "stable" },
      { name: "Anvi Singh", class: "Class 6-A", score: "67.8%", subjects: "Math, Science", trend: "up" },
      { name: "Vedant Sharma", class: "Class 6-B", score: "66.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Riya Patel", class: "Class 6-A", score: "65.9%", subjects: "Science, Math", trend: "up" },

      // Class 5 Students
      { name: "Aaradhya Verma", class: "Class 5-A", score: "64.5%", subjects: "Science, Math", trend: "up" },
      { name: "Rudra Kumar", class: "Class 5-B", score: "63.2%", subjects: "English, Social", trend: "stable" },
      { name: "Pihu Singh", class: "Class 5-A", score: "62.8%", subjects: "Math, Science", trend: "up" },
      { name: "Arjun Sharma", class: "Class 5-B", score: "61.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Anaya Patel", class: "Class 5-A", score: "60.9%", subjects: "Science, Math", trend: "up" },

      // Class 4 Students
      { name: "Vivaan Gupta", class: "Class 4-A", score: "59.5%", subjects: "Science, Math", trend: "up" },
      { name: "Aisha Kumar", class: "Class 4-B", score: "58.2%", subjects: "English, Social", trend: "stable" },
      { name: "Kiaan Singh", class: "Class 4-A", score: "57.8%", subjects: "Math, Science", trend: "up" },
      { name: "Myra Sharma", class: "Class 4-B", score: "56.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Aryan Patel", class: "Class 4-A", score: "55.9%", subjects: "Science, Math", trend: "up" },

      // Class 3 Students
      { name: "Riya Verma", class: "Class 3-A", score: "54.5%", subjects: "Science, Math", trend: "up" },
      { name: "Arnav Kumar", class: "Class 3-B", score: "53.2%", subjects: "English, Social", trend: "stable" },
      { name: "Zara Singh", class: "Class 3-A", score: "52.8%", subjects: "Math, Science", trend: "up" },
      { name: "Vihaan Sharma", class: "Class 3-B", score: "51.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Anvi Patel", class: "Class 3-A", score: "50.9%", subjects: "Science, Math", trend: "up" },

      // Class 2 Students
      { name: "Aarav Gupta", class: "Class 2-A", score: "49.5%", subjects: "Science, Math", trend: "up" },
      { name: "Diya Kumar", class: "Class 2-B", score: "48.2%", subjects: "English, Social", trend: "stable" },
      { name: "Reyansh Singh", class: "Class 2-A", score: "47.8%", subjects: "Math, Science", trend: "up" },
      { name: "Pari Sharma", class: "Class 2-B", score: "46.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Aryan Patel", class: "Class 2-A", score: "45.9%", subjects: "Science, Math", trend: "up" },

      // Class 1 Students
      { name: "Kavya Verma", class: "Class 1-A", score: "44.5%", subjects: "Science, Math", trend: "up" },
      { name: "Shaurya Kumar", class: "Class 1-B", score: "43.2%", subjects: "English, Social", trend: "stable" },
      { name: "Anvi Singh", class: "Class 1-A", score: "42.8%", subjects: "Math, Science", trend: "up" },
      { name: "Vedant Sharma", class: "Class 1-B", score: "41.5%", subjects: "Hindi, English", trend: "down" },
      { name: "Riya Patel", class: "Class 1-A", score: "40.9%", subjects: "Science, Math", trend: "up" }
    ],
    subjectPerformance: [
      // Higher Secondary Subjects (11-12)
      { subject: "Physics", avgScore: 88.5, students: 320, trend: "up", change: "+2.3%" },
      { subject: "Chemistry", avgScore: 85.2, students: 310, trend: "up", change: "+1.8%" },
      { subject: "Biology", avgScore: 86.7, students: 290, trend: "up", change: "+3.1%" },
      { subject: "Mathematics", avgScore: 87.9, students: 350, trend: "up", change: "+2.5%" },
      { subject: "Computer Science", avgScore: 91.2, students: 180, trend: "up", change: "+4.2%" },
      { subject: "English", avgScore: 82.4, students: 420, trend: "stable", change: "0.0%" },
      { subject: "Physical Education", avgScore: 89.5, students: 150, trend: "up", change: "+1.5%" },
      { subject: "Economics", avgScore: 84.3, students: 200, trend: "up", change: "+2.1%" },
      { subject: "Business Studies", avgScore: 83.7, students: 190, trend: "up", change: "+1.9%" },
      { subject: "Accountancy", avgScore: 81.9, students: 170, trend: "down", change: "-0.5%" },

      // Secondary Subjects (6-10)
      { subject: "Science", avgScore: 79.4, students: 520, trend: "up", change: "+1.8%" },
      { subject: "Social Studies", avgScore: 77.8, students: 510, trend: "stable", change: "0.0%" },
      { subject: "Hindi", avgScore: 76.5, students: 480, trend: "up", change: "+1.2%" },
      { subject: "Sanskrit", avgScore: 75.2, students: 220, trend: "down", change: "-0.8%" },
      { subject: "Art & Craft", avgScore: 88.7, students: 450, trend: "up", change: "+2.4%" },
      { subject: "Music", avgScore: 87.3, students: 180, trend: "up", change: "+1.7%" },
      { subject: "Dance", avgScore: 86.9, students: 150, trend: "stable", change: "0.0%" },
      { subject: "Environmental Studies", avgScore: 78.5, students: 490, trend: "up", change: "+1.5%" },

      // Primary Subjects (1-5)
      { subject: "General Knowledge", avgScore: 72.4, students: 580, trend: "up", change: "+2.1%" },
      { subject: "Moral Science", avgScore: 85.6, students: 550, trend: "up", change: "+1.8%" },
      { subject: "Value Education", avgScore: 84.2, students: 540, trend: "stable", change: "0.0%" },
      { subject: "Drawing", avgScore: 89.1, students: 560, trend: "up", change: "+2.3%" },
      { subject: "Games", avgScore: 90.5, students: 570, trend: "up", change: "+1.9%" }
    ],
    classPerformance: [
      { class: "Class 12-A", students: 45, avgScore: 89.2, topScore: 98.5, trend: "up" },
      { class: "Class 12-B", students: 42, avgScore: 87.8, topScore: 96.8, trend: "up" },
      { class: "Class 11-A", students: 48, avgScore: 85.1, topScore: 95.3, trend: "stable" },
      { class: "Class 11-B", students: 46, avgScore: 86.9, topScore: 97.2, trend: "up" },
      { class: "Class 10-A", students: 50, avgScore: 82.4, topScore: 95.9, trend: "down" },
      { class: "Class 10-B", students: 47, avgScore: 84.1, topScore: 94.2, trend: "up" },
      { class: "Class 9-A", students: 52, avgScore: 81.5, topScore: 93.8, trend: "up" },
      { class: "Class 9-B", students: 49, avgScore: 83.2, topScore: 94.5, trend: "stable" },
      { class: "Class 8-A", students: 54, avgScore: 80.8, topScore: 92.7, trend: "up" },
      { class: "Class 8-B", students: 51, avgScore: 82.1, topScore: 93.4, trend: "up" },
      { class: "Class 7-A", students: 56, avgScore: 79.5, topScore: 91.9, trend: "stable" },
      { class: "Class 7-B", students: 53, avgScore: 81.2, topScore: 92.6, trend: "up" },
      { class: "Class 6-A", students: 58, avgScore: 78.2, topScore: 90.8, trend: "up" },
      { class: "Class 6-B", students: 55, avgScore: 80.1, topScore: 91.5, trend: "stable" },
      { class: "Class 5-A", students: 60, avgScore: 77.5, topScore: 89.7, trend: "up" },
      { class: "Class 5-B", students: 57, avgScore: 79.2, topScore: 90.4, trend: "up" },
      { class: "Class 4-A", students: 62, avgScore: 76.8, topScore: 88.6, trend: "stable" },
      { class: "Class 4-B", students: 59, avgScore: 78.5, topScore: 89.3, trend: "up" },
      { class: "Class 3-A", students: 64, avgScore: 75.5, topScore: 87.5, trend: "up" },
      { class: "Class 3-B", students: 61, avgScore: 77.2, topScore: 88.2, trend: "stable" },
      { class: "Class 2-A", students: 66, avgScore: 74.2, topScore: 86.4, trend: "up" },
      { class: "Class 2-B", students: 63, avgScore: 76.1, topScore: 87.1, trend: "up" },
      { class: "Class 1-A", students: 68, avgScore: 73.5, topScore: 85.3, trend: "stable" },
      { class: "Class 1-B", students: 65, avgScore: 75.2, topScore: 86.0, trend: "up" }
    ]
  };

  const filteredClassPerformance = useMemo(() => {
    return data.classPerformance;
  }, [data.classPerformance]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const renderPerformanceSection = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-violet-600" size={24} aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.performanceMetrics.map((metric, index) => (
                <StatCard key={index} {...metric} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                    aria-label="View all top performers"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {data.topStudents.slice(0, 3).map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <User className="text-white" size={20} aria-hidden="true" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.class} • {student.subjects}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900">{student.score}</span>
                        {student.trend === 'up' ? (
                          <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
                        ) : student.trend === 'down' ? (
                          <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full" aria-hidden="true"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
                  <button 
                    onClick={() => setActiveTab('subjects')}
                    className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                    aria-label="View detailed subject performance"
                  >
                    Detailed View
                  </button>
                </div>
                <div className="space-y-4">
                  {data.subjectPerformance.slice(0, 5).map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <BookOpen className="text-violet-600" size={20} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{subject.subject}</p>
                          <p className="text-xs text-gray-500">{subject.students} students</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900">{subject.avgScore}%</span>
                        <div className="flex items-center">
                          {subject.trend === 'up' ? (
                            <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
                          ) : subject.trend === 'down' ? (
                            <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
                          ) : (
                            <div className="w-4 h-4 bg-gray-300 rounded-full" aria-hidden="true"></div>
                          )}
                          <span className={`text-xs ml-1 ${
                            subject.trend === 'up' ? 'text-green-600' : 
                            subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {subject.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'classes':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Class Performance Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed performance metrics by class</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClassPerformance.map((classData, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <GraduationCap className="text-violet-600 mr-3" size={20} aria-hidden="true" />
                          <span className="text-sm font-medium text-gray-900">{classData.class}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{classData.students}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-gray-900">{classData.avgScore}%</span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-violet-600 h-2 rounded-full" 
                              style={{ width: `${classData.avgScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{classData.topScore}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {classData.trend === 'up' ? (
                            <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
                          ) : classData.trend === 'down' ? (
                            <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
                          ) : (
                            <Minus className="text-gray-500" size={16} aria-hidden="true" />
                          )}
                          <span className={`text-sm ml-2 ${
                            classData.trend === 'up' ? 'text-green-600' : 
                            classData.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {classData.trend}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'subjects':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Subject Performance Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Comprehensive subject-wise performance metrics</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {data.subjectPerformance.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="text-violet-600" size={20} aria-hidden="true" />
                        <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                      </div>
                      {subject.trend === 'up' ? (
                        <ArrowUpRight className="text-green-500" size={16} aria-hidden="true" />
                      ) : subject.trend === 'down' ? (
                        <ArrowDownRight className="text-red-500" size={16} aria-hidden="true" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-300 rounded-full" aria-hidden="true"></div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Score</span>
                        <span className="text-sm font-semibold text-gray-900">{subject.avgScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Students</span>
                        <span className="text-sm text-gray-900">{subject.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Change</span>
                        <span className={`text-sm font-medium ${
                          subject.trend === 'up' ? 'text-green-600' : 
                          subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {subject.change}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-violet-600 h-2 rounded-full" 
                          style={{ width: `${subject.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-600 mb-2">Academic Report</h1>
            <p className="text-gray-600 text-sm sm:text-base">Access and manage student performance with advanced analytics.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6">
                <div className="flex space-x-4 sm:space-x-8 mb-4 sm:mb-0">
                  {['overview', 'classes', 'subjects'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-violet-500 text-violet-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      aria-current={activeTab === tab ? 'page' : undefined}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Analysis
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleRefresh}
                    className="flex items-center px-3 py-1 text-sm bg-violet-50 text-violet-600 rounded-md hover:bg-violet-100"
                    aria-label="Refresh data"
                  >
                    <RefreshCw size={14} className="mr-1" aria-hidden="true" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {renderPerformanceSection()}
            </div>
          </div>
          <StudentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            students={data.topStudents} 
          />
        </div>
      </div>
    </div>
  );
};

Reports.propTypes = {
  initialData: PropTypes.shape({
    stats: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      change: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
    })),
    performanceMetrics: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      change: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
      color: PropTypes.string.isRequired,
    })),
    topStudents: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      score: PropTypes.string.isRequired,
      subjects: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
    })),
    subjectPerformance: PropTypes.arrayOf(PropTypes.shape({
      subject: PropTypes.string.isRequired,
      avgScore: PropTypes.number.isRequired,
      students: PropTypes.number.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
      change: PropTypes.string.isRequired,
    })),
    classPerformance: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      students: PropTypes.number.isRequired,
      avgScore: PropTypes.number.isRequired,
      topScore: PropTypes.number.isRequired,
      trend: PropTypes.oneOf(['up', 'down', 'stable']).isRequired,
    })),
  }),
};

export default Reports;