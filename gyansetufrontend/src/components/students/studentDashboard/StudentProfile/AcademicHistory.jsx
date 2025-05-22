// components/AcademicHistory.jsx
import React from 'react';

const AcademicHistory = ({ 
  formData, 
  instituteTypes, 
  instituteNames, 
  boardOptions, 
  stateOptions, 
  classOptions, 
  handleInputChange 
}) => {
  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Academic History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Institute Type <span className="text-red-600">*</span></label>
          <select 
            name="instituteType" 
            value={formData.instituteType} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            {instituteTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Institute Name <span className="text-red-600">*</span></label>
          <select 
            name="instituteName" 
            value={formData.instituteName} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Institute</option>
            {instituteNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Board <span className="text-red-600">*</span></label>
          <select 
            name="board" 
            value={formData.board} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Board</option>
            {boardOptions.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">State <span className="text-red-600">*</span> </label>
          <select 
            name="academicState" 
            value={formData.academicState} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select State</option>
            {stateOptions.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Class <span className="text-red-600">*</span></label>
          <select 
            name="class" 
            value={formData.class} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Class</option>
            {classOptions.map(classOption => (
              <option key={classOption} value={classOption}>{classOption}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory;