import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, UserCheck, Download, Search, Eye, BarChart3, Clock, AlertTriangle, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, AreaChart, Area } from 'recharts';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const exportRef = useRef(null);
  const [dateRange, setDateRange] = useState('week'); // 'week', 'month', 'year'
  const [selectedClasses, setSelectedClasses] = useState(['10A', '10B', '11A', '11B']);
  const [chartType, setChartType] = useState('line'); // 'line', 'bar', 'area'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setShowExportOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock data - replace with actual API calls
  const [attendanceData] = useState({
    students: [
      { id: 1, name: 'John Doe', class: '10A', totalDays: 20, presentDays: 18, absentDays: 2, percentage: 90 },
      { id: 2, name: 'Jane Smith', class: '10A', totalDays: 20, presentDays: 16, absentDays: 4, percentage: 80 },
      { id: 3, name: 'Mike Johnson', class: '10B', totalDays: 20, presentDays: 19, absentDays: 1, percentage: 95 },
      { id: 4, name: 'Sarah Wilson', class: '10B', totalDays: 20, presentDays: 14, absentDays: 6, percentage: 70 },
      { id: 5, name: 'David Brown', class: '11A', totalDays: 20, presentDays: 17, absentDays: 3, percentage: 85 },
    ],
    teachers: [
      { id: 1, name: 'Prof. Anderson', subject: 'Mathematics', totalDays: 20, presentDays: 20, absentDays: 0, percentage: 100 },
      { id: 2, name: 'Dr. Williams', subject: 'Physics', totalDays: 20, presentDays: 18, absentDays: 2, percentage: 90 },
      { id: 3, name: 'Ms. Garcia', subject: 'English', totalDays: 20, presentDays: 19, absentDays: 1, percentage: 95 },
    ],
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

  const pieColors = ['#10B981', '#F59E0B', '#EF4444', '#7C3AED'];

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return { status: 'Excellent', color: 'text-lime-600 bg-lime-100' };
    if (percentage >= 80) return { status: 'Good', color: 'text-violet-600 bg-violet-100' };
    if (percentage >= 70) return { status: 'Average', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'Poor', color: 'text-violet-600 bg-violet-100' };
  };

  const filteredStudents = attendanceData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleExport = (format) => {
    // Get the current data based on active tab
    let dataToExport = [];
    let fileName = '';

    if (activeTab === 'students') {
      dataToExport = filteredStudents;
      fileName = 'student_attendance';
    } else if (activeTab === 'teachers') {
      dataToExport = attendanceData.teachers;
      fileName = 'teacher_attendance';
    } else {
      // For overview, export all data
      dataToExport = {
        students: attendanceData.students,
        teachers: attendanceData.teachers,
        dailyTrends: attendanceData.dailyTrends,
        classWise: attendanceData.classWise
      };
      fileName = 'attendance_overview';
    }

    // Create the export content
    let content = '';
    let mimeType = '';
    let fileExtension = '';

    switch (format) {
      case 'csv':
        content = convertToCSV(dataToExport);
        mimeType = 'text/csv';
        fileExtension = 'csv';
        break;
      case 'excel':
        content = convertToExcel(dataToExport);
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileExtension = 'xlsx';
        break;
      case 'pdf':
        content = convertToPDF(dataToExport);
        mimeType = 'application/pdf';
        fileExtension = 'pdf';
        break;
      default:
        return;
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setShowExportOptions(false);
  };

  const convertToCSV = (data) => {
    if (Array.isArray(data)) {
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
      ];
      return csvRows.join('\n');
    }
    return JSON.stringify(data);
  };

  const convertToExcel = (data) => {
    // This is a placeholder. In a real implementation, you would use a library like xlsx
    return JSON.stringify(data);
  };

  const convertToPDF = (data) => {
    // This is a placeholder. In a real implementation, you would use a library like jsPDF
    return JSON.stringify(data);
  };

  const OverviewTab = () => {
    const getFilteredDailyTrends = () => {
      const today = new Date();
      let startDate = new Date();
      
      switch (dateRange) {
        case 'week':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          startDate.setDate(today.getDate() - 7);
      }

      return attendanceData.dailyTrends.filter(trend => 
        new Date(trend.date) >= startDate && new Date(trend.date) <= today
      );
    };

    const getFilteredClassWise = () => {
      return attendanceData.classWise.filter(item => 
        selectedClasses.includes(item.class)
      );
    };

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <p className="font-semibold text-gray-800">{new Date(label).toLocaleDateString()}</p>
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: {entry.value}%
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">847</p>
                <p className="text-sm text-lime-600">+12 this month</p>
              </div>
              <Users className="h-12 w-12 text-violet-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-gray-900">782</p>
                <p className="text-sm text-lime-600">92.3% attendance</p>
              </div>
              <UserCheck className="h-12 w-12 text-lime-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Teachers Present</p>
                <p className="text-2xl font-bold text-gray-900">28/30</p>
                <p className="text-sm text-lime-600">93.3% attendance</p>
              </div>
              <Clock className="h-12 w-12 text-violet-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Attendance</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-violet-600">Below 75%</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-violet-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-800">Daily Attendance Trend</h3>
              <div className="flex gap-2">
                <select
                  className="px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
                <select
                  className="px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="area">Area Chart</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={getFilteredDailyTrends()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="#7C3AED" 
                    name="Students %" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="teachers" 
                    stroke="#84cc16" 
                    name="Teachers %" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : chartType === 'bar' ? (
                <BarChart data={getFilteredDailyTrends()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="students" fill="#7C3AED" name="Students %" />
                  <Bar dataKey="teachers" fill="#84cc16" name="Teachers %" />
                </BarChart>
              ) : (
                <AreaChart data={getFilteredDailyTrends()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    fill="#7C3AED" 
                    stroke="#7C3AED" 
                    fillOpacity={0.3}
                    name="Students %"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="teachers" 
                    fill="#84cc16" 
                    stroke="#84cc16" 
                    fillOpacity={0.3}
                    name="Teachers %"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-800">Class-wise Attendance</h3>
              <div className="flex flex-wrap gap-2">
                {['10A', '10B', '11A', '11B'].map((cls) => (
                  <label key={cls} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-violet-600"
                      checked={selectedClasses.includes(cls)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedClasses([...selectedClasses, cls]);
                        } else {
                          setSelectedClasses(selectedClasses.filter(c => c !== cls));
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{cls}</span>
                  </label>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getFilteredClassWise()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-semibold text-gray-800">Class {label}</p>
                          <p className="text-sm text-lime-600">Present: {payload[0].value}</p>
                          <p className="text-sm text-violet-600">Absent: {payload[1].value}</p>
                          <p className="text-sm text-gray-600">Total: {payload[0].payload.total}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="present" 
                  fill="#84cc16" 
                  name="Present"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="absent" 
                  fill="#7C3AED" 
                  name="Absent"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">Attendance Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-2 text-purple-700">Student Attendance Categories</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={[
                      { name: 'Excellent (90%+)', value: 45, fill: '#84cc16' },
                      { name: 'Good (80-89%)', value: 30, fill: '#7C3AED' },
                      { name: 'Average (70-79%)', value: 20, fill: '#F59E0B' },
                      { name: 'Poor (<70%)', value: 5, fill: '#7C3AED' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <h4 className="text-md font-medium text-purple-700">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-lime-50 rounded-lg">
                  <span className="text-lime-700">Excellent Attendance</span>
                  <span className="font-semibold text-lime-800">45%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="text-violet-700">Good Attendance</span>
                  <span className="font-semibold text-violet-800">30%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">Average Attendance</span>
                  <span className="font-semibold text-yellow-800">20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="text-violet-700">Poor Attendance</span>
                  <span className="font-semibold text-violet-800">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StudentTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-0 focus:border-violet-600 focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">All Classes</option>
            <option value="10A">Class 10A</option>
            <option value="10B">Class 10B</option>
            <option value="11A">Class 11A</option>
            <option value="11B">Class 11B</option>
          </select>
          <div className="relative" ref={exportRef}>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              <Download className="h-4 w-4" />
              Export
              <ChevronDown className="h-4 w-4" />
            </button>
            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport('csv')}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport('excel')}
                  >
                    Export as Excel
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const status = getAttendanceStatus(student.percentage);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.presentDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.absentDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-violet-600 h-2 rounded-full"
                            style={{ width: `${student.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{student.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeacherTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold mb-2 text-purple-800">Total Teachers</h3>
          <p className="text-3xl font-bold text-violet-600">30</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold mb-2 text-purple-800">Present Today</h3>
          <p className="text-3xl font-bold text-lime-600">28</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold mb-2 text-purple-800">Average Attendance</h3>
          <p className="text-3xl font-bold text-violet-600">95.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.teachers.map((teacher) => {
                const status = getAttendanceStatus(teacher.percentage);
                return (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.presentDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.absentDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-violet-600 h-2 rounded-full"
                            style={{ width: `${teacher.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{teacher.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-4">
        <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-8 min-h-screen">
          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-violet-600 mb-2">Attendance Dashboard</h1>
              <p className="text-gray-600">Monitor and track student & teacher attendance</p>
            </div>

            <div className="flex space-x-8 mb-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'students', name: 'Students', icon: Users },
                { id: 'teachers', name: 'Teachers', icon: UserCheck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-violet-500 text-violet-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            <div>
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'students' && <StudentTab />}
              {activeTab === 'teachers' && <TeacherTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;