import React from 'react';

function Sidebar({ setActiveSection }) {
  const sections = ['Provider', 'User Management', 'Analytics Dashboard', 'Platform Management'];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6 fixed top-0 left-0 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li
            key={section}
            className="cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 text-lg"
            onClick={() => setActiveSection(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;