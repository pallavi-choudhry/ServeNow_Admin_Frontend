import React from 'react';

function ProviderVerification({ providers, setProviders }) {
  const handleApprove = (id) => {
    setProviders(providers.map((p) => (p.id === id ? { ...p, status: 'Approved' } : p)));
  };

  const handleEdit = (id, updatedProvider) => {
    setProviders(providers.map((p) => (p.id === id ? { ...updatedProvider, id } : p)));
  };

  const addProvider = () => {
    const name = prompt('Enter provider name:');
    const license = prompt('Enter license number:');
    if (name && license) {
      setProviders([...providers, { id: providers.length + 1, name, license, status: 'Pending' }]);
    }
  };

  return (
    <div className="ml-72 mt-6 px-6">
      <h2 className="text-2xl font-bold mb-4">Provider Verification</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">License</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td className="p-3">{provider.name}</td>
              <td className="p-3">{provider.license}</td>
              <td className="p-3">{provider.status}</td>
              <td className="p-3">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleApprove(provider.id)}
                  disabled={provider.status === 'Approved'}
                >
                  Approve
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    const newName = prompt('Enter new name:', provider.name);
                    if (newName) handleEdit(provider.id, { ...provider, name: newName });
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Add spacing and layout fix for button */}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-md transition"
          onClick={addProvider}
        >
          Add Provider
        </button>
      </div>
    </div>
  );
}

export default ProviderVerification;

