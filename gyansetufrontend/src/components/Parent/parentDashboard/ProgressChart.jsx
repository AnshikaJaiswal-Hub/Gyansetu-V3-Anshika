import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Calendar } from 'lucide-react';

const StudentProgressChart = ({ 
  data = [], 
  title = "Student Progress",
  showFilters = true,
  height = 400,
  className = ""
}) => {
  // Default data if none provided
  const defaultData = [
    { month: 'Jan', Mathematics: 85, Science: 78, English: 92, History: 88, Geography: 82 },
    { month: 'Feb', Mathematics: 88, Science: 82, English: 89, History: 85, Geography: 84 },
    { month: 'Mar', Mathematics: 92, Science: 85, English: 94, History: 90, Geography: 87 },
    { month: 'Apr', Mathematics: 87, Science: 88, English: 91, History: 86, Geography: 89 },
    { month: 'May', Mathematics: 94, Science: 91, English: 96, History: 93, Geography: 91 },
    { month: 'Jun', Mathematics: 90, Science: 89, English: 93, History: 91, Geography: 88 }
  ];

  const progressData = data.length > 0 ? data : defaultData;

  // Extract subjects from data (excluding 'month')
  const getSubjectsFromData = () => {
    if (progressData.length === 0) return [];
    return Object.keys(progressData[0]).filter(key => key !== 'month');
  };

  const subjects = ['All Subjects', ...getSubjectsFromData()];
  const months = ['All Months', ...progressData.map(item => item.month)];

  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Filter data based on selections
  const getFilteredData = () => {
    let filteredData = [...progressData];

    // Filter by month
    if (selectedMonth !== 'All Months') {
      filteredData = progressData.filter(item => item.month === selectedMonth);
    }

    // Filter by subject
    if (selectedSubject !== 'All Subjects') {
      filteredData = filteredData.map(item => ({
        month: item.month,
        [selectedSubject]: item[selectedSubject]
      }));
    }

    return filteredData;
  };

  // Get subjects to display in chart
  const getSubjectsToShow = () => {
    if (selectedSubject === 'All Subjects') {
      return getSubjectsFromData();
    }
    return [selectedSubject];
  };

  const subjectColors = {
    Mathematics: '#8b5cf6',
    Science: '#10b981',
    English: '#f59e0b',
    History: '#06b6d4',
    Geography: '#6366f1',
    // Add more colors for additional subjects
    Physics: '#ef4444',
    Chemistry: '#f97316',
    Biology: '#84cc16',
    Computer: '#ec4899'
  };

  return (
    <div className={`bg-white rounded-[30px] shadow-lg p-6 ${className}`}>
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">Academic performance overview</p>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Chart */}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={getFilteredData()} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            {getSubjectsToShow().map(subject => (
              <Bar
                key={subject}
                dataKey={subject}
                fill={subjectColors[subject] || '#6b7280'}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentProgressChart;