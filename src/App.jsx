import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Dashboard from './components/dashboard';

function App() {
  const [user, setUser] = useState(null); // Manage user state for login/logout
  const [activeSection, setActiveSection] = useState('Provider');
  const [providers, setProviders] = useState();
  //   { id: 1, name: 'John Doe', license: 'LIC123', status: 'Pending' },
  //   { id: 2, name: 'Jane Smith', license: 'LIC456', status: 'Pending' },
  // ]);
  const [users, setUsers] = useState();
  //   { id: 1, username: 'user1', activity: 'Active', issues: 'None' },
  //   { id: 2, username: 'user2', activity: 'Inactive', issues: 'Reported' },
  // ]);
  const [faqs, setFaqs] = useState();
  //   { id: 1, question: 'What is the service?', answer: 'It is a platform for providers.' },
  // ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              setUser={setUser}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              providers={providers}
              setProviders={setProviders}
              users={users}
              setUsers={setUsers}
              faqs={faqs}
              setFaqs={setFaqs}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;