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
 
  const [users, setUsers] = useState();
  
  const [faqs, setFaqs] = useState();
 

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