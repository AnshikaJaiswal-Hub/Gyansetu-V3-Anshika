import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/api/authService';
import ParentNavbar from '../../components/Parent/parentDashboard/ParentNavbar';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 pt-10 pr-10 pb-10">
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl pl-6">

       
         
          </div>
    </div>
  );
};

export default ParentDashboard; 