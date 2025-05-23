import React, { useState } from 'react';
import { Search, Edit, Users } from 'lucide-react';

// Classes the teacher teaches
const teacherClasses = [
  { id: 1, name: "Class 6", section: "Section A", color: "#FF6B6B" },
  { id: 2, name: "Class 7", section: "Section B", color: "#4ECDC4" },
  { id: 3, name: "Class 8", section: "Section A", color: "#FFD166" },
  { id: 4, name: "Class 9", section: "Section C", color: "#6A0572" },
  { id: 5, name: "Class 10", section: "Section B", color: "#1A936F" }
];

// Example students data
const studentsData = [
  { id: 1, name: "Aiden Smith", class: "Class 6", section: "Section A", attendance: "92%", grade: "A" },
  { id: 2, name: "Emma Johnson", class: "Class 6", section: "Section A", attendance: "88%", grade: "B+" },
  { id: 3, name: "Noah Williams", class: "Class 7", section: "Section B", attendance: "95%", grade: "A-" },
  { id: 4, name: "Olivia Brown", class: "Class 7", section: "Section B", attendance: "90%", grade: "B" },
  { id: 5, name: "Liam Davis", class: "Class 8", section: "Section A", attendance: "85%", grade: "B-" },
  { id: 6, name: "Sophia Miller", class: "Class 9", section: "Section C", attendance: "98%", grade: "A+" },
  { id: 7, name: "Mason Wilson", class: "Class 9", section: "Section C", attendance: "93%", grade: "A" },
  { id: 8, name: "Isabella Moore", class: "Class 10", section: "Section B", attendance: "91%", grade: "A-" },
  { id: 9, name: "Lucas Taylor", class: "Class 10", section: "Section B", attendance: "87%", grade: "B+" },
  { id: 10, name: "Mia Anderson", class: "Class 10", section: "Section B", attendance: "94%", grade: "A" }
];

// Example class analytics data
const classAnalytics = {
  "Class 6-Section A": {
    attendance: 90,
    avgGrade: "B+",
    homeworkCompletion: 85,
    studentCount: 28,
    topPerformer: "Emma Johnson",
    needsAttention: 3
  },
  "Class 7-Section B": {
    attendance: 92,
    avgGrade: "B",
    homeworkCompletion: 88,
    studentCount: 25,
    topPerformer: "Noah Williams",
    needsAttention: 2
  },
  "Class 8-Section A": {
    attendance: 87,
    avgGrade: "B-",
    homeworkCompletion: 82,
    studentCount: 27,
    topPerformer: "Liam Davis",
    needsAttention: 4
  },
  "Class 9-Section C": {
    attendance: 95,
    avgGrade: "A-",
    homeworkCompletion: 93,
    studentCount: 24,
    topPerformer: "Sophia Miller",
    needsAttention: 1
  },
  "Class 10-Section B": {
    attendance: 89,
    avgGrade: "B+",
    homeworkCompletion: 86,
    studentCount: 26,
    topPerformer: "Isabella Moore",
    needsAttention: 3
  },
};

const ClassesComponent = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  
  // Function to handle class click
  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setShowClassDetails(true);
  };
  
  // Function to go back to class list
  const handleBackToClasses = () => {
    setShowClassDetails(false);
    setSelectedClass(null);
  };
  
  // Get students for selected class
  const getClassStudents = () => {
    if (!selectedClass) return [];
    return studentsData.filter(
      student => student.class === selectedClass.name && student.section === selectedClass.section
    );
  };

  // Class List View
  const ClassesListView = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">My Classes</div>
        <div className="bg-gray-200 rounded-full p-2 flex items-center">
          <Search size={16} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-sm ml-2 w-20"
          />
        </div>
        <button className="text-gray-500 px-3 py-1 text-sm rounded-md border border-gray-300">
          Edit
        </button>
      </div>
      
      <div className="space-y-4">
        {teacherClasses.map((cls) => (
          <div 
            key={cls.id}
            onClick={() => handleClassClick(cls)}
            className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition duration-200"
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: cls.color }}
              />
              <div>
                <p className="font-medium">{cls.name}</p>
                <p className="text-xs text-gray-500">{cls.section}</p>
              </div>
            </div>
            <button 
              className="text-white px-3 py-1 text-sm rounded-full"
              style={{ backgroundColor: cls.color }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Class Detail View
  const ClassDetailView = () => {
    if (!selectedClass) return null;
    
    const students = getClassStudents();
    const analytics = classAnalytics[`${selectedClass.name}-${selectedClass.section}`];
    
    return (
      <div>
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToClasses}
            className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition duration-200"
          >
            ←
          </button>
          <h2 className="text-xl font-bold">
            {selectedClass.name} - {selectedClass.section}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Students List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Students</div>
              <div className="bg-gray-200 rounded-full p-2 flex items-center">
                <Search size={16} className="text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search students" 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-32"
                />
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div 
                  key={student.id}
                  className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition duration-200"
                >
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 mr-3">Attendance: {student.attendance}</span>
                      <span className="text-xs text-gray-500">Grade: {student.grade}</span>
                    </div>
                  </div>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: selectedClass.color }}
                  >
                    {student.name.charAt(0)}
                  </div>
                </div>
              ))}
              
              {students.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No students found for this class
                </div>
              )}
            </div>
          </div>
          
          {/* Class Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-lg font-bold mb-6">Class Analytics</div>
            
            {analytics ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold">{analytics.studentCount}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Grade</p>
                    <p className="text-2xl font-bold">{analytics.avgGrade}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Attendance Rate</p>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${analytics.attendance}%`,
                        backgroundColor: selectedClass.color
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>0%</span>
                    <span>{analytics.attendance}%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Homework Completion</p>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${analytics.homeworkCompletion}%`,
                        backgroundColor: selectedClass.color
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>0%</span>
                    <span>{analytics.homeworkCompletion}%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Quick Stats</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Top Performer:</span>
                      <span className="text-sm font-medium">{analytics.topPerformer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Students Needing Attention:</span>
                      <span className="text-sm font-medium">{analytics.needsAttention}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No analytics available for this class
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showClassDetails ? <ClassesListView /> : <ClassDetailView />}
    </div>
  );
};

export default ClassesComponent;