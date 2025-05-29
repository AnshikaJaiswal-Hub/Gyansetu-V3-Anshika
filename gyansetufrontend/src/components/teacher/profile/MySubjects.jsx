import React, { useState } from 'react';
import { Search, Edit, Filter, FileText, Upload } from 'lucide-react';

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

// Class options and section options as provided
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">My Subjects</div>
        <div className="flex space-x-2">
          <button className="flex items-center text-gray-500 px-3 py-1 text-sm rounded-md border border-gray-300">
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
            className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition duration-200"
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: subject.color }}
              />
              <p className="font-medium">{subject.name}</p>
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
            className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition duration-200"
          >
            ←
          </button>
          <h2 className="text-xl font-bold" style={{ color: selectedSubject.color }}>
            {selectedSubject.name}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classes List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Classes</div>
              <div className="bg-gray-200 rounded-full p-2 flex items-center">
                <Search size={16} className="text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search classes" 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-32"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {classes.map((cls) => (
                <div 
                  key={cls.id}
                  className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition duration-200"
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
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Upload and List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Academic Content</div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setUploadFormVisible(!uploadFormVisible)}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition duration-200"
                >
                  <Upload size={14} className="mr-1" />
                  Upload Content
                </button>
                <select 
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded-md px-2 py-1 text-sm"
                >
                  <option value="">All Classes</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {uploadFormVisible && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-3">Upload New Content</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Content title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">Class</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {classOptions.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Section</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {sectionOptions.map((section) => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Content Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF Document</option>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                      <option value="video">Video Link</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Upload File</label>
                    <div className="w-full px-3 py-6 border border-dashed border-gray-300 rounded-md text-center">
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setUploadFormVisible(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
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
                    className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition duration-200"
                  >
                    <div>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: color }}
                        />
                        <p className="font-medium">{item.title}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 mr-3">{item.class} - {item.section}</span>
                        <span className="text-xs text-gray-500 mr-3">{item.type}</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FileText size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {content.length === 0 && (
                <div className="text-center py-6 text-gray-500">
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