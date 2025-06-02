import React from 'react';
import { 
  Settings as SettingsIcon,
  Save,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bell,
  Lock,
  Users,
  Shield,
  Palette
} from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      id: 1,
      title: "Institute Profile",
      icon: <Building2 className="text-blue-600" size={24} />,
      fields: [
        { label: "Institute Name", value: "GyanSetu Academy" },
        { label: "Email", value: "contact@gyansetu.edu" },
        { label: "Phone", value: "+91 98765 43210" },
        { label: "Website", value: "www.gyansetu.edu" },
        { label: "Address", value: "123 Education Street, Delhi, India" }
      ]
    },
    {
      id: 2,
      title: "Notifications",
      icon: <Bell className="text-purple-600" size={24} />,
      fields: [
        { label: "Email Notifications", value: "Enabled" },
        { label: "SMS Notifications", value: "Enabled" },
        { label: "Push Notifications", value: "Enabled" },
        { label: "Report Alerts", value: "Enabled" }
      ]
    },
    {
      id: 3,
      title: "Security",
      icon: <Shield className="text-green-600" size={24} />,
      fields: [
        { label: "Two-Factor Authentication", value: "Enabled" },
        { label: "Password Policy", value: "Strong" },
        { label: "Session Timeout", value: "30 minutes" },
        { label: "IP Restrictions", value: "None" }
      ]
    },
    {
      id: 4,
      title: "Appearance",
      icon: <Palette className="text-indigo-600" size={24} />,
      fields: [
        { label: "Theme", value: "Light" },
        { label: "Primary Color", value: "Blue" },
        { label: "Font Size", value: "Medium" },
        { label: "Language", value: "English" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-4">
        <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-8">
          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your institute settings and preferences.</p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {settingsSections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-gray-50 mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.fields.map((field, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">{field.label}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-4">{field.value}</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Save size={20} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Settings */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-gray-50 mr-4">
                    <Users className="text-orange-600" size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Default User Role</span>
                    <span className="text-sm font-medium text-gray-900">Teacher</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">User Registration</span>
                    <span className="text-sm font-medium text-gray-900">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Approval Required</span>
                    <span className="text-sm font-medium text-gray-900">Yes</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-gray-50 mr-4">
                    <Lock className="text-red-600" size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Data Sharing</span>
                    <span className="text-sm font-medium text-gray-900">Limited</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Analytics</span>
                    <span className="text-sm font-medium text-gray-900">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Cookie Policy</span>
                    <span className="text-sm font-medium text-gray-900">Strict</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;