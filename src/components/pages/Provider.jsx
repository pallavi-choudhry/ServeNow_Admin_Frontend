import React, { useEffect, useState } from "react";
import axios from "axios";

function ProviderVerification() {
  const [services, setServices] = useState([]);

  const fetchPendingServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/provider-services/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setServices(response.data);
      console.log("this is data from frontend ",response.data);
    } catch (error) {
      console.error("Error fetching pending services:", error);
    }
  };

  const handleAction = async (serviceId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/provider-services/status/${serviceId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setServices(services.filter((s) => s._id !== serviceId));
    } catch (error) {
      console.error(`Failed to ${status} service:`, error);
    }
  };

  useEffect(() => {
    fetchPendingServices();
  }, []);

  return (
<div className="mt-6 px-6">

      <h2 className="text-2xl font-bold mb-4">Provider Service Requests</h2>
      {services.length === 0 ? (
        <p className="text-gray-600">No pending service requests.</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Provider</th>
              <th className="p-3">Service</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Location</th>
              <th className="p-3">License No.</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td className="p-3">{service.providerId?.name || "N/A"}</td>
                <td className="p-3">{service.serviceName}</td>
                <td className="p-3">{service.category || "N/A"}</td>
                <td className="p-3">{service.price ? `$${service.price}` : "N/A"}</td>
                <td className="p-3">{service.location || "N/A"}</td>
                <td className="p-3">{service.licenseNumber || "N/A"}</td>
                <td className="p-3">{service.status}</td>
                <td className="p-3">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleAction(service._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleAction(service._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProviderVerification;