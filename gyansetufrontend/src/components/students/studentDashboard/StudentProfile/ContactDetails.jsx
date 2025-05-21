// components/ContactDetails.jsx
import React from 'react';

const ContactDetails = ({ formData, countryCodes, handleInputChange }) => {
  // Common styles for consistent appearance
  const inputStyle = "w-full p-2 border rounded bg-white";
  const selectStyle = "w-24 p-2 border rounded-l bg-white";
  const inputWithPrefixStyle = "flex-1 p-2 border-t border-b border-r rounded-r bg-white";

  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Mobile Number <span className="text-red-600">*</span></label>
            <div className="flex">
              <select
                name="mobileCountryCode"
                value={formData.mobileCountryCode}
                onChange={handleInputChange}
                className={selectStyle}
                defaultValue="+91"
                required
              >
                {/* Reorder the array to put India's code (+91) first */}
                {["+91", ...countryCodes.filter(code => code !== "+91")].map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className={inputWithPrefixStyle}
                placeholder="Enter mobile number"
                
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Whatsapp Number</label>
            <div className="flex">
              <select
                name="whatsappCountryCode"
                value={formData.whatsappCountryCode}
                onChange={handleInputChange}
                className={selectStyle}
                defaultValue="+91"
              >
                {/* Reorder the array to put India's code (+91) first */}
                {["+91", ...countryCodes.filter(code => code !== "+91")].map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className={inputWithPrefixStyle}
                placeholder="Enter Whatsapp number"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email Id</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter your email address"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;