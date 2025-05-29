// This file is now .jsx. All TypeScript types/interfaces removed. Tailwind classes replaced with placeholder CSS classes. Move styles to a CSS file.
// src/components/Sidebar/Sidebar.tsx
import React from "react";
import { Home, Calendar, Zap, MessageSquare, Menu } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
  <aside className="fixed top-0 left-0 z-20 flex flex-col items-center bg-white h-full w-20 py-6 shadow-lg">
    {/* User Avatar */}
    <div className="mb-8">
      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
        <span> <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368' /></svg> </span>
      </div>
    </div>
    {/* Menu Button */}
    <button className="mb-8 w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200">
      <Menu size={24} />
    </button>
    {/* Navigation Icons */}
    <nav className="flex flex-col gap-4">
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
          activeTab === "home"
            ? "bg-purple-100 text-purple-600"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("home")}
      >
        <Home size={24} />
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
          activeTab === "calendar"
            ? "bg-purple-100 text-purple-600"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("calendar")}
      >
        <Calendar size={24} />
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
          activeTab === "zap"
            ? "bg-purple-100 text-purple-600"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("zap")}
      >
        <Zap size={24} />
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
          activeTab === "chat"
            ? "bg-purple-100 text-purple-600"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("chat")}
      >
        <MessageSquare size={24} />
      </button>
    </nav>
  </aside>
);

export default Sidebar;