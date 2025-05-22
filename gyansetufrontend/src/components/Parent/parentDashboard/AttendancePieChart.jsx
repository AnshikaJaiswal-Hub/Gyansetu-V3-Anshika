import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { generateAttendanceData } from './attendancestats';

const AttendancePieChart = ({ academicYear = '2024-2025', studentId }) => {
  // State to hold attendance statistics
  const [attendanceStats, setAttendanceStats] = useState({
    total: 0,
    attended: 0,
    absent: 0,
    percentage: 0
  });
  
  // Get attendance data on component mount or when academicYear/studentId changes
  useEffect(() => {
    // In a real app, you would fetch data for the specific student
    // For now, we use the mock data generator
    const { attendanceStats } = generateAttendanceData(academicYear);
    setAttendanceStats(attendanceStats);
  }, [academicYear, studentId]);

  // Prepare data for pie chart
  const data = [
    { name: 'Present', value: attendanceStats.attended, color: '#c1d956' }, // Light green
    { name: 'Absent', value: attendanceStats.absent, color: '#8b5cf6' }     // Violet-500
  ];

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} days`}</p>
          <p className="text-gray-600">{`${Math.round((payload[0].value / attendanceStats.total) * 100)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-4xl shadow-2xl p-4 w-2/5">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                paddingAngle={4}
                stroke="none"
                strokeWidth={0}
                label={false} // Remove labels completely
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="none" 
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-2/5 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-500 text-sm">Total School Days</h4>
              <p className="text-2xl font-bold">{attendanceStats.total}</p>
            </div>
            <div>
              <h4 className="text-[#c1d956] text-sm">Days Present</h4>
              <p className="text-2xl font-bold text-[#c1d956]">{attendanceStats.attended} 
                <span className="text-sm font-normal text-[#c1d956] ml-2">({attendanceStats.percentage}%)</span>
              </p>
            </div>
            <div>
              <h4 className="text-violet-700 text-sm">Days Absent</h4>
              <p className="text-2xl font-bold text-violet-600">{attendanceStats.absent}
                <span className="text-sm font-normal text-violet-700 ml-2">({100 - attendanceStats.percentage}%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePieChart;