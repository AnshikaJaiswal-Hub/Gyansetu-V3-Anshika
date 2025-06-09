import React, { useState, useEffect } from 'react';
import { Upload, File, Image, Type, X } from 'lucide-react';

const UploadContent = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [textContent, setTextContent] = useState('');

  // Class options
  const classOptions = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
  ];

  // Section options
  const sectionOptions = [
    "Section A", "Section B", "Section C", "Section D", "Section E", "Section F",
  ];

  // Stream options for Class 11 and 12
  const streamOptions = {
    "Class 11": [
      "Non Medical", "Medical", "Medical with Maths", "Commerce with Maths",
      "Commerce without Maths", "Arts with Maths", "Arts without Maths",
    ],
    "Class 12": [
      "Non Medical", "Medical", "Medical with Maths", "Commerce with Maths",
      "Commerce without Maths", "Arts with Maths", "Arts without Maths",
    ],
  };

  // Subject options based on class and stream
  const subjectOptions = {
    "Class 6": ["English", "Maths", "Hindi", "History", "Geography", "Civics", "Science", "Sanskrit", "French"],
    "Class 7": ["English", "Maths", "Hindi", "History", "Geography", "Civics", "Science", "Sanskrit", "French"],
    "Class 8": ["English", "Maths", "Hindi", "History", "Geography", "Civics", "Science", "Sanskrit", "French"],
    "Class 9": ["English", "Maths", "Hindi", "History", "Geography", "Civics", "Economics", "Science", "Sanskrit", "French"],
    "Class 10": ["English", "Maths", "Hindi", "History", "Geography", "Civics", "Economics", "Science", "Sanskrit", "French"],
    "Class 11": {
      "Non Medical": ["Physics", "Chemistry", "Maths", "English", "Physical Education", "Computer"],
      "Medical": ["Physics", "Chemistry", "Biology", "English", "Physical Education", "Computer"],
      "Medical with Maths": ["Physics", "Chemistry", "Maths", "Biology", "English", "Physical Education", "Computer"],
      "Commerce with Maths": ["Accounts", "Maths", "Economics", "English", "Physical Education", "Computer"],
      "Commerce without Maths": ["Accounts", "Economics", "English", "Physical Education", "Computer"],
      "Arts with Maths": ["History", "Political Science", "Sociology", "Geography", "Psychology", "Economics", "English", "Maths", "Physical Education", "Computer"],
      "Arts without Maths": ["History", "Political Science", "Sociology", "Geography", "Psychology", "Economics", "English", "Physical Education", "Computer"],
    },
    "Class 12": {
      "Non Medical": ["Physics", "Chemistry", "Maths", "English", "Physical Education", "Computer"],
      "Medical": ["Physics", "Chemistry", "Biology", "English", "Physical Education", "Computer"],
      "Medical with Maths": ["Physics", "Chemistry", "Maths", "Biology", "English", "Physical Education", "Computer"],
      "Commerce with Maths": ["Accounts", "Maths", "Economics", "English", "Physical Education", "Computer"],
      "Commerce without Maths": ["Accounts", "Economics", "English", "Physical Education", "Computer"],
      "Arts with Maths": ["History", "Political Science", "Sociology", "Geography", "Psychology", "Economics", "English", "Maths", "Physical Education", "Computer"],
      "Arts without Maths": ["History", "Political Science", "Sociology", "Geography", "Psychology", "Economics", "English", "Physical Education", "Computer"],
    },
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Effect to update subjects when class or stream changes
  useEffect(() => {
    if (selectedClass === "Class 11" || selectedClass === "Class 12") {
      if (selectedStream) {
        setAvailableSubjects(subjectOptions[selectedClass][selectedStream]);
      } else {
        setAvailableSubjects([]);
      }
    } else if (selectedClass) {
      setAvailableSubjects(subjectOptions[selectedClass]);
    } else {
      setAvailableSubjects([]);
    }
  }, [selectedClass, selectedStream]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!selectedClass || !selectedSection || !selectedSubject || !title) {
      alert("Please fill in all required fields");
      return;
    }
    
    // If class 11 or 12, stream is required
    if ((selectedClass === "Class 11" || selectedClass === "Class 12") && !selectedStream) {
      alert("Please select a stream");
      return;
    }
    
    // Create new upload object
    const newUpload = {
      id: Date.now(),
      type: activeTab,
      title: title,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    // Reset form
    setTitle('');
    setDescription('');
    setFiles([]);
    setTextContent('');
    setSelectedSubject('');
    
    // You can emit this to parent component if needed
    return newUpload;
  };

  return (
    <div className={`${darkMode ? "bg-[#341B47]" : "bg-white"} rounded-lg shadow-md p-6 transition-colors duration-300`}>
      <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-6`}>Upload Content</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Class</label>
            <select 
              className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
              ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
              value={selectedClass}
              onChange={(e) => {
                const newClass = e.target.value;
                setSelectedClass(newClass);
                setSelectedStream('');
                setSelectedSubject('');
                
                if (newClass === "Class 11" || newClass === "Class 12") {
                  setAvailableSubjects([]);
                } else if (newClass) {
                  setAvailableSubjects(subjectOptions[newClass]);
                } else {
                  setAvailableSubjects([]);
                }
              }}
            >
              <option value="">Select Class</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Section</label>
            <select 
              className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
              ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(selectedClass === "Class 11" || selectedClass === "Class 12") && (
          <div className="mb-6 relative">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Stream</label>
            <select 
              className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
              ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
              value={selectedStream}
              onChange={(e) => {
                const newStream = e.target.value;
                setSelectedStream(newStream);
                setSelectedSubject('');
                
                if (selectedClass && newStream) {
                  setAvailableSubjects(subjectOptions[selectedClass][newStream]);
                } else {
                  setAvailableSubjects([]);
                }
              }}
            >
              <option value="">Select Stream</option>
              {streamOptions[selectedClass]?.map(stream => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="mb-6 relative">
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Subject</label>
          <select 
            className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedClass || ((selectedClass === "Class 11" || selectedClass === "Class 12") && !selectedStream)}
          >
            <option value="">Select Subject</option>
            {availableSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Title</label>
          <input 
            type="text" 
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this content"
          />
        </div>
        
        <div className="mb-6">
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Description (Optional)</label>
          <textarea 
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#603B9E]
            ${darkMode ? "bg-[#231130] text-white" : "bg-white text-gray-800"}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            placeholder="Brief description of the content"
          ></textarea>
        </div>
        
        {/* Content Type Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              type="button"
              className={`mr-1 py-2 px-4 flex items-center ${activeTab === 'pdf' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('pdf')}
            >
              <File size={18} className="mr-1" />
              PDF Upload
            </button>
            <button
              type="button"
              className={`mr-1 py-2 px-4 flex items-center ${activeTab === 'image' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('image')}
            >
              <Image size={18} className="mr-1" />
              Image Upload
            </button>
            <button
              type="button"
              className={`py-2 px-4 flex items-center ${activeTab === 'text' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('text')}
            >
              <Type size={18} className="mr-1" />
              Text Notes
            </button>
          </div>
        </div>
        
        {/* PDF Upload Form */}
        {activeTab === 'pdf' && (
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="pdf-upload"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
                multiple
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF (up to 10MB)</p>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                    <div className="flex items-center">
                      <File size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm truncate max-w-xs">{file.name}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Image Upload Form */}
        {activeTab === 'image' && (
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                multiple
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (up to 5MB)</p>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                      <Image size={24} className="text-gray-400" />
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <p className="text-xs truncate mt-1">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Text Notes Form */}
        {activeTab === 'text' && (
          <div className="mb-6">
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows="8"
              placeholder="Enter your notes or content here..."
            ></textarea>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
          >
            <Upload size={18} className="mr-2" />
            Upload Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContent; 