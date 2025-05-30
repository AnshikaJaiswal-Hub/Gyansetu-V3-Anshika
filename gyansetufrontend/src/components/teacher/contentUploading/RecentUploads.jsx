import React, { useState, useEffect } from 'react';
import { File, Image, Type, Check, BookOpen, Plus } from 'lucide-react';

const RecentUploads = ({ darkMode, recentUploads, onUploadsChange }) => {
  const [filterClass, setFilterClass] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filteredUploads, setFilteredUploads] = useState([]);

  // Class options
  const classOptions = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
  ];

  // Section options
  const sectionOptions = [
    "Section A", "Section B", "Section C", "Section D", "Section E", "Section F",
  ];

  // Get subject color for UI
  const getSubjectColor = (subject) => {
    const colorMap = {
      'Physics': 'bg-blue-100 text-blue-800',
      'Chemistry': 'bg-green-100 text-green-800',
      'Biology': 'bg-emerald-100 text-emerald-800',
      'Maths': 'bg-purple-100 text-purple-800',
      'English': 'bg-yellow-100 text-yellow-800',
      'Hindi': 'bg-orange-100 text-orange-800',
      'History': 'bg-red-100 text-red-800',
      'Geography': 'bg-teal-100 text-teal-800',
      'Civics': 'bg-cyan-100 text-cyan-800',
      'Economics': 'bg-pink-100 text-pink-800',
      'Science': 'bg-indigo-100 text-indigo-800',
      'Computer': 'bg-gray-100 text-gray-800',
      'Accounts': 'bg-amber-100 text-amber-800',
      'Physical Education': 'bg-lime-100 text-lime-800',
      'Sanskrit': 'bg-rose-100 text-rose-800',
      'French': 'bg-fuchsia-100 text-fuchsia-800',
      'Political Science': 'bg-violet-100 text-violet-800',
      'Sociology': 'bg-sky-100 text-sky-800',
      'Psychology': 'bg-stone-100 text-stone-800',
    };
    
    return colorMap[subject] || 'bg-gray-100 text-gray-800';
  };

  // Add useEffect for filtering
  useEffect(() => {
    let filtered = [...recentUploads];
    
    if (filterClass) {
      filtered = filtered.filter(upload => upload.class === filterClass);
    }
    
    if (filterSection) {
      filtered = filtered.filter(upload => upload.section === filterSection);
    }
    
    if (filterSubject) {
      filtered = filtered.filter(upload => upload.subject === filterSubject);
    }
    
    setFilteredUploads(filtered);
  }, [filterClass, filterSection, filterSubject, recentUploads]);

  return (
    <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-lg shadow-md p-6 transition-colors duration-300`}>
      <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-4`}>Recent Uploads</h2>
      
      {/* Filter Section */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <select 
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select 
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="">All Sections</option>
            {sectionOptions.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select 
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {(() => {
              // Get all unique subjects from recent uploads
              const allSubjects = new Set(recentUploads.map(upload => upload.subject));
              return Array.from(allSubjects).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ));
            })()}
          </select>
        </div>

        <button
          onClick={() => {
            setFilterClass('');
            setFilterSection('');
            setFilterSubject('');
          }}
          className={`w-full px-3 py-2 rounded-md text-sm font-medium
          ${darkMode 
            ? "bg-[#5c4370] text-white hover:bg-[#6d4f85]" 
            : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
        >
          Clear Filters
        </button>
      </div>

      <div className="space-y-4">
        {filteredUploads.map(upload => (
          <div key={upload.id} className={`border border-gray-200 rounded-md p-3 ${darkMode ? "bg-[#231130] hover:bg-[#5c4370]" : "bg-purple-200 hover:bg-purple-50"}`}>
            <div className="flex items-start">
              {upload.type === 'pdf' && <File size={18} className="text-red-500 mt-1 mr-2" />}
              {upload.type === 'image' && <Image size={18} className="text-green-500 mt-1 mr-2" />}
              {upload.type === 'text' && <Type size={18} className="text-blue-500 mt-1 mr-2" />}
              
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${darkMode ? "text-purple-200" : "text-gray-800"}`}>{upload.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <p className={`text-xs ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {upload.class} - {upload.section}
                  </p>
                  {upload.subject && (
                    <span className={`px-2 py-0.5 text-xs rounded-full flex items-center ${getSubjectColor(upload.subject)}`}>
                      <BookOpen size={12} className="mr-1" />
                      {upload.subject}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <span className={`text-xs ${darkMode ? "text-white" : "text-gray-800"}`}>{upload.date}</span>
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    Uploaded
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-2">
          <Plus size={16} className="mr-1" />
          View All Uploads
        </button>
      </div>
    </div>
  );
};

export default RecentUploads; 