import React, { useState, useEffect } from 'react';



const AllProviderInformation = ({ providers: initialProviders }) => {
  const [services, setServices] = useState(initialProviders || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/admin/provider-services/verified', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${yourToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch service data');
        }

        const data = await response.json();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!initialProviders || initialProviders.length === 0) {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, [initialProviders]);

  const updateServiceStatus = async (serviceId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/provider-services/status/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service status');
      }

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, status: newStatus } : service
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">All Approved Provider Services</h2>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile NO </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                             

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services && services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{service._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{service.providerId?.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{service.providerId?.email || 'N/A'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{service.contact || 'N/A'}</td>

                    <td className="px-6 py-4 whitespace-nowrap">{service.category || 'N/A'}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {service.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={service.status || 'inactive'}
                        onChange={(e) => updateServiceStatus(service._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No service information available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProviderInformation;