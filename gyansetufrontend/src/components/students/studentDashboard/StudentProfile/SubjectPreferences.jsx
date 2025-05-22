// components/SubjectPreferences.jsx
import React from 'react';

const SubjectPreferences = ({ 
  formData, 
  classOptions, 
  subjectOptions, 
  teacherOptions, 
  preferenceOptions, 
  handleInputChange, 
  addSubjectPreference 
}) => {
  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Subject Preference</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Class <span className="text-red-600">*</span></label>
          <select 
            name="subjectClass" 
            value={formData.subjectClass} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            {classOptions.map(classOption => (
              <option key={classOption} value={classOption}>{classOption}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Subject <span className="text-red-600">*</span></label>
          <select 
            name="subjectName" 
            value={formData.subjectName} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjectOptions.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Teachers <span className="text-red-600">*</span></label>
          <select 
            name="teacher" 
            value={formData.teacher} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Teacher</option>
            {teacherOptions.map(teacher => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Preference <span className="text-red-600">*</span></label>
          <select 
            name="preference" 
            value={formData.preference} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Preference</option>
            {preferenceOptions.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-end gap-4 mb-6">
        <div className="flex-grow max-w-xs">
          <label className="block text-gray-700 mb-2">Score in Percentage <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="score" 
            value={formData.score} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Enter score (e.g. 85)" 
            required
          />
        </div>
      
      </div>
      
      {formData.subjectPreferences.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Added Subjects</h3>
          <div className="border rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preference</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.subjectPreferences.map((pref, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap">{pref.class}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pref.subject}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pref.teacher}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pref.preference}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{pref.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPreferences;