import React from 'react';
import Sidebar from '../components/pages/Sidebar';
import Header from '../components/pages/Header';
import Provider from '../components/pages/Provider';
import UserManagement from '../components/pages/UserManagement';
import AnalyticDashboard from '../components/pages/AnalyticDashboard';
import PlatformManagement from '../components/pages/PlatformManagement';
import AllProviderInformation from '../components/pages/AllProviderInformation';

function Dashboard({ user, setUser, activeSection, setActiveSection, providers, setProviders, users, setUsers, faqs, setFaqs }) {
  return (
    <div className="flex-1">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64">
        <Header user={user} setUser={setUser} />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{activeSection}</h1>
          {activeSection === 'Provider' && (
            <Provider providers={providers} setProviders={setProviders} />
          )}
          {activeSection === 'User Management' && (
            <UserManagement users={users} setUsers={setUsers} />
          )}
          {activeSection === 'Analytics Dashboard' && <AnalyticDashboard />}
          {activeSection === 'Platform Management' && (
            <PlatformManagement faqs={faqs} setFaqs={setFaqs} />
          )}
          {activeSection === 'All Provider Information' && (
            <AllProviderInformation providers={providers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;