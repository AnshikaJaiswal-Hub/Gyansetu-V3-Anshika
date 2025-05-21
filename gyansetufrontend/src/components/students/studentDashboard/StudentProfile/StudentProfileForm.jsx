// StudentProfileForm.jsx
import React, { useState } from 'react';
import BasicInformation from './BasicInformation';
import Address from './Address';
import Hobbies from './Hobbies';
import AcademicHistory from './AcademicHistory';
import ContactDetails from './ContactDetails';
import SubjectPreferences from './SubjectPreferences';
import ProgressBar from './ProgressBar';

// Arrays for dropdowns in Subject Preferences
const subjectOptions = ["Math", "Science", "Physics", "Chemistry", "Biology", "History", "Geography", "English", "Literature", "Computer Science"];
const teacherOptions = ["Mr. Smith", "Ms. Johnson", "Mrs. Williams", "Dr. Brown", "Mr. Davis"];
const preferenceOptions = ["High", "Medium", "Low"];

// Arrays for dropdowns in Academic History
const instituteTypes = ["School", "College", "University", "Institute"];
const instituteNames = ["Prod Test Institute", "Government School", "Public School", "Private School"];
const boardOptions = ["State Board", "CBSE", "ICSE", "IB", "Cambridge"];
const stateOptions = ["Delhi", "Maharashtra", "Tamil Nadu", "Karnataka", "Uttar Pradesh", "West Bengal"];
const classOptions = ["class 01", "class 02", "class 03", "class 04", "class 05", "class 06", "class 07", "class 08", "class 09", "class 10", "class 11", "class 12"];

const languages = [
  "English", "Spanish", "French", "German", "Chinese", "Japanese", "Hindi",
  "Arabic", "Russian", "Portuguese", "Italian", "Korean", "Dutch", "Turkish",
  "Swedish", "Polish", "Thai", "Vietnamese", "Greek", "Hebrew"
]

const proficiencyLevels = [
  "Beginner", "Intermediate", "Advanced", "Fluent", "Native", "Both"
];

const hobbyOptions = [
  "Reading", "Writing", "Drawing", "Painting", "Photography", "Cooking",
  "Baking", "Gardening", "Hiking", "Camping", "Fishing", "Swimming",
  "Cycling", "Running", "Dancing", "Singing", "Playing musical instruments",
  "Learning languages", "Traveling", "Watching movies", "Playing video games",
  "Board games", "Puzzles", "Collecting", "Crafting", "Volunteering"
];

// Country codes for phone numbers
const countryCodes = ["+1", "+44", "+91", "+61", "+86", "+49", "+33", "+81", "+7", "+55"];

const StudentProfileForm = () => {
  const [countries, setCountries] = useState([
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]);
  
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    guardianName: '',
    aim: '',
    profilePicture: null,
    currentAddress1: '',
    currentAddress2: '',
    currentCountry: '',
    currentState: '',
    currentCity: '',
    currentDistrict: '',
    currentPincode: '',
    permanentAddress1: '',
    permanentAddress2: '',
    permanentCountry: '',
    permanentState: '',
    permanentCity: '',
    permanentDistrict: '',
    permanentPincode: '',
    selectedHobbies: [],
    languages: [{ language: 'English', proficiency: 'Both' }],
    instituteType: 'School',
    instituteName: '',
    board: '',
    academicState: '',
    class: '',
    mobileCountryCode: '+1',
    mobileNumber: '',
    whatsappCountryCode: '+1',
    whatsappNumber: '',
    emailId: '',
    subjectClass: 'class 06',
    subjectName: '',
    teacher: '',
    preference: '',
    score: '',
    subjectPreferences: []
  });

  const pages = [
    'Basic Information',
    'Address',
    'Hobbies',
    'Academic History',
    'Contact Details',
    'Subject Preferences'
  ];

  const handleSameAddressChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsCurrent(isChecked);
    if (isChecked) {
      setFormData({
        ...formData,
        permanentAddress1: formData.currentAddress1,
        permanentAddress2: formData.currentAddress2,
        permanentCountry: formData.currentCountry,
        permanentState: formData.currentState,
        permanentCity: formData.currentCity,
        permanentDistrict: formData.currentDistrict,
        permanentPincode: formData.currentPincode
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profilePicture: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHobbyChange = (hobby) => {
    if (formData.selectedHobbies.includes(hobby)) {
      setFormData({
        ...formData,
        selectedHobbies: formData.selectedHobbies.filter(h => h !== hobby)
      });
    } else {
      setFormData({
        ...formData,
        selectedHobbies: [...formData.selectedHobbies, hobby]
      });
    }
  };

  const addLanguage = () => {
    const updatedLanguages = [...formData.languages, { language: 'English', proficiency: 'Both' }];
    setFormData({
      ...formData,
      languages: updatedLanguages
    });
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages.splice(index, 1);
    setFormData({
      ...formData,
      languages: updatedLanguages
    });
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index][field] = value;
    setFormData({
      ...formData,
      languages: updatedLanguages
    });
  };

  const addSubjectPreference = () => {
    if (formData.subjectName && formData.teacher && formData.preference) {
      const newPreference = {
        class: formData.subjectClass,
        subject: formData.subjectName,
        teacher: formData.teacher,
        preference: formData.preference,
        score: formData.score
      };
      setFormData({
        ...formData,
        subjectPreferences: [...formData.subjectPreferences, newPreference],
        subjectName: '',
        teacher: '',
        preference: '',
        score: ''
      });
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Student Profile Completed Successfully!');
  };

  const navigateToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0: 
        return (
          <BasicInformation 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleFileChange={handleFileChange} 
          />
        );
      case 1: 
        return (
          <Address 
            formData={formData} 
            countries={countries} 
            handleInputChange={handleInputChange} 
            sameAsCurrent={sameAsCurrent}
            handleSameAddressChange={handleSameAddressChange}
          />
        );
      case 2: 
        return (
          <Hobbies 
            formData={formData} 
            hobbyOptions={hobbyOptions} 
            languages={languages} 
            proficiencyLevels={proficiencyLevels} 
            handleInputChange={handleInputChange} 
            handleHobbyChange={handleHobbyChange} 
            handleLanguageChange={handleLanguageChange} 
            addLanguage={addLanguage} 
            removeLanguage={removeLanguage} 
          />
        );
      case 3: 
        return (
          <AcademicHistory 
            formData={formData} 
            instituteTypes={instituteTypes} 
            instituteNames={instituteNames} 
            boardOptions={boardOptions} 
            stateOptions={stateOptions} 
            classOptions={classOptions} 
            handleInputChange={handleInputChange} 
          />
        );
      case 4: 
        return (
          <ContactDetails 
            formData={formData} 
            countryCodes={countryCodes} 
            handleInputChange={handleInputChange} 
          />
        );
      case 5: 
        return (
          <SubjectPreferences 
            formData={formData} 
            classOptions={classOptions} 
            subjectOptions={subjectOptions} 
            teacherOptions={teacherOptions} 
            preferenceOptions={preferenceOptions} 
            handleInputChange={handleInputChange} 
            addSubjectPreference={addSubjectPreference} 
          />
        );
      default: 
        return null;
    }
  };

  return (
    <div className='bg-gray-100 pt-10 pr-10 pb-10'>
    <div className='bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl'>
    <>
      <style>
        {`
          body {
              background: linear-gradient(to bottom right, #e5e0fe, #ffffff, #a78bfa);
          
          }
        `}
      </style>
      <div className="max-w-4xl mx-auto min-h-screen">
        <ProgressBar 
          pages={pages} 
          currentPage={currentPage} 
          navigateToPage={navigateToPage} 
        />
        <div className="p-6">
          {renderPageContent()}
          <div className="mt-6 flex justify-end">
            {currentPage === 0 ? (
              <button type="button" onClick={goToNextPage} className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700">
                Next
              </button>
            ) : currentPage === pages.length - 1 ? (
              <div className="flex space-x-4">
                <button type="button" onClick={goToPrevPage} className="px-6 py-3 bg-gray-300 rounded-full hover:bg-gray-400">
                  Previous
                </button>
                <button type="button" onClick={handleSubmit} className="px-6 py-3 bg-lime-600 text-white rounded-full hover:bg-lime-700">
                  Submit
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button type="button" onClick={goToPrevPage} className="px-6 py-3 bg-gray-300 rounded-full hover:bg-gray-400">
                  Previous
                </button>
                <button type="button" onClick={goToNextPage} className="px-6 py-3 bg-violet-500 text-white rounded-full hover:bg-violet-600">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    </div>
    </div>
  );
};

export default StudentProfileForm;