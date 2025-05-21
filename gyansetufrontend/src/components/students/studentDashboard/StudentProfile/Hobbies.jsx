// components/Hobbies.jsx
import React from 'react';

const Hobbies = ({ 
  formData, 
  hobbyOptions, 
  languages, 
  proficiencyLevels,
  handleInputChange, 
  handleHobbyChange, 
  handleLanguageChange, 
  addLanguage, 
  removeLanguage 
}) => {
  // Common styles for inputs and selects to maintain consistency
  const inputStyle = "w-full p-2 border rounded bg-white";
  
  // Clean button style for both add and remove buttons
  const buttonStyle = "flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200";
  const addButtonStyle = `${buttonStyle} bg-violet-500 text-white hover:bg-violet-600`;
  const removeButtonStyle = `${buttonStyle} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  
  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Hobbies & Interests</h2>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Hobbies</label>
        <select
          name="selectedHobbies"
          value=""
          onChange={(e) => {
            if (e.target.value && !formData.selectedHobbies.includes(e.target.value)) {
              handleHobbyChange(e.target.value);
            }
          }}
          className={inputStyle}
        >
          <option value="">Select Hobbies</option>
          {hobbyOptions.map(hobby => (
            <option key={hobby} value={hobby}>{hobby}</option>
          ))}
        </select>
        
        {formData.selectedHobbies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.selectedHobbies.map(hobby => (
              <div key={hobby} className="bg-violet-200 text-violet-700 px-3 py-1 rounded-full flex items-center">
                {hobby}
                <button
                  type="button"
                  onClick={() => handleHobbyChange(hobby)}
                  className="ml-2 text-violet-400 hover:text-violet-700 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Languages Known</h3>
        {formData.languages.map((lang, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5">
                <label className="block text-gray-700 mb-2">Language <span className="text-red-600">*</span></label>
                <select
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  className={inputStyle}
                  required
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-5">
                <label className="block text-gray-700 mb-2">Proficiency <span className="text-red-600">*</span></label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                  className={inputStyle}
                  required
                >
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2 flex items-center justify-start gap-2 mt-8">
                {/* Only show add button for the last language row */}
                {index === formData.languages.length - 1 && (
                  <button
                    type="button"
                    onClick={addLanguage}
                    className={addButtonStyle}
                    title="Add another language"
                  >
                    +
                  </button>
                )}
                
                {/* Only show remove button if there's more than one language */}
                {formData.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className={removeButtonStyle}
                    title="Remove this language"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;