// import React, { useState, useRef, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { Chart } from 'chart.js/auto';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import ProviderVerification from './components/ProviderVerification';
// import UserManagement from './components/UserManagement';
// import AnalyticDashboard from './components/AnalyticDashboard';
// import PlatformManagement from './components/PlatformManagement';

// // Header
// function Header() {
//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">
//       <h1 className="text-xl font-semibold">Admin Panel</h1>
//       <div className="flex items-center">
//         <span className="mr-4">Admin User</span>
//         <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>
//     </div>
//   );
// }


// // Sidebar
// function Sidebar({ setActiveSection }) {
//   const sections = ['Provider Verification', 'User Management', 'Analytics Dashboard', 'Platform Management'];

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed">
//       <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//       <ul>
//         {sections.map((section) => (
//           <li
//             key={section}
//             className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
//             onClick={() => setActiveSection(section)}
//           >
//             {section}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// // // Provider Verification
// function ProviderVerification({ providers, setProviders }) {
//   const handleApprove = (id) => setProviders(providers.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
//   const handleEdit = (id, updated) => setProviders(providers.map(p => p.id === id ? { ...updated, id } : p));
//   const addProvider = () => {
//     const name = prompt('Provider name:');
//     const license = prompt('License:');
//     if (name && license) setProviders([...providers, { id: providers.length + 1, name, license, status: 'Pending' }]);
//   };

//   return (
//     <div className="ml-72 mt-6">
//       <h2 className="text-2xl font-bold mb-4">Provider Verification</h2>
//       <table className="w-full bg-white shadow rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-3">Name</th><th className="p-3">License</th><th className="p-3">Status</th><th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {providers.map(p => (
//             <tr key={p.id}>
//               <td className="p-3">{p.name}</td>
//               <td className="p-3">{p.license}</td>
//               <td className="p-3">{p.status}</td>
//               <td className="p-3">
//                 <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleApprove(p.id)} disabled={p.status === 'Approved'}>Approve</button>
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => {
//                   const newName = prompt('New name:', p.name);
//                   if (newName) handleEdit(p.id, { ...p, name: newName });
//                 }}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={addProvider}>Add Provider</button>
//     </div>
//   );
// }

// // User Management
// function UserManagement({ users, setUsers }) {
//   return (
//     <div className="ml-72 mt-6">
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       <table className="w-full bg-white shadow rounded-lg">
//         <thead>
//           <tr className="bg-gray-200"><th className="p-3">Username</th><th className="p-3">Activity</th><th className="p-3">Issues</th><th className="p-3">Actions</th></tr>
//         </thead>
//         <tbody>
//           {users.map(u => (
//             <tr key={u.id}>
//               <td className="p-3">{u.username}</td>
//               <td className="p-3">{u.activity}</td>
//               <td className="p-3">{u.issues}</td>
//               <td className="p-3"><button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setUsers(users.filter(user => user.id !== u.id))}>Remove</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Analytics Dashboard
// function AnalyticDashboard() {
//   const demandRef = useRef(null);
//   const engagementRef = useRef(null);

//   useEffect(() => {
//     const demandChart = new Chart(demandRef.current, {
//       type: 'bar',
//       data: {
//         labels: ['North', 'South', 'East', 'West'],
//         datasets: [{ label: 'Demand by Region', data: [120, 190, 300, 250], backgroundColor: 'rgba(54, 162, 235, 0.5)' }]
//       },
//       options: { scales: { y: { beginAtZero: true } } }
//     });

//     const engagementChart = new Chart(engagementRef.current, {
//       type: 'line',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//         datasets: [{ label: 'User Engagement', data: [65, 59, 80, 81], borderColor: 'rgba(75, 192, 192, 1)', fill: false }]
//       },
//       options: { scales: { y: { beginAtZero: true } } }
//     });

//     return () => {
//       demandChart.destroy();
//       engagementChart.destroy();
//     };
//   }, []);

//   return (
//     <div className="ml-72 mt-6">
//       <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h3 className="text-lg font-semibold">Demand by Region</h3>
//           <canvas ref={demandRef}></canvas>
//         </div>
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h3 className="text-lg font-semibold">User Engagement</h3>
//           <canvas ref={engagementRef}></canvas>
//         </div>
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h3 className="text-lg font-semibold">Revenue Report</h3>
//           <p>Total Revenue: $50,000</p>
//           <p>Monthly Growth: 15%</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Platform Management
// function PlatformManagement({ faqs, setFaqs }) {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const addFaq = () => {
//     if (question && answer) {
//       setFaqs([...faqs, { id: faqs.length + 1, question, answer }]);
//       setQuestion('');
//       setAnswer('');
//     }
//   };

//   return (
//     <div className="ml-72 mt-6">
//       <h2 className="text-2xl font-bold mb-4">Platform Management</h2>
//       <h3 className="text-lg font-semibold mb-2">Manage FAQs</h3>
//       <ul className="mb-4">
//         {faqs.map(faq => (
//           <li key={faq.id} className="mb-2">
//             {faq.question} - {faq.answer}
//             <button className="ml-4 bg-red-500 text-white px-2 py-1 rounded" onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div className="flex gap-2">
//         <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question" className="border p-2 rounded" />
//         <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer" className="border p-2 rounded" />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addFaq}>Add FAQ</button>
//       </div>
//     </div>
//   );
// }
// export default App;