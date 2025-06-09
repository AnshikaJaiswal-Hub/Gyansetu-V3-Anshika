import React, { useState } from 'react';
import { Search, Edit, Filter, FileText, Upload } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

// Subjects the teacher teaches
const teacherSubjects = [
  { id: 1, name: "Mathematics", color: "#FF6B6B" },
  { id: 2, name: "Physics", color: "#4ECDC4" },
  { id: 3, name: "Computer Science", color: "#FFD166" }
];

// Classes the teacher teaches with sections
const teacherClasses = [
  { id: 1, name: "Class 6", section: "Section A", color: "#FF6B6B" },
  { id: 2, name: "Class 7", section: "Section B", color: "#4ECDC4" },
  { id: 3, name: "Class 8", section: "Section A", color: "#FFD166" },
  { id: 4, name: "Class 9", section: "Section C", color: "#6A0572" },
  { id: 5, name: "Class 10", section: "Section B", color: "#1A936F" }
];

// Example academic content
const academicContent = [
  { id: 1, title: "Algebra Basics", subject: "Mathematics", class: "Class 7", section: "Section B", type: "PDF", date: "May 1, 2025" },
  { id: 2, title: "Physics Formulas", subject: "Physics", class: "Class 9", section: "Section C", type: "Image", date: "Apr 28, 2025" },
  { id: 3, title: "Programming Concepts", subject: "Computer Science", class: "Class 10", section: "Section B", type: "Text", date: "Apr 25, 2025" },
  { id: 4, title: "Geometry Notes", subject: "Mathematics", class: "Class 6", section: "Section A", type: "PDF", date: "Apr 22, 2025" },
  { id: 5, title: "Circuit Diagrams", subject: "Physics", class: "Class 9", section: "Section C", type: "Image", date: "Apr 20, 2025" }
];

// Class options and section  options as provided
const classOptions = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const sectionOptions = [
  "Section A",
  "Section B",
  "Section C",
  "Section D",
  "Section E",
  "Section F",
];

const SubjectsComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSubjectDetails, setShowSubjectDetails] = useState(false);
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const { darkMode } = useTheme();
  
  // Function to handle subject click
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setShowSubjectDetails(true);
  };
  
  // Function to go back to subject list
  const handleBackToSubjects = () => {
    setShowSubjectDetails(false);
    setSelectedSubject(null);
    setUploadFormVisible(false);
  };
  
  // Get classes for selected subject
  const getSubjectClasses = () => {
    if (!selectedSubject) return [];
    return teacherClasses;
  };
  
  // Get content for selected subject
  const getSubjectContent = () => {
    if (!selectedSubject) return [];
    let filtered = academicContent.filter(item => item.subject === selectedSubject.name);
    if (filterClass) {
      filtered = filtered.filter(item => item.class === filterClass);
    }
    return filtered;
  };

  // Subjects List View
  const SubjectsListView = () => (
    <div className={`${darkMode ? 'bg-[#100e10]' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Subjects</div>
        <div className="flex space-x-2">
          <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:bg-[#341b47]' : 'text-gray-500 hover:bg-gray-200'} px-3 py-1 text-sm rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <Filter size={14} className="mr-1" />
            Filter by
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teacherSubjects.map((subject) => (
          <div 
            key={subject.id}
            onClick={() => handleSubjectClick(subject)}
            className={`flex justify-between items-center p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-[#341b47]' : 'border-gray-100 hover:bg-gray-50'} cursor-pointer transition duration-200`}
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: subject.color }}
              />
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{subject.name}</p>
            </div>
            <button 
              className="text-white px-3 py-1 text-sm rounded-full"
              style={{ backgroundColor: subject.color }}
            >
              View All
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Subject Detail View
  const SubjectDetailView = () => {
    if (!selectedSubject) return null;
    
    const classes = getSubjectClasses();
    const content = getSubjectContent();
    
    return (
      <div>
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToSubjects}
            className={`mr-4 ${darkMode ? 'bg-[#341b47] hover:bg-[#2a0c2e] text-white' : 'bg-gray-200 hover:bg-gray-300'} p-2 rounded-full transition duration-200`}
          >
            ←
          </button>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ color: selectedSubject.color }}>
            {selectedSubject.name}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classes List */}
          <div className={`${darkMode ? 'bg-[#100e10]' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <div className="flex justify-between items-center mb-6">
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Classes</div>
              <div className={`${darkMode ? 'bg-[#341b47]' : 'bg-gray-200'} rounded-full p-2 flex items-center`}>
                <Search size={16} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                <input 
                  type="text" 
                  placeholder="Search classes" 
                  className={`bg-transparent border-none outline-none text-sm ml-2 w-32 ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800'}`}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {classes.map((cls) => (
                <div 
                  key={cls.id}
                  className={`flex justify-between items-center p-3 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-[#341b47]' : 'border-gray-100 hover:bg-gray-50'} transition duration-200`}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: cls.color }}
                    />
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cls.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cls.section}</p>
                    </div>
                  </div>
                  <button 
                    className="text-white px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: cls.color }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Upload and List */}
          <div className={`${darkMode ? 'bg-[#100e10]' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <div className="flex justify-between items-center mb-6">
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Academic Content</div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setUploadFormVisible(!uploadFormVisible)}
                  className={`flex items-center ${darkMode ? 'bg-[#341b47] hover:bg-[#2a0c2e]' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 text-sm rounded-md transition duration-200`}
                >
                  <Upload size={14} className="mr-1" />
                  Upload Content
                </button>
                <select 
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className={`${darkMode ? 'bg-[#341b47] border-gray-700 text-white' : 'bg-gray-100 border-gray-200'} border rounded-md px-2 py-1 text-sm`}
                >
                  <option value="">All Classes</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {uploadFormVisible && (
              <div className={`mb-6 p-4 border ${darkMode ? 'border-gray-700 bg-[#2a0c2e]' : 'border-gray-200'} rounded-lg`}>
                <h3 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upload New Content</h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                    <input 
                      type="text" 
                      className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Content title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Class</label>
                      <select className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                        {classOptions.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Section</label>
                      <select className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                        {sectionOptions.map((section) => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Content Type</label>
                    <select className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                      <option value="pdf">PDF Document</option>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                      <option value="video">Video Link</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Upload File</label>
                    <div className={`w-full px-3 py-6 border border-dashed ${darkMode ? 'border-gray-700 bg-[#2a0c2e]' : 'border-gray-300'} rounded-md text-center`}>
                      <Upload size={24} className={`mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drag & drop files here or click to browse</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setUploadFormVisible(false)}
                      className={`px-4 py-2 border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-[#341b47]' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded-md text-sm`}
                    >
                      Cancel
                    </button>
                    <button 
                      className={`px-4 py-2 ${darkMode ? 'bg-[#341b47] hover:bg-[#2a0c2e]' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md text-sm`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {content.map((item) => {
                const classObj = teacherClasses.find(
                  c => c.name === item.class && c.section === item.section
                );
                const color = classObj ? classObj.color : "#888888";
                
                return (
                  <div 
                    key={item.id}
                    className={`flex justify-between items-center p-3 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-[#341b47]' : 'border-gray-100 hover:bg-gray-50'} transition duration-200`}
                  >
                    <div>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: color }}
                        />
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`}>{item.class} - {item.section}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`}>{item.type}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}>
                        <FileText size={18} />
                      </button>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {content.length === 0 && (
                <div className={`text-center py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No content available. Upload some content using the button above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showSubjectDetails ? <SubjectsListView /> : <SubjectDetailView />}
    </div>
  );
};

export default SubjectsComponent;