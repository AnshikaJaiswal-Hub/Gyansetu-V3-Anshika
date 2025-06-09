import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, CreditCard, UserCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

// Custom styled user profile icon with gray and purple
const CustomUserIcon = () => (
  <div className="w-full h-full relative flex items-center justify-center">
    {/* Gray circle background */}
    <div className="w-24 h-24 rounded-full bg-gray-200 absolute"></div>
    
    {/* Gray user icon */}
    <UserCircle className="w-24 h-24 text-[#513159] absolute" />
    
    
  </div>
);

// Example teacher data
const teacherData = {
  name: "Sarah Johnson",
  teacherId: "T1024589",
  email: "sarah.johnson@school.edu",
  phone: "+91-9876543210",
  image: "" // Empty by default to test the default icon case
};

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: teacherData.name,
    phone: teacherData.phone,
    image: teacherData.image
  });
  const [lastLogin, setLastLogin] = useState("");
  const fileInputRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Set current date and time as last login
    const now = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };
    const timeString = now.toLocaleString("en-US", options);
    setLastLogin(`${timeString} (Tokyo)`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save the changes to teacherData (in a real app, you would send this to the backend)
      Object.assign(teacherData, formData);
    }
    setIsEditing(!isEditing);
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove the profile picture
  const handleRemovePicture = () => {
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
  };

  // Function to open file browser
  const openFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`${darkMode ? 'bg-[#231130]' : 'bg-gray-200'} p-4 md:p-6 rounded-2xl w-full`}>
      <div className={`${darkMode ? 'bg-[#341B47]' : 'bg-white'} rounded-lg shadow-lg p-6 flex flex-col`}>
        <div className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Profile</div>
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative group">
            {formData.image ? (
              <img 
                src={formData.image} 
                alt="Teacher profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <CustomUserIcon />
            )}
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          {/* Display image edit options only when in edit mode */}
          {isEditing && (
            <div className="w-full mt-2 mb-4 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                {formData.image ? "Current profile image" : "No image selected"}
              </p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={openFileBrowser}
                  className={`text-sm ${darkMode ? 'bg-[#341b47] hover:bg-[#2a0c2e] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-3 py-1 rounded border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition duration-200`}
                >
                  {formData.image ? "Change Picture" : "Browse files..."}
                </button>
                {formData.image && (
                  <button
                    onClick={handleRemovePicture}
                    className={`text-sm ${darkMode ? 'bg-[#341b47] hover:bg-[#2a0c2e] text-red-400' : 'bg-gray-100 hover:bg-gray-200 text-red-600'} px-3 py-1 rounded border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition duration-200`}
                  >
                    Remove Picture
                  </button>
                )}
              </div>
            </div>
          )}
          
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Last login: {lastLogin}</p>
        </div>
        
        <div className="space-y-4 flex-grow">
          <div className="flex items-center">
            <User className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-3`} size={18} />
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded px-2 py-1`}
                />
              ) : (
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{teacherData.name}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <CreditCard className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-3`} size={18} />
            <div>
              <p className={darkMode ? 'text-white' : 'text-gray-800'}>{teacherData.teacherId}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Mail className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-3`} size={18} />
            <div>
              <p className={darkMode ? 'text-white' : 'text-gray-800'}>{teacherData.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-3`} size={18} />
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`border ${darkMode ? 'border-gray-700 bg-[#2a0c2e] text-white' : 'border-gray-300'} rounded px-2 py-1`}
                />
              ) : (
                <p className={darkMode ? 'text-white' : 'text-gray-800'}>{teacherData.phone}</p>
              )}
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleEdit}
          className={`mt-6 ${darkMode ? 'bg-[#231130] hover:bg-[#513159]' : 'bg-[#513159] hover:bg-[#5c4370]'} text-white font-medium py-2 px-4 rounded-full transition duration-200`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

// Note: In a real application, you would typically:
// 1. Set up proper file validation (size, type)
// 2. Have a backend API to store the uploaded image
// 3. Add image compression to reduce file size
// 4. Handle upload progress and errors