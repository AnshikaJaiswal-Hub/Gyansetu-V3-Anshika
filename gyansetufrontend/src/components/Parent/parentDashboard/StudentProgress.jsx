import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';

const StudentProgressReport = () => {
  // Sample data - replace with real data from your API
  const studentData = {
    name: "Alex Johnson",
    class: "Grade 10-A",
    rollNumber: "2024001"
  };

  const progressData = [
    { month: 'Jan', Mathematics: 85, Science: 78, English: 92, History: 88, Geography: 82 },
    { month: 'Feb', Mathematics: 88, Science: 82, English: 89, History: 85, Geography: 84 },
    { month: 'Mar', Mathematics: 92, Science: 85, English: 94, History: 90, Geography: 87 },
    { month: 'Apr', Mathematics: 87, Science: 88, English: 91, History: 86, Geography: 89 },
    { month: 'May', Mathematics: 94, Science: 91, English: 96, History: 93, Geography: 91 },
    { month: 'Jun', Mathematics: 90, Science: 89, English: 93, History: 91, Geography: 88 }
  ];

  const subjects = ['All Subjects', 'Mathematics', 'Science', 'English', 'History', 'Geography'];
  const months = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June'];

  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Filter data based on selections
  const getFilteredData = () => {
    let filteredData = [...progressData];

    // Filter by month
    if (selectedMonth !== 'All Months') {
      const monthIndex = months.indexOf(selectedMonth) - 1;
      if (monthIndex >= 0) {
        filteredData = [progressData[monthIndex]];
      }
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
    
    data.forEach(monthData => {
      subjectsToShow.forEach(subject => {
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
    
    data.forEach(monthData => {
      subjectsToShow.forEach(subject => {
        if (monthData[subject] !== undefined && monthData[subject] > highest) {
          highest = monthData[subject];
        }
      });
    });
    
    return highest;
  };

  const subjectColors = {
    Mathematics: '#8B5CF6',
    Science: '#c1d956',
    English: '#A855F7',
    History: '#9333EA',
    Geography: '#7C3AED'
  };

  return (
    <div className='bg-gray-100 p-4 sm:p-6 md:p-10'>
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-violet-100 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-violet-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Progress Report</h1>
                <p className="text-gray-600">Academic Performance Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-gray-900">{studentData.name}</h2>
              <p className="text-gray-600">{studentData.class}</p>
              <p className="text-sm text-gray-500">Roll No: {studentData.rollNumber}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-violet-600">{calculateAverage()}%</p>
              </div>
              <div className="bg-violet-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Score</p>
                <p className="text-3xl font-bold text-purple-600">{getHighestScore()}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-3xl font-bold text-indigo-600">{subjects.length - 1}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedSubject === 'All Subjects' ? 'All Subjects' : selectedSubject} Progress
              {selectedMonth !== 'All Months' && ` - ${selectedMonth}`}
            </h3>
            <p className="text-gray-600">Monthly performance overview</p>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getFilteredData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    fill={subjectColors[subject]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  {getSubjectsToShow().map(subject => (
                    <th key={subject} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {subject}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredData().map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.month}
                    </td>
                    {getSubjectsToShow().map(subject => (
                      <td key={subject} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="mr-2">{row[subject]}%</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-20">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${row[subject]}%`, 
                                backgroundColor: subjectColors[subject] 
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

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Report generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentProgressReport;