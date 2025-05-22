// components/BasicInformation.jsx
import React from 'react';

const BasicInformation = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">First Name <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter your first name" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Last Name <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter your last name"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Gender <span className="text-red-600">*</span></label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="gender" 
                value="male" 
                checked={formData.gender === "male"} 
                onChange={handleInputChange} 
                className="h-5 w-5" 
                required
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="gender" 
                value="female" 
                checked={formData.gender === "female"} 
                onChange={handleInputChange} 
                className="h-5 w-5" 
                
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Date of Birth <span className="text-red-600">*</span></label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Father Name <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="fatherName" 
            value={formData.fatherName || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter father's name" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Mother Name <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="motherName" 
            value={formData.motherName || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter mother's name" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Guardian Name</label>
          <input 
            type="text" 
            name="guardianName" 
            value={formData.guardianName || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter guardian's name (if applicable)" 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Aim</label>
          <input 
            type="text" 
            name="aim" 
            value={formData.aim || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter your aim/goal" 
          />
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-300">
          {formData.profilePicture ? (
            <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img src="profile.png" alt="Default profile" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="ml-4">
          <label className="border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-200 inline-block">
            <span className="text-gray-600">
              <span className="block text-center">⬆️</span>
              <span className="block text-center">Upload Your Picture</span>
            </span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;