import React from 'react';
function Sidebar({ setActiveSection }) {
  const sections = ['Provider Verification', 'User Management', 'Analytics Dashboard', 'Platform Management'];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
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


