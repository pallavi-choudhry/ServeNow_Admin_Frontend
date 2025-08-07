import React from 'react';

const Sidebar = ({ setActiveSection }) => {
  const sections = [
    { name: 'Provider Request', icon: '🏠' },
    { name: 'User Management', icon: '👥' },
    { name: 'Analytics Dashboard', icon: '📊' },
    { name: 'Platform Management', icon: '⚙️' },
    { name: 'All Provider Information', icon: '📜' },
    
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {sections.map((section) => (
            <li key={section.name}>
              <button
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded transition-colors"
                onClick={() => setActiveSection(section.name)}
              >
                <span className="text-lg">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;   