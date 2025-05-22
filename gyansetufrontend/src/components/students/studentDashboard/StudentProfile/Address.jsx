// components/Address.jsx
import React from 'react';

const Address = ({ formData, countries, handleInputChange, sameAsCurrent, handleSameAddressChange }) => {
  return (
    <div className="p-6 bg-white rounded-4xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Address</h2>
      
      <h3 className="text-xl font-semibold mb-4">Current Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Address 1 <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="currentAddress1" 
            value={formData.currentAddress1 || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Street address" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Address 2</label>
          <input 
            type="text" 
            name="currentAddress2" 
            value={formData.currentAddress2 || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Apartment, suite, unit, etc. (optional)" 
            
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Country <span className="text-red-600">*</span></label>
          <select 
            name="currentCountry" 
            value={formData.currentCountry || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          
        </div>
        <div>
          <label className="block text-gray-700 mb-2">State <span className="text-red-600">*</span></label>
          <select 
            name="currentState" 
            value={formData.currentState || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select State</option>
            <option value="Haryana">State 1</option>
            <option value="Rajasthan">State 2</option>
            <option value="Delhi">Ordino</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">City <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="currentCity" 
            value={formData.currentCity || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="City"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">District <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="currentDistrict" 
            value={formData.currentDistrict || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="District"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Pincode <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            name="currentPincode" 
            value={formData.currentPincode || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Postal/Zip Code" 
            required
          />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Permanent Address</h3>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input 
            type="checkbox" 
            checked={sameAsCurrent} 
            onChange={handleSameAddressChange} 
            className="form-checkbox h-5 w-5 text-blue-600" 
          />
          <span className="ml-2">Same as Current Address</span>
        </label>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${sameAsCurrent ? 'opacity-50' : ''}`}>
        <div>
          <label className="block text-gray-700 mb-2">Address 1</label>
          <input 
            type="text" 
            name="permanentAddress1" 
            value={formData.permanentAddress1 || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Street address" 
            disabled={sameAsCurrent} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Address 2</label>
          <input 
            type="text" 
            name="permanentAddress2" 
            value={formData.permanentAddress2 || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Apartment, suite, unit, etc. (optional)" 
            disabled={sameAsCurrent} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Country</label>
          <select 
            name="permanentCountry" 
            value={formData.permanentCountry || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            disabled={sameAsCurrent}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">State</label>
          <select 
            name="permanentState" 
            value={formData.permanentState || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            disabled={sameAsCurrent}
          >
            <option value="">Select State</option>
            <option value="State1">State 1</option>
            <option value="State2">State 2</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">City</label>
          <input 
            type="text" 
            name="permanentCity" 
            value={formData.permanentCity || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="City" 
            disabled={sameAsCurrent} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">District</label>
          <input 
            type="text" 
            name="permanentDistrict" 
            value={formData.permanentDistrict || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="District" 
            disabled={sameAsCurrent} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Pincode</label>
          <input 
            type="text" 
            name="permanentPincode" 
            value={formData.permanentPincode || ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded" 
            placeholder="Postal/Zip Code" 
            disabled={sameAsCurrent} 
          />
        </div>
      </div>
    </div>
  );
};

export default Address;