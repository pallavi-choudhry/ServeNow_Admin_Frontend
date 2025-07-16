import { useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// import dashboard from './components/dashboard';
import ProviderVerification from './components/ProviderVerification';
import UserManagement from './components/UserManagement';
import AnalyticDashboard from './components/AnalyticDashboard';
import PlatformManagement from './components/PlatformManagement';

import React from 'react';

function App() {
  
  const [activeSection, setActiveSection] = useState('Provider Verification');
  const [providers, setProviders] = useState([
    { id: 1, name: 'John Doe', license: 'LIC123', status: 'Pending' },
    { id: 2, name: 'Jane Smith', license: 'LIC456', status: 'Pending' },
  ]);
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', activity: 'Active', issues: 'None' },
    { id: 2, username: 'user2', activity: 'Inactive', issues: 'Reported' },
  ]);
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'What is the service?', answer: 'It is a platform for providers.' },
  ]);

   return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        
        
        <Route path="/dashboard" element={
          <div>
            <Header />
            <Sidebar setActiveSection={setActiveSection} />
            {activeSection === 'Provider Verification' && <ProviderVerification providers={providers} setProviders={setProviders} />}
            {activeSection === 'User Management' && <UserManagement users={users} setUsers={setUsers} />}
           {activeSection === 'Analytics Dashboard' && (<AnalyticDashboard />)}



            {activeSection === 'Platform Management' && <PlatformManagement faqs={faqs} setFaqs={setFaqs} />}
          </div>
        } />
      </Routes>
    </Router>
  );
  
}

export default App;


//  import { useState } from 'react';
//  import Login from './components/Login';
//  import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
//  import Sidebar from './components/Sidebar';
//  import Header from './components/Header';
//  import ProviderVerification from './components/ProviderVerification';
//  import UserManagement from './components/UserManagement';
//  import AnalyticDashboard from './components/AnalyticDashboard';
//  import PlatformManagement from './components/PlatformManagement';

// function App() {
//   const [activeSection, setActiveSection] = useState('Provider Verification');
//   const [providers, setProviders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [faqs, setFaqs] = useState([]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={
//           <div>
//             <Header />
//             <Sidebar setActiveSection={setActiveSection} />
//             {activeSection === 'Provider Verification' && <ProviderVerification providers={providers} setProviders={setProviders} />}
//             {activeSection === 'User Management' && <UserManagement users={users} setUsers={setUsers} />}
//             {activeSection === 'Analytics Dashboard' && <AnalyticDashboard />}
//             {activeSection === 'Platform Management' && <PlatformManagement faqs={faqs} setFaqs={setFaqs} />}
//           </div>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

